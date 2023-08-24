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
    downpayment: uint
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
    number-of-downpayments: uint
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
    year: uint
  }
)

;; Counter for Purchase Orders and Bids
(define-data-var next-purchase-order-id uint u1)
(define-data-var next-bid-id uint u1)

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
      }
    )
    (ok po-id)
  )
)

;; Place a bid for a purchase order
(define-public (place-bid (purchase-order-id uint) (bid-amount uint) (interest-rate uint) (number-of-downpayments uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "No PO found")))
        (bid-id (var-get next-bid-id)))
    (var-set next-bid-id (+ bid-id u1))
    (map-set bids 
      { id: bid-id }
      {
        purchase-order-id: purchase-order-id,
        bid-amount: bid-amount,
        lender-id: (some tx-sender),
        is-accepted: false,
        interest-rate: interest-rate,
        number-of-downpayments: number-of-downpayments,
      }
    )
    (ok bid-id)
  )
)

;; Accept a bid for a purchase order (by the borrower)
(define-public (accept-bid (bid-id uint))
  (let ((bid (unwrap! (map-get? bids { id: bid-id }) (err "Bid not found")))
        (po (unwrap! (map-get? purchase-orders { id: (get purchase-order-id bid) }) (err "Purchase order not found"))))
    (asserts! (is-eq tx-sender (get borrower-id po)) (err "Only the borrower can accept the bid"))
    (map-set purchase-orders { id: (get purchase-order-id bid) } {
      borrower-id: (get borrower-id po),
      lender-id: (get lender-id bid),
      seller-id: (get seller-id po),
      total-amount: (get total-amount po),
      downpayment: (get downpayment po)
    })
    (map-set bids { id: bid-id } (merge bid { is-accepted: true }))
    (ok bid-id)
  )
)

;; Make a payment
(define-public (make-payment (purchase-order-id uint) (month uint) (year uint) (amount uint))
  (let ((po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err "PO not found"))))
    (map-set payments
      { id: (var-get next-purchase-order-id) } 
      {
        borrower-id: (get borrower-id po),
        purchase-order-id: purchase-order-id,
        amount: amount,
        month: month,
        year: year
      }
    )
    (var-set next-purchase-order-id (+ (var-get next-purchase-order-id) u1))
    (ok purchase-order-id)
  )
)

(define-private (default-lender-id) 
  (some 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB) ;; this is a dummy principal value
)
