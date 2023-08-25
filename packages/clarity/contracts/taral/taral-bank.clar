;; Tokens for the platform
(define-fungible-token stablecoin)

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

(define-read-only (months-since-first-payment (first-year uint) (first-month uint) (current-year uint) (current-month uint))
  (-
    (+ (* (- current-year first-year) u12) current-month)
    first-month
  )
)

(define-read-only (missed-last-three-payments (purchase-order-id uint) (current-year uint) (current-month uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "Purchase order not found"))))
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
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "PO not found")))
        (bid (unwrap! (map-get? bids { id: purchase-order-id }) (err "Bid not found for this PO"))))
    (let ((required-amount (get monthly-payment bid))
          (overpaid-balance (get overpaid-balance po)))
      
      ;; Calculate total available amount (current payment + overpaid balance)
      (let ((total-available (+ amount overpaid-balance)))
        
        (if (< total-available required-amount)
            (err "Insufficient amount to cover monthly payment.")
            
            (begin
                ;; Calculate months covered by the payment using integer division
                (let ((months-covered (/ total-available required-amount)))
                  
                  ;; Check if months-covered is more than payments-left and adjust if necessary
                  (let ((actual-months-covered (if (> months-covered (get payments-left po)) 
                                                   (get payments-left po)
                                                   months-covered)))
                    
                    ;; Record payments for all months covered
                    (unwrap! (record-multiple-payments current-year current-month  purchase-order-id actual-months-covered required-amount (get borrower-id po) (get lender-id bid)) (err "Failed to record payments"))
                    
                    ;; Calculate any left-over overpaid balance
                    (let ((remaining-balance (- total-available (* required-amount actual-months-covered)))
                          (updated-payments-left (- (get payments-left po) actual-months-covered)))
                      
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
        )
      )
    )
  )
)

(define-public (check-purchase-order-health (purchase-order-id uint) (current-year uint) (current-month uint))
  (let ((missed-payments (unwrap! (missed-last-three-payments purchase-order-id current-year current-month) (err "Failed to check missed payments"))))
    (if missed-payments
        (begin
            ;; Mark the purchase order as ended unsuccessfully.
            (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "Purchase order not found"))))
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
                (let ((lender-principal (unwrap! (get lender-id po) (err "No lender found for this purchase order"))))
                    (unwrap! (contract-call? .taral-importer-v1 update-importer-track-record (get borrower-id po) false) (err "Failed to update borrower's track record"))
                    (unwrap! (contract-call? .taral-exporter-v1 update-exporter-track-record (get seller-id po) false) (err "Failed to update seller's track record"))
                    (unwrap! (contract-call? .taral-lender update-lender-track-record lender-principal false) (err "Failed to update lender's track record"))


                    (ok purchase-order-id)
                )
            )
        )
        (err "No missed payments found")
    )
  )
)


;; Helper function to record multiple payments
(define-private (record-multiple-payments 
(current-year uint) (current-month uint)
    (purchase-order-id uint) (months uint) (amount-per-month uint) (borrower principal) (lender (optional principal)))
  (begin
    (unwrap! (ft-transfer? stablecoin (* months amount-per-month) borrower (unwrap! lender (err "Faled"))) (err "Failed to transfer stablecoin"))
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
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "No PO found")))
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

(define-public (update-bid-number-of-downpayments (bid-id uint) (new-number-of-downpayments uint))
  (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
    (lender-id (unwrap! (get lender-id bid) (err "No lender associated with this purchase bid")))
    (accepted-bid-id (get accepted-bid-id (unwrap-panic (map-get? purchase-orders { id: (get purchase-order-id bid) }))))
  )
     (if (and (not (is-none accepted-bid-id)) (is-eq bid-id (unwrap-panic accepted-bid-id)))
        (err "Cannot update or retract an accepted bid.")

        (if (not (get refunded bid))
        (begin
            (map-set bids 
                { id: bid-id } 
                (merge bid { number-of-downpayments: new-number-of-downpayments })
            )
            (ok true)
        )
        (err "Bid already refunded. Cannot update.")
    )
    )
  )
)

