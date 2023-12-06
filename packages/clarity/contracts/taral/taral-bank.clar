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
    accepted-financing-id: (optional uint),
    is-canceled: bool,
    has-active-financing: bool,
    created-at: uint,  ;; Timestamp of creation
    updated-at: uint   ;; Timestamp of last update
  }
)

(define-map po-financing ;; this will be called financing-offers
  {
    id: uint
  }
  {
    purchase-order-id: uint,
    financing-amount: uint,
    lender-id: (optional principal),
    is-accepted: bool,
    interest-rate-per-month: uint,
    number-of-installments: uint,
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
(define-data-var protocol-interest-rate-per-annum uint u12) ;; 12% protocol interest
(define-data-var po_number_of_installments uint u3) ;; number of installments for paying the loan

(define-data-var contract-paused bool false)


;; Counter for Purchase Orders and financing offers
(define-data-var next-purchase-order-id uint u1)
(define-data-var next-payment-id uint u1)
(define-data-var next-financing-id uint u1)

;; Error codes
(define-constant ERR_PURCHASE_ORDER_NOT_FOUND (err u100))
(define-constant ERR_FINANCING_NOT_FOUND_FOR_PURCHASE_ORDER (err u101))
(define-constant ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT (err u102))
(define-constant ERR_FAILED_TO_RECORD_PAYMENTS (err u103))
(define-constant ERR_FAILED_TO_CHECK_MISSED_PAYMENTS (err u104))
(define-constant ERR_NO_LENDER_FOR_PURCHASE_ORDER (err u105))
(define-constant ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD (err u106))
(define-constant ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD (err u107))
(define-constant ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD (err u108))
(define-constant ERR_NO_MISSED_PAYMENTS (err u109))
(define-constant ERR_NO_LENDER_FOR_FINANCING (err u110))
(define-constant ERR_CANNOT_MODIFY_ACCEPTED_FINANCING (err u111))
(define-constant ERR_NOT_ENOUGH_FUNDS (err u112))
(define-constant ERR_PURCHASE_ORDER_NOT_FULLY_PAID (err u113))
(define-constant ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER (err u114))
(define-constant ERR_FINANCING_NOT_FOUND (err u115))
(define-constant ERR_FINANCING_ALREADY_REFUNDED (err u116))
(define-constant ERR_ONLY_BORROWER_CAN_ACCEPT_FINANCING (err u117))
(define-constant ERR_PAYMENT_LUMP_SUM_TRANSFER_FAILED (err u118))
(define-constant ERR_COULD_NOT_COMPLETE_PURCHASE_ORDER (err u119))
(define-constant ERR_MISSED_PAYMENTS u120)
(define-constant ERR_OVERPAYMENT (err u121))

(define-constant ERR_PO_HAS_ACTIVE_FINANCING (err u122))
(define-constant ERR_PURCHASE_ORDER_CANCELED (err u123))
(define-constant ERR_CANNOT_REJECT_ACCEPTED_FINANCING (err u124))
(define-constant ERR_DOWNPAYMENT_TOO_LARGE (err u125))
(define-constant ERR_COULD_NOT_TRANSFER_FUNDS_TO_SELLER (err u126))

(define-constant err-unauthorised (err u401))

(define-read-only (get-info)
    (ok {
        version: (get-version),
        protocol-interest-rate-per-annum: (var-get protocol-interest-rate-per-annum),
    })
)

;; Returns version of the safe contract
;; @returns string-ascii
(define-read-only (get-version) 
    VERSION
)

(define-read-only (interest-per-month) 
  (/ (var-get protocol-interest-rate-per-annum) u12))


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
        (financing-id (unwrap-panic (get accepted-financing-id po))))
    (let ((financing (unwrap-panic (map-get? po-financing {id: financing-id}))))
      (ok { 
        payments-left: (get payments-left po), 
        monthly-payment: (get monthly-payment financing)
      })
    )
  )
)

;; Function to check if a purchase order has active financing offers
(define-read-only (has-active-financing (purchase-order-id uint))
  (let ((po (map-get? purchase-orders {id: purchase-order-id})))
    (match po
      po-data (get has-active-financing po-data)
      false  ;; If purchase order not found, return false
    )
  )
)

(define-public (update-protocol-interest-rate-per-annum (new-interest-rate uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set protocol-interest-rate-per-annum new-interest-rate)
    (ok true)
  )
)

