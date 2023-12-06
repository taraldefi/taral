;; Maps to keep track of data
(define-map purchase-orders
  {
    id: uint
  }
  {
    borrower-id: principal,
    lender-id: (optional principal),
    seller-id: principal,
    total-amount: uint,
    downpayment: uint,
    overpaid-balance: uint,
    payments-left: uint,
    first-payment-year: uint,
    first-payment-month: uint,
    outstanding-amount: uint,
    is-completed: bool,
    completed-successfully: bool,
    accepted-bid-id: (optional uint),
    is-canceled: bool,
    active-bids-count: uint,
    created-at: uint,  ;; Timestamp of creation
    updated-at: uint   ;; Timestamp of last update
  }
)

(define-map bids ;; this will be called financing-offers
  {
    id: uint
  }
  {
    purchase-order-id: uint,
    bid-amount: uint,
    lender-id: (optional principal),
    is-accepted: bool,
    interest-rate: uint,
    duration: uint,
    number-of-downpayments: uint,
    monthly-payment: uint,
    refunded: bool,
    is-rejected: bool
  }
)

(define-map payments
  {
    id: uint
  }
  {
    borrower-id: principal,
    purchase-order-id: uint,
    amount: uint,
    month: uint,
    year: uint,
    months-covered: uint
  }
)

;; Version string
(define-constant VERSION "0.0.5.beta")

(define-data-var contract-owner principal tx-sender)
(define-data-var protocol-interest-rate uint u1) ;; 1% protocol interest


;; Counter for Purchase Orders and Bids
(define-data-var next-purchase-order-id uint u1)
(define-data-var next-payment-id uint u1)
(define-data-var next-bid-id uint u1)

;; Error codes
(define-constant ERR_PURCHASE_ORDER_NOT_FOUND (err u100))
(define-constant ERR_BID_NOT_FOUND_FOR_PURCHASE_ORDER (err u101))
(define-constant ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT (err u102))
(define-constant ERR_FAILED_TO_RECORD_PAYMENTS (err u103))
(define-constant ERR_FAILED_TO_CHECK_MISSED_PAYMENTS (err u104))
(define-constant ERR_NO_LENDER_FOR_PURCHASE_ORDER (err u105))
(define-constant ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD (err u106))
(define-constant ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD (err u107))
(define-constant ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD (err u108))
(define-constant ERR_NO_MISSED_PAYMENTS (err u109))
(define-constant ERR_NO_LENDER_FOR_BID (err u110))
(define-constant ERR_CANNOT_MODIFY_ACCEPTED_BID (err u111))
(define-constant ERR_NOT_ENOUGH_FUNDS (err u112))
(define-constant ERR_PURCHASE_ORDER_NOT_FULLY_PAID (err u113))
(define-constant ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER (err u114))
(define-constant ERR_BID_NOT_FOUND (err u115))
(define-constant ERR_BID_ALREADY_REFUNDED (err u116))
(define-constant ERR_ONLY_BORROWER_CAN_ACCEPT_BID (err u117))
(define-constant ERR_PAYMENT_LUMP_SUM_TRANSFER_FAILED (err u118))
(define-constant ERR_COULD_NOT_COMPLETE_PURCHASE_ORDER (err u119))
(define-constant ERR_MISSED_PAYMENTS u120)
(define-constant ERR_OVERPAYMENT (err u121))

(define-constant ERR_ACTIVE_BIDS_PRESENT (err u122))
(define-constant ERR_PURCHASE_ORDER_CANCELED (err u123))
(define-constant ERR_CANNOT_REJECT_ACCEPTED_BID (err u124))

(define-read-only (get-info)
    (ok {
        version: (get-version),
        protocol-interest: (var-get protocol-interest-rate),
    })
)

;; Returns version of the safe contract
;; @returns string-ascii
(define-read-only (get-version) 
    VERSION
)


(define-read-only (months-since-first-payment (first-year uint) (first-month uint) (current-year uint) (current-month uint))
  (-
    (+ (* (- current-year first-year) u12) current-month)
    first-month
  )
)

(define-read-only (missed-last-three-payments (purchase-order-id uint) (current-year uint) (current-month uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND)))
    (let ((months-passed (months-since-first-payment (get first-payment-year po) (get first-payment-month po) current-year current-month))
          (expected-payments-made (- months-passed (get payments-left po))))
      (if (> expected-payments-made (+ (get payments-left po) u3))
          (ok true)   ;; True means they missed a payment in the last three months.
          (ok false)  ;; False means they didn't.
      )
    )
  )
)

