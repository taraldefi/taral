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
    accepted-bid-id: (optional uint)
  }
)

(define-map bids
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
    refunded: bool
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

;; Counter for Purchase Orders and Bids
(define-data-var next-purchase-order-id uint u1)
(define-data-var next-bid-id uint u1)

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

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (make-payment (purchase-order-id uint) (amount uint) (current-year uint) (current-month uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
        (bid (unwrap! (map-get? bids { id: purchase-order-id }) ERR_BID_NOT_FOUND_FOR_PURCHASE_ORDER))
        (borrower-id (get borrower-id po))
        (required-amount (get monthly-payment bid))
          (overpaid-balance (get overpaid-balance po))
        (total-available (+ amount overpaid-balance))
        (months-covered (/ total-available required-amount))
        (lender-id (unwrap-panic (get lender-id bid) ))
        (actual-months-covered (if (> months-covered (get payments-left po)) 
                                                   (get payments-left po)
                                                   months-covered))

                                                   (remaining-balance (- total-available (* required-amount actual-months-covered)))
                          (updated-payments-left (- (get payments-left po) actual-months-covered))
        )
      
      ;; Calculate total available amount (current payment + overpaid balance)
        
        (if (< total-available required-amount)
            ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT
            
            (begin
                ;; Calculate months covered by the payment using integer division
                  ;; Check if months-covered is more than payments-left and adjust if necessary
                    ;; Record payments for all months covered
                    ;; (unwrap! (record-multiple-payments current-year current-month  purchase-order-id actual-months-covered required-amount (get borrower-id po) (get lender-id bid)) (err ERR_FAILED_TO_RECORD_PAYMENTS))
                    

                    (try! (record-multiple-payments 
                      current-year 
                      current-month 
                      purchase-order-id 
                      actual-months-covered 
                      required-amount 
                      borrower-id 
                      lender-id)

                    )


                    ;; (unwrap-panic (contract-call? .usda-token transfer (* actual-months-covered required-amount) (get borrower-id po) lender-id none))

                    ;; Calculate any left-over overpaid balance
                      
                      ;; Update purchase order with new data
                      (map-set purchase-orders 
                        { id: purchase-order-id }
                        {
                          borrower-id: (get borrower-id po),
                          downpayment: (get downpayment po),
                          lender-id: (get lender-id po),
                          seller-id: (get seller-id po),
                          total-amount: (get total-amount po),
                          overpaid-balance: remaining-balance,
                          payments-left: updated-payments-left,
                          first-payment-year: (if (is-eq updated-payments-left (get duration bid)) current-year (get first-payment-year po)),
                          first-payment-month: (if (is-eq updated-payments-left (get duration bid)) current-month (get first-payment-month po)),
                          outstanding-amount: (- (get outstanding-amount po) (* required-amount actual-months-covered)),
                          is-completed: false,
                          completed-successfully: false,
                          accepted-bid-id: (get accepted-bid-id po)
                        }
                      )
                      (ok purchase-order-id)
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
                    {
                        borrower-id: (get borrower-id po),
                        lender-id: (get lender-id po),
                        seller-id: (get seller-id po),
                        total-amount: (get total-amount po),
                        downpayment: (get downpayment po),
                        overpaid-balance: (get overpaid-balance po),
                        payments-left: (get payments-left po),
                        first-payment-year: (get first-payment-year po),
                        first-payment-month: (get first-payment-month po),
                        outstanding-amount: (get outstanding-amount po),
                        is-completed: true,
                        completed-successfully: false,
                        accepted-bid-id: (get accepted-bid-id po)
                    }
                )
                ;; Update lender's track record.
                (let ((lender-principal (unwrap! (get lender-id po) ERR_NO_LENDER_FOR_PURCHASE_ORDER)))
                    (unwrap! (contract-call? .taral-importer-v1 update-importer-track-record (get borrower-id po) false) ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD)
                    (unwrap! (contract-call? .taral-exporter-v1 update-exporter-track-record (get seller-id po) false) ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD)
                    (unwrap! (contract-call? .taral-lender update-lender-track-record lender-principal false) ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD)


                    (ok purchase-order-id)
                )
            )
        )
        ERR_NO_MISSED_PAYMENTS
    )
  )
)


;; Helper function to record multiple payments
(define-private (record-multiple-payments 
(current-year uint) (current-month uint)
    (purchase-order-id uint) (months uint) (amount-per-month uint) (borrower principal) (lender principal))
  (begin

    (unwrap! (contract-call? .usda-token transfer (* months amount-per-month) borrower lender none) (err u1000))

    (map-set payments
      { id: (var-get next-purchase-order-id) } 
      {
        borrower-id: borrower,
        purchase-order-id: purchase-order-id,
        amount: (* months amount-per-month),
        months-covered: months,
        month: current-month,
        year: current-year
      }
    )
    (var-set next-purchase-order-id (+ (var-get next-purchase-order-id) u1))
    
    (ok purchase-order-id)

  )
)