(define-public (update-number-of-installments (new-number-of-installments uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set po_number_of_installments new-number-of-installments)
    (ok true)
  )
)

(define-public (pause-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set contract-paused true)
    (ok true)
  )
)

(define-public (resume-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set contract-paused false)
    (ok true)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (make-payment (purchase-order-id uint) (amount uint) (current-year uint) (current-month uint))
  (let 
    (
      (po (unwrap-panic (map-get? purchase-orders {id: purchase-order-id})))
      (financing (unwrap-panic (map-get? po-financing {id: (unwrap-panic (get accepted-financing-id po))})))
      (total-available (+ amount (get overpaid-balance po)))
      (monthly-interest-rate (/ (/ (var-get protocol-interest-rate-per-annum) u12) u100))
    )

    ;; Calculate the current outstanding amount and monthly payment
    (let ((outstanding-amount (get outstanding-amount po))
          (monthly-payment (get monthly-payment financing))
          (interest-for-current-month (* outstanding-amount monthly-interest-rate))
          (principal-payment (min monthly-payment outstanding-amount))
          (total-payment-required (+ principal-payment interest-for-current-month))
    )

      (if (< total-available total-payment-required)
        (err ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT)

        ;; Calculate how many months can be covered by the payment, excluding interest for advance months
        (let ((months-covered (/ (- total-available interest-for-current-month) monthly-payment)))

          ;; Update the outstanding amount
          (let (
                (total-principal-payment (* principal-payment months-covered))
                (new-outstanding-amount (- outstanding-amount total-principal-payment))
                )

            ;; Make the payment transfer and update the records
            ;; This includes transferring funds, updating the payment and purchase order maps, etc.

            (if (> months-covered (get payments-left po))
              (err ERR_OVERPAYMENT)

              (if (is-ok (contract-call? .usda-token transfer 
                                        interest-for-current-month
                                        (get borrower-id po) 
                                        (as-contract tx-sender)
                                        (some 0x5061796D656E7420666F7220504F000000000000000000000000000000000000)))
                (begin 
                  (let ((response (contract-call? .usda-token transfer 
                                        total-principal-payment
                                        (get borrower-id po) 
                                        (unwrap-panic (get lender-id po))
                                        (some 0x5061796D656E7420666F7220504F000000000000000000000000000000000000))))
                      (match response
                        success
                          ;; Nested success branch
                          (let (
                                (new-overpaid-balance (mod total-available principal-payment))
                                (new-payments-left (- (get payments-left po) months-covered)))

                            ;; Record the lump sum payment
                            (map-set payments
                                    {id: (increment-next-payment-id)}
                                    {
                                      borrower-id: (get borrower-id po),
                                      purchase-order-id: purchase-order-id,
                                      amount: total-principal-payment,
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

                ;; Nested error branch
                ;; Return type: (response bool uint) or err
                (err ERR_PAYMENT_LUMP_SUM_TRANSFER_FAILED)
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
;; (define-public (make-payment (purchase-order-id uint) (amount uint) (current-year uint) (current-month uint))
;;   (let 
;;     (
;;       (po (unwrap-panic (map-get? purchase-orders {id: purchase-order-id})))
;;       (financing (unwrap-panic (map-get? po-financing {id: (unwrap-panic (get accepted-financing-id po))})))
;;       (total-available (+ amount (get overpaid-balance po)))
;;       (required-amount (get monthly-payment financing))
;;       (months-covered (/ total-available required-amount))
;;     )

;;     (if (< total-available required-amount)
;;         ;; Return type: (response bool uint)
;;         (err ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT)

;;          (if (> months-covered (get payments-left po))
;;               (err ERR_OVERPAYMENT)
;;               (let ((response (contract-call? .usda-token transfer 
;;                                         (* required-amount months-covered)
;;                                         (get borrower-id po) 
;;                                         (unwrap-panic (get lender-id po))
;;                                         (some 0x5061796D656E7420666F7220504F000000000000000000000000000000000000))))
;;               (match response
;;                 success
;;                   ;; Nested success branch
;;                   (let (
;;                         (new-overpaid-balance (mod total-available required-amount))
;;                         (new-payments-left (- (get payments-left po) months-covered)))

;;                     ;; Record the lump sum payment
;;                     (map-set payments
;;                             {id: (increment-next-payment-id)}
;;                             {
;;                               borrower-id: (get borrower-id po),
;;                               purchase-order-id: purchase-order-id,
;;                               amount: (* required-amount months-covered),
;;                               month: current-month,
;;                               year: current-year,
;;                               months-covered: months-covered
;;                             })

;;                     ;; Update the purchase order
;;                     (map-set purchase-orders 
;;                             {id: purchase-order-id}
;;                             (merge po {
;;                               overpaid-balance: new-overpaid-balance,
;;                               payments-left: new-payments-left,
;;                               updated-at: block-height
;;                             }))

;;                     ;; Check if this payment completes the purchase order
;;                     (if (is-eq new-payments-left u0)

;;                         ;; If all payments are made, end the purchase order successfully
;;                         (let ((end-purchase-order-response (end-purchase-order-successfully purchase-order-id)))

;;                         (match end-purchase-order-response
;;                           end-purchase-order-success
;;                           (ok true)
;;                           end-purchase-order-error
;;                             ;; Nested error branch
;;                             ;; Return type: (response bool uint) or err
;;                           (err ERR_COULD_NOT_COMPLETE_PURCHASE_ORDER)
;;                         )
;;                       )

;;                       (ok true)
;;                     )
;;                   )
;;                 error
;;                   ;; Nested error branch
;;                   ;; Return type: (response bool uint) or err
;;                   (err ERR_PAYMENT_LUMP_SUM_TRANSFER_FAILED)
;;               )
;;             )
;;          )
;;     )
;;   )
;; )

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

    ;; ensure the downpayment is less than the total amount
    (asserts! (< downpayment total-amount) ERR_DOWNPAYMENT_TOO_LARGE)

    (if (is-ok (contract-call? .usda-token transfer downpayment tx-sender (as-contract tx-sender) none))
        (begin
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
              accepted-financing-id: none,
              created-at: block-height,
              updated-at: block-height,
              is-canceled: false,
              has-active-financing: false 
            }
          )

          (ok purchase-order-id)
        )
        ERR_NOT_ENOUGH_FUNDS
    )
  )
)

;; Function to cancel a purchase order
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (cancel-purchase-order (purchase-order-id uint))
  (let ((po (unwrap! (map-get? purchase-orders {id: purchase-order-id}) ERR_PURCHASE_ORDER_NOT_FOUND)))
    (asserts! (is-eq (get has-active-financing po) true) ERR_PO_HAS_ACTIVE_FINANCING)
    ;; ensure only the lender can cancel their own financing offer
    (asserts! (or (is-eq tx-sender (get borrower-id po)) (is-eq  tx-sender (var-get contract-owner))) err-unauthorised)

    (if (is-ok (contract-call? .usda-token transfer (get downpayment po) (as-contract tx-sender) tx-sender none))
        (begin
          (map-set purchase-orders
            {id: purchase-order-id}
            (merge po { is-canceled: true }))

          (ok true)
        )
        ERR_NOT_ENOUGH_FUNDS
    )
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (finance (purchase-order-id uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) ERR_PURCHASE_ORDER_NOT_FOUND))
        (financing-id (increment-next-financing-id))
        (total-amount (- (get total-amount po) (get downpayment po)))
        (number-of-installments (var-get po_number_of_installments))
        (monthly-payment-amount (/ total-amount number-of-installments))
  )

    (asserts! (not (get is-canceled po)) ERR_PURCHASE_ORDER_CANCELED)
    (asserts! (not (get has-active-financing po)) ERR_PO_HAS_ACTIVE_FINANCING)
    
    ;; Transfer the financing offer amount from the lender to the contract
    (if (is-ok (contract-call? .usda-token transfer total-amount tx-sender (as-contract tx-sender) none))
        (begin
          (map-set po-financing 
            { id: financing-id }
            {
              purchase-order-id: purchase-order-id,
              financing-amount: total-amount,
              lender-id: (some tx-sender),
              is-accepted: false,
              interest-rate-per-month: (interest-per-month),
              number-of-installments: number-of-installments,
              monthly-payment: monthly-payment-amount,
              refunded: false,
              is-rejected: false
            }
          )
          (ok financing-id)
        )
        ERR_NOT_ENOUGH_FUNDS
    )
  )
)

;; Function to reject a financing offer
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (reject-financing (financing-id uint))
  (let 
    (
      (financing (unwrap! (map-get? po-financing {id: financing-id}) ERR_FINANCING_NOT_FOUND))
  
      (lender-id (unwrap! (get lender-id financing) ERR_NO_LENDER_FOR_FINANCING))
    )

    (asserts! (not (get is-accepted financing)) ERR_CANNOT_REJECT_ACCEPTED_FINANCING)

    (let ((po-id (get purchase-order-id financing)))
      (let ((po (unwrap! (map-get? purchase-orders {id: po-id}) ERR_PURCHASE_ORDER_NOT_FOUND)))
        (if (is-ok (contract-call? .usda-token transfer (get financing-amount financing) (as-contract tx-sender) lender-id none))
          (begin
            (map-set po-financing
                  {id: financing-id}
                  (merge financing { is-rejected: true }))
              (map-set purchase-orders
                      {id: po-id}
                      (merge po { has-active-financing: false }))
              (ok true)
          )
          
          ERR_NOT_ENOUGH_FUNDS
        )
      )
    )
  )
)

;; Retract or update a financing offer
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (cancel-financing (financing-id uint))
  (let 
    (
      (financing (unwrap! (map-get? po-financing {id: financing-id}) ERR_FINANCING_NOT_FOUND))
  
      (lender-id (unwrap! (get lender-id financing) ERR_NO_LENDER_FOR_FINANCING))
    )

    ;; ensure the financing offer cannot be canceled after it's been accepted, not even by admin
    (asserts! (not (get is-accepted financing)) ERR_CANNOT_REJECT_ACCEPTED_FINANCING)

    ;; ensure only the lender can cancel their own financing offer
    (asserts! (or (is-eq tx-sender lender-id) (is-eq  tx-sender (var-get contract-owner))) err-unauthorised)

    (refund-financing financing-id)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (accept-financing (financing-id uint))
  (let ((financing (unwrap! (map-get? po-financing { id: financing-id }) ERR_FINANCING_NOT_FOUND))
        (po (unwrap! (map-get? purchase-orders { id: (get purchase-order-id financing) }) ERR_PURCHASE_ORDER_NOT_FOUND)))
    (asserts! (is-eq tx-sender (get borrower-id po)) ERR_ONLY_BORROWER_CAN_ACCEPT_FINANCING)
    (asserts! (not (get is-accepted financing)) ERR_CANNOT_MODIFY_ACCEPTED_FINANCING)
    (asserts! (not (get is-canceled po)) ERR_PURCHASE_ORDER_CANCELED)
    (asserts! (not (get has-active-financing po)) ERR_PO_HAS_ACTIVE_FINANCING)

    ;; Update purchase order with details from the accepted financing
    (if (is-ok (contract-call? .usda-token transfer (get financing-amount financing) (as-contract tx-sender) (get seller-id po) none))
        (begin
          (if (is-ok (contract-call? .usda-token transfer (get downpayment po) (as-contract tx-sender) (get seller-id po) none))
            (begin
              (map-set purchase-orders
                { id: (get purchase-order-id financing) }
                
                (merge po {
                  outstanding-amount: (- (get total-amount po) (get downpayment po)),
                  overpaid-balance: u0,
                  accepted-financing-id: (some financing-id),
                  has-active-financing: true,
                  updated-at: block-height
                })
              )

              ;; Mark financing as accepted
              (map-set po-financing 
                { id: financing-id } 
                (merge financing { is-accepted: true })
              )

              (ok financing-id)
            )
            ERR_COULD_NOT_TRANSFER_FUNDS_TO_SELLER
          )
        )
      ERR_COULD_NOT_TRANSFER_FUNDS_TO_SELLER
    )
  )
)

;; Refund a financing offer
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-private (refund-financing (financing-id uint))
    (let ((financing (unwrap-panic (map-get? po-financing { id: financing-id })))
    (lender-id (unwrap! (get lender-id financing) (err u111)))
    
    )
      (if (not (get refunded financing))
        (begin
          
          (try! (contract-call? 
                  .usda-token transfer 
                  (get financing-amount financing) 
                  contract-caller 
                  lender-id 
                  none)
          )
        
          ;; Mark finance offer as refunded
          (map-set po-financing 
            { id: financing-id } 
            (merge financing { refunded: true })
          )

          (ok true)
        )
        
        ERR_FINANCING_ALREADY_REFUNDED
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

(define-private (min (a uint) (b uint))
    (if (<= a b)
        a
        b
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
;; Implements a safe way to provide a valid ID for a financing offer
(define-private (increment-next-financing-id)
  (let ((current-id (var-get next-financing-id)))
    (var-set next-financing-id (+ current-id u1))
    current-id
  )
)