(define-read-only (get-payment-details (purchase-order-id uint))
  (let ((po (unwrap-panic (map-get? purchase-orders {id: purchase-order-id})))
        (bid-id (unwrap-panic (get accepted-bid-id po))))
    (let ((bid (unwrap-panic (map-get? bids {id: bid-id}))))
      (ok { 
        payments-left: (get payments-left po), 
        monthly-payment: (get monthly-payment bid)
      })
    )
  )
)

;; Function to check if a purchase order has active bids
(define-read-only (has-active-bids (purchase-order-id uint))
  (let ((po (map-get? purchase-orders {id: purchase-order-id})))
    (match po
      po-data (> (get active-bids-count po-data) u0)
      false  ;; If purchase order not found, return false
    )
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (make-payment (purchase-order-id uint) (amount uint) (current-year uint) (current-month uint))
  (let 
    (
      (po (unwrap-panic (map-get? purchase-orders {id: purchase-order-id})))
      (bid (unwrap-panic (map-get? bids {id: (unwrap-panic (get accepted-bid-id po))})))
      (total-available (+ amount (get overpaid-balance po)))
      (required-amount (get monthly-payment bid))
      (months-covered (/ total-available required-amount))
    )

    (if (< total-available required-amount)
        ;; Return type: (response bool uint)
        (err ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT)

         (if (> months-covered (get payments-left po))
              (err ERR_OVERPAYMENT)
              (let ((response (contract-call? .usda-token transfer 
                                        (* required-amount months-covered)
                                        (get borrower-id po) 
                                        (unwrap-panic (get lender-id po))
                                        (some 0x5061796D656E7420666F7220504F000000000000000000000000000000000000))))
              (match response
                success
                  ;; Nested success branch
                  (let (
                        (new-overpaid-balance (mod total-available required-amount))
                        (new-payments-left (- (get payments-left po) months-covered)))

                    ;; Record the lump sum payment
                    (map-set payments
                            {id: (increment-next-payment-id)}
                            {
                              borrower-id: (get borrower-id po),
                              purchase-order-id: purchase-order-id,
                              amount: (* required-amount months-covered),
                              month: current-month,
                              year: current-year,
                              months-covered: months-covered
                            })

                    ;; Update the purchase order
                    (map-set purchase-orders 
                            {id: purchase-order-id}
                            (merge po {
                              overpaid-balance: new-overpaid-balance,
                              payments-left: new-payments-left,
                              updated-at: block-height
                            }))

                    ;; Check if this payment completes the purchase order
                    (if (is-eq new-payments-left u0)

                        ;; If all payments are made, end the purchase order successfully
                        (let ((end-purchase-order-response (end-purchase-order-successfully purchase-order-id)))

                        (match end-purchase-order-response
                          end-purchase-order-success
                          (ok true)
                          end-purchase-order-error
                            ;; Nested error branch
                            ;; Return type: (response bool uint) or err
                          (err ERR_COULD_NOT_COMPLETE_PURCHASE_ORDER)
                        )
                      )

                      (ok true)
                    )
                  )
                error
                  ;; Nested error branch
                  ;; Return type: (response bool uint) or err
                  (err ERR_PAYMENT_LUMP_SUM_TRANSFER_FAILED)
              )
            )
         )
    )
  )
)

(define-public (check-purchase-order-health (purchase-order-id uint) (current-year uint) (current-month uint))
  (let ((missed-payments (unwrap! (missed-last-three-payments purchase-order-id current-year current-month) ERR_FAILED_TO_CHECK_MISSED_PAYMENTS))

  (po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
  )
    (if missed-payments
        (begin
            ;; Mark the purchase order as ended unsuccessfully.
            (let ()

                (map-set purchase-orders
                        { id: purchase-order-id }
                        (merge po {
                          is-completed: true,
                          completed-successfully: false,
                          updated-at: block-height
                        })
                )

                ;; Update lender's track record.
                (let ((lender-principal (unwrap! (get lender-id po) ERR_NO_LENDER_FOR_PURCHASE_ORDER)))
                    (unwrap! (contract-call? .taral-importer update-importer-track-record (get borrower-id po) false) ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD)
                    (unwrap! (contract-call? .taral-exporter update-exporter-track-record (get seller-id po) false) ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD)
                    (unwrap! (contract-call? .taral-lender update-lender-track-record lender-principal false) ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD)

                    (ok purchase-order-id)
                )
            )
        )
        (err ERR_MISSED_PAYMENTS)
    )
  )
)

;; Create Purchase Order
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (create-purchase-order (total-amount uint) (downpayment uint) (seller-id principal))
  (let (
    (purchase-order-id (increment-next-purchase-order-id)))

    (map-set purchase-orders
      { id: purchase-order-id }
      {
        borrower-id: tx-sender,
        lender-id: none,
        seller-id: seller-id,
        total-amount: total-amount,
        downpayment: downpayment,
        overpaid-balance: u0,
        payments-left: u0,
        first-payment-year: u0,
        first-payment-month: u0,
        outstanding-amount: (- total-amount downpayment),
        is-completed: false,
        completed-successfully: false,
        accepted-bid-id: none,
        created-at: block-height,
        updated-at: block-height,
        is-canceled: false,
        active-bids-count: u0 
      }
    )
    (ok purchase-order-id)
  )
)

;; Function to cancel a purchase order
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (cancel-purchase-order (purchase-order-id uint))
  (let ((po (unwrap! (map-get? purchase-orders {id: purchase-order-id}) ERR_PURCHASE_ORDER_NOT_FOUND)))
    (asserts! (is-eq (get active-bids-count po) u0) ERR_ACTIVE_BIDS_PRESENT)
    (map-set purchase-orders
            {id: purchase-order-id}
            (merge po { is-canceled: true }))
    (ok true)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (place-bid (purchase-order-id uint) (bid-amount uint) (interest-rate uint) (number-of-downpayments uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
        (bid-id (increment-next-bid-id))
        (total-amount (- (get total-amount po) (get downpayment po)))
        (lender-interest-amount (* (/ interest-rate u100) total-amount))
        (protocol-interest-amount (* (/ protocol-interest-rate u100) total-amount))
        (total-interest (+ lender-interest-amount protocol-interest-amount))
        (total-with-interest (+ total-amount total-interest))
        (monthly-payment-amount (/ total-with-interest (+ number-of-downpayments u0)))
  )
    ;; default the interest rate to 1% per annum

    ;; Transfer the bid amount from the lender to the contract
    (if (is-ok (contract-call? .usda-token transfer bid-amount tx-sender (as-contract tx-sender) none))
        (begin
          (map-set bids 
            { id: bid-id }
            {
              purchase-order-id: purchase-order-id,
              bid-amount: bid-amount,
              lender-id: (some tx-sender),
              is-accepted: false,
              interest-rate: interest-rate,
              duration: (+ number-of-downpayments u1),
              number-of-downpayments: number-of-downpayments,
              monthly-payment: monthly-payment-amount,
              refunded: false,
              is-rejected: false
            }
          )
          (ok bid-id)
        )
        ERR_NOT_ENOUGH_FUNDS
    )
  )
)

;; Function to reject a bid
;; Updated to decrement the active-bids-count
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (reject-bid (bid-id uint))
  (let ((bid (unwrap! (map-get? bids {id: bid-id}) ERR_BID_NOT_FOUND)))
    (asserts! (not (get is-accepted bid)) ERR_CANNOT_REJECT_ACCEPTED_BID)

    ;; refund the bid amount;

    (let ((po-id (get purchase-order-id bid)))
      (let ((po (unwrap! (map-get? purchase-orders {id: po-id}) ERR_PURCHASE_ORDER_NOT_FOUND)))

        (if (is-ok (contract-call? .usda-token transfer (get bid-amount bid) (as-contract tx-sender) tx-sender none))
        (begin

          ;; transfer funds TODO:
           (map-set bids
                {id: bid-id}
                (merge bid { is-rejected: true }))
        (map-set purchase-orders
                {id: po-id}
                (merge po { active-bids-count: (- (get active-bids-count po) u1) }))
        (ok true)
        )
        ERR_NOT_ENOUGH_FUNDS
    )
      )
    )
  )
)