(define-public (update-interest (id uint) (new-interest uint))
  (let ((bid (unwrap-panic (map-get? bids { id: id })))
    (lender-id (unwrap! (get lender-id bid) (err "No lender associated with this purchase bid")))
    (accepted-bid-id (get accepted-bid-id (unwrap-panic (map-get? purchase-orders { id: (get purchase-order-id bid) }))))
  )

    (if (and (not (is-none accepted-bid-id)) (is-eq id (unwrap-panic accepted-bid-id)))
        (err "Cannot update or retract an accepted bid.")

        (if (not (get refunded bid))
            (begin
                (map-set bids 
                    { id: id } 
                    (merge bid { interest-rate: new-interest })
                )
                (ok true)
            )
            (err "Bid already refunded. Cannot update.")
        )
    )
  )
)

;; Refund a bid
(define-private (refund-bid (bid-id uint))
    (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
    (lender-id (unwrap! (get lender-id bid) (err "No lender associated with this purchase bid")))
    
    )
      (if (not (get refunded bid))
        (begin
          (unwrap! (ft-transfer? stablecoin (get bid-amount bid) contract-caller lender-id) (err "Failed to transfer stablecoin"))

          ;; Mark bid as accepted
            (map-set bids 
            { id: bid-id } 
            (merge bid { refunded: true })
            )

          (ok true)
        )
        (err "Bid already refunded")
      )
    )
  )

;; Retract or update a bid
(define-public (update-bid (bid-id uint) (new-amount (optional uint)))
  (let ((bid (unwrap-panic (map-get? bids { id: bid-id })))
        (old-amount (get bid-amount bid))
        (lender-id (unwrap! (get lender-id bid) (err "No lender associated with this bid")))
        )
    
    ;; Fetch the purchase order's accepted bid ID
    (let ((accepted-bid-id (get accepted-bid-id (unwrap-panic (map-get? purchase-orders { id: (get purchase-order-id bid) })))))
      
      ;; Check if the bid was the accepted one
      (if (and (not (is-none accepted-bid-id)) (is-eq bid-id (unwrap-panic accepted-bid-id)))
        (err "Cannot update or retract an accepted bid.")

        ;; Check if the bid was already refunded
        (if (get refunded bid)
          (err "Bid already refunded. Cannot update.")
          
          ;; If no new amount is provided or it's zero, we consider this a retraction and refund the bid
          (if (or (is-none new-amount) (is-eq (unwrap-panic new-amount) u0))
            (refund-bid bid-id)
            
            ;; If the new amount is more than the old amount
            (if (> (unwrap-panic new-amount) old-amount)
              (let ((difference (- (unwrap-panic new-amount) old-amount)))
                ;; Transfer the difference from the bidder to the contract
                (if (is-ok (ft-transfer? stablecoin difference lender-id contract-caller))
                  (begin

                    (map-set bids 
                        { id: bid-id } 
                        (merge bid { bid-amount: (unwrap-panic new-amount) })
                    )
                    (ok true)
                  )
                  (err "Transfer failed. Not enough funds?")
                )
              )
              
              ;; If the new amount is less than the old amount
              (let ((difference (- old-amount (unwrap-panic new-amount))))
                ;; Transfer the difference from the contract back to the bidder
                (if (is-ok (ft-transfer? stablecoin difference contract-caller lender-id))
                  (begin
                    (map-set bids 
                            { id: bid-id } 
                            (merge bid { bid-amount: (unwrap-panic new-amount) })
                    )
                    (ok true)
                  )
                  (err "Transfer failed. Contract does not have enough funds?")
                )
              )
            )
          )
        )
      )
    )
  )
)

(define-public (accept-bid (bid-id uint))
  (let ((bid (unwrap! (map-get? bids { id: bid-id }) (err "Bid not found")))
        (po (unwrap! (map-get? purchase-orders { id: (get purchase-order-id bid) }) (err "Purchase order not found"))))
    (asserts! (is-eq tx-sender (get borrower-id po)) (err "Only the borrower can accept the bid"))

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
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "Purchase order not found")))
        (lender-id (unwrap! (get lender-id po) (err "No lender associated with this purchase order")))
        (borrower-id (get borrower-id po))
        (seller-id (get seller-id po))
    )

    ;; Verify that the outstanding amount is fully paid
    (asserts! (<= (get outstanding-amount po) u0) (err "Purchase order has not been fully paid"))

    (unwrap! (contract-call? .taral-importer-v1 update-importer-track-record borrower-id true) (err "Failed to update borrower's track record"))
    (unwrap! (contract-call? .taral-exporter-v1 update-exporter-track-record seller-id true) (err "Failed to update seller's track record"))
    (unwrap! (contract-call? .taral-lender update-lender-track-record lender-id true) (err "Failed to update lender's track record"))



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