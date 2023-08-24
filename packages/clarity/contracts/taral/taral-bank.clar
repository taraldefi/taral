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
    outstanding-amount: uint
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
                          ;; ... other fields ...
                          borrower-id: (get borrower-id po),
                          downpayment: (get downpayment po),
                          lender-id: (get lender-id po),
                          seller-id: (get seller-id po),
                          total-amount: (get total-amount po),
                          overpaid-balance: remaining-balance,
                          payments-left: updated-payments-left,
                          first-payment-year: (if (is-eq updated-payments-left (get duration bid)) current-year (get first-payment-year po)),
                          first-payment-month: (if (is-eq updated-payments-left (get duration bid)) current-month (get first-payment-month po)),
                          outstanding-amount: (- (get outstanding-amount po) (* required-amount actual-months-covered))
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
        outstanding-amount: (- total-amount downpayment)
      }
    )
    (ok po-id)
  )
)

(define-constant protocol-interest-rate u5) ;; 5% protocol interest

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
        monthly-payment: monthly-payment-amount
      }
    )
    (ok bid-id)
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
        first-payment-year: (get first-payment-year po)  ;; This will be updated when the first payment is made
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

(define-private (default-lender-id) 
  (some 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB) ;; this is a dummy principal value
)