;; Create Purchase Order
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (create-purchase-order (total-amount uint) (downpayment uint) (seller-id principal))
  (let ((po-id (var-get next-purchase-order-id)))
    (var-set next-purchase-order-id (+ po-id u1))
    (map-set purchase-orders
      { id: po-id }
      {
        borrower-id: tx-sender,
        lender-id: (default-lender-id),
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
        accepted-bid-id: none
      }
    )
    (ok po-id)
  )
)

(define-constant protocol-interest-rate u5) ;; 5% protocol interest

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (place-bid (purchase-order-id uint) (bid-amount uint) (interest-rate uint) (number-of-downpayments uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
        (bid-id (var-get next-bid-id))
        (total-amount (- (get total-amount po) (get downpayment po)))
        (lender-interest-amount (* (/ interest-rate u100) total-amount))
        (protocol-interest-amount (* (/ protocol-interest-rate u100) total-amount))
        (total-interest (+ lender-interest-amount protocol-interest-amount))
        (total-with-interest (+ total-amount total-interest))
        (monthly-payment-amount (/ total-with-interest (+ number-of-downpayments u1)))
  )
    (var-set next-bid-id (+ bid-id u1))
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
        refunded: false
      }
    )
    (ok bid-id)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-bid-number-of-downpayments (bid-id uint) (new-number-of-downpayments uint))
  (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
    (lender-id (unwrap! (get lender-id bid) ERR_NO_LENDER_FOR_BID))
    (accepted-bid-id (get accepted-bid-id (unwrap-panic (map-get? purchase-orders { id: (get purchase-order-id bid) }))))
  )
     (if (and (not (is-none accepted-bid-id)) (is-eq bid-id (unwrap-panic accepted-bid-id)))
        ERR_CANNOT_MODIFY_ACCEPTED_BID

        (if (not (get refunded bid))
        (begin
            (map-set bids 
                { id: bid-id } 
                (merge bid { number-of-downpayments: new-number-of-downpayments })
            )
            (ok true)
        )
        ERR_CANNOT_MODIFY_ACCEPTED_BID
    )
    )
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-interest (id uint) (new-interest uint))
  (let ((bid (unwrap-panic (map-get? bids { id: id })))
    (lender-id (unwrap! (get lender-id bid) ERR_NO_LENDER_FOR_BID))
    (accepted-bid-id (get accepted-bid-id (unwrap-panic (map-get? purchase-orders { id: (get purchase-order-id bid) }))))
  )

    (if (and (not (is-none accepted-bid-id)) (is-eq id (unwrap-panic accepted-bid-id)))
        ERR_CANNOT_MODIFY_ACCEPTED_BID

        (if (not (get refunded bid))
            (begin
                (map-set bids 
                    { id: id } 
                    (merge bid { interest-rate: new-interest })
                )
                (ok true)
            )
            ERR_CANNOT_MODIFY_ACCEPTED_BID
        )
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


          ;; (try! (contract-call? .usda-token transfer (get bid-amount bid) contract-caller lender-id none))

          (try! (contract-call? .usda-token transfer (get bid-amount bid) contract-caller lender-id none))


        
          ;; (unwrap! (ft-transfer? stablecoin (get bid-amount bid)  lender-id) (err "Failed to transfer stablecoin"))

          ;; Mark bid as accepted
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

;; Retract or update a bid
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-bid (bid-id uint) (new-amount (optional uint)))
  (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
        (old-amount (get bid-amount bid))
        (lender-id (unwrap! (get lender-id bid) ERR_NO_LENDER_FOR_BID))
        )
    
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
    (map-set purchase-orders 
      { id: (get purchase-order-id bid) } 
      {
        borrower-id: (get borrower-id po),
        lender-id: (get lender-id bid),
        seller-id: (get seller-id po),
        total-amount: (get total-amount po),
        downpayment: (get downpayment po),
        outstanding-amount: (- (get total-amount po) (get downpayment po)),
        payments-left: (get payments-left po),
        overpaid-balance: u0,
        first-payment-month: (get first-payment-month po), ;; This will be updated when the first payment is made
        first-payment-year: (get first-payment-year po),  ;; This will be updated when the first payment is made,
        is-completed: (get is-completed po),
        completed-successfully: (get completed-successfully po),
        accepted-bid-id: (some bid-id)
      }
    )

    ;; Mark bid as accepted
    (map-set bids 
      { id: bid-id } 
      (merge bid { is-accepted: true })
    )

    (ok bid-id)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (end-purchase-order-successfully (purchase-order-id uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
        (lender-id (unwrap! (get lender-id po) ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER))
        (borrower-id (get borrower-id po))
        (seller-id (get seller-id po))
    )

    ;; Verify that the outstanding amount is fully paid
    (asserts! (<= (get outstanding-amount po) u0) ERR_PURCHASE_ORDER_NOT_FULLY_PAID)

    (unwrap! (contract-call? .taral-importer-v1 update-importer-track-record borrower-id true) ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD)
    (unwrap! (contract-call? .taral-exporter-v1 update-exporter-track-record seller-id true) ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD)
    (unwrap! (contract-call? .taral-lender update-lender-track-record lender-id true) ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD)

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

(define-private (default-lender-id) 
  (some 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB) ;; this is a dummy principal value
)