;; Retract or update a bid
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-bid (bid-id uint) (new-amount (optional uint)))
  (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
        (old-amount (get bid-amount bid))
        (lender-id (unwrap! (get lender-id bid) ERR_NO_LENDER_FOR_BID))
        )

    ;; check that the bid can only be updated by the creator of the bid.
    
    ;; Fetch the purchase order's accepted bid ID
    (let ((accepted-bid-id (get accepted-bid-id (unwrap-panic (map-get? purchase-orders { id: (get purchase-order-id bid) })))))
      
      ;; Check if the bid was the accepted one
      (if (and (not (is-none accepted-bid-id)) (is-eq bid-id (unwrap-panic accepted-bid-id)))
        ERR_CANNOT_MODIFY_ACCEPTED_BID

        ;; Check if the bid was already refunded
        (if (get refunded bid)
          ERR_BID_ALREADY_REFUNDED
          
          ;; If no new amount is provided or it's zero, we consider this a retraction and refund the bid
          (if (or (is-none new-amount) (is-eq (unwrap-panic new-amount) u0))
            (refund-bid bid-id)
            
            ;; If the new amount is more than the old amount
            (if (> (unwrap-panic new-amount) old-amount)
              (let ((difference (- (unwrap-panic new-amount) old-amount)))
                ;; Transfer the difference from the bidder to the contract
                (if (is-ok (contract-call? .usda-token transfer difference  lender-id contract-caller none))
                  (begin

                    (map-set bids 
                        { id: bid-id } 
                        (merge bid { bid-amount: (unwrap-panic new-amount) })
                    )
                    (ok true)
                  )
                  ERR_NOT_ENOUGH_FUNDS
                )
              )
              
              ;; If the new amount is less than the old amount
              (let ((difference (- old-amount (unwrap-panic new-amount))))
                ;; Transfer the difference from the contract back to the bidder
                (if (is-ok (contract-call? .usda-token transfer difference contract-caller lender-id none))
                  (begin
                    (map-set bids 
                            { id: bid-id } 
                            (merge bid { bid-amount: (unwrap-panic new-amount) })
                    )
                    (ok true)
                  )
                  ERR_NOT_ENOUGH_FUNDS
                )
              )
            )
          )
        )
      )
    )
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (accept-bid (bid-id uint))
  (let ((bid (unwrap! (map-get? bids { id: bid-id }) ERR_BID_NOT_FOUND))
        (po (unwrap! (map-get? purchase-orders { id: (get purchase-order-id bid) }) ERR_PURCHASE_ORDER_NOT_FOUND)))
    (asserts! (is-eq tx-sender (get borrower-id po)) ERR_ONLY_BORROWER_CAN_ACCEPT_BID)

    ;; Update purchase order with details from the accepted bid
    ;; Transfer the bid amount from the contract to the seller and 
    ;; transfer the downpayment to the seller as well.
    (if (is-ok (contract-call? .usda-token transfer (get bid-amount bid) (as-contract tx-sender) (get borrower-id po) none))
        (begin
          (map-set purchase-orders
              { id: (get purchase-order-id bid) }
              (merge po {
                outstanding-amount: (- (get total-amount po) (get downpayment po)),
                overpaid-balance: u0,
                accepted-bid-id: (some bid-id),
                updated-at: block-height
              })
            )

          ;; Mark bid as accepted
          (map-set bids 
            { id: bid-id } 
            (merge bid { is-accepted: true })
          )

          (ok bid-id)
        )
        ERR_NOT_ENOUGH_FUNDS
    )
  )
)

;; Refund a bid
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-private (refund-bid (bid-id uint))
    (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
    (lender-id (unwrap! (get lender-id bid) (err u111)))
    
    )
      (if (not (get refunded bid))
        (begin
          
          (try! (contract-call? 
                  .usda-token transfer 
                  (get bid-amount bid) 
                  contract-caller 
                  lender-id 
                  none)
          )
        
          ;; Mark bid as refunded
          (map-set bids 
            { id: bid-id } 
            (merge bid { refunded: true })
          )

          (ok true)
        )
        ERR_BID_ALREADY_REFUNDED
      )
    )
  )

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-private (end-purchase-order-successfully (purchase-order-id uint))
  (let (
        (po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
        (lender-id (unwrap! (get lender-id po) ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER))
        (borrower-id (get borrower-id po))
        (seller-id (get seller-id po))
    )

    ;; Verify that the outstanding amount is fully paid
    (asserts! (<= (get outstanding-amount po) u0) ERR_PURCHASE_ORDER_NOT_FULLY_PAID)

    (unwrap! (contract-call? .taral-importer update-importer-track-record 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB true) ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD)
    (unwrap! (contract-call? .taral-exporter update-exporter-track-record 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB true) ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD)
    (unwrap! (contract-call? .taral-lender update-lender-track-record 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB true) ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD)

    ;; Mark purchase order as completed successfully
    (map-set purchase-orders
      { id: purchase-order-id }
      (merge po { 
        is-completed: true, 
        completed-successfully: true
      })
    )

    (ok true)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; Implements a safe way to provide a valid ID for a purchase order
(define-private (increment-next-purchase-order-id)
  (let ((current-id (var-get next-purchase-order-id)))
    (var-set next-purchase-order-id (+ current-id u1))
    current-id
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; Implements a safe way to provide a valid ID for a payment
(define-private (increment-next-payment-id)
  (let ((current-id (var-get next-payment-id)))
    (var-set next-payment-id (+ current-id u1))
    current-id
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; Implements a safe way to provide a valid ID for a bid
(define-private (increment-next-bid-id)
  (let ((current-id (var-get next-bid-id)))
    (var-set next-bid-id (+ current-id u1))
    current-id
  )
)
