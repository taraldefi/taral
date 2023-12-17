

;; Counter for Purchase Orders and financing offers
(define-data-var next-purchase-order-id uint u1)
(define-data-var next-payment-id uint u1)
(define-data-var next-financing-id uint u1)

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
    outstanding-amount: uint,
    is-completed: bool,
    completed-successfully: bool,
    accepted-financing-id: (optional uint),
    is-canceled: bool,
    has-active-financing: bool,
    created-at: uint,  ;; Timestamp of creation
    updated-at: uint,   ;; Timestamp of last update
  }
)

(define-map po-financing ;; this will be called financing-offers
  {
    id: uint
  }
  {
    purchase-order-id: uint,
    financing-amount: uint,
    lender-id: principal,
    is-accepted: bool,
    interest-rate: uint,
    refunded: bool,
    is-rejected: bool,
    created-at: uint,  ;; Timestamp of creation
    accepted-at: uint, ;; Timestamp of acceptance
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
    block: uint,
  }
)

(define-read-only (get-purchase-order-by-id (id uint))
  (map-get? purchase-orders { id: id })
)

(define-read-only (get-financing-offer-by-id (id uint))
  (map-get? po-financing { id: id })
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-financing (financing-id uint) (financing {
  purchase-order-id: uint,
    financing-amount: uint,
    lender-id: principal,
    is-accepted: bool,
    interest-rate: uint,
    refunded: bool,
    is-rejected: bool,
    created-at: uint,  ;; Timestamp of creation
    accepted-at: uint, ;; Timestamp of acceptance
}))    
  (begin 
    (map-set po-financing { id: financing-id }
      {
        purchase-order-id: (get purchase-order-id financing),
        financing-amount: (get financing-amount financing),
        lender-id: (get lender-id financing),
        is-accepted: (get is-accepted financing),
        interest-rate: (get interest-rate financing),
        refunded: (get refunded financing),
        is-rejected: (get is-rejected financing),
        created-at: (get created-at financing),
        accepted-at: (get accepted-at financing),
      }
    )

    (ok financing-id)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-financing (financing {
  purchase-order-id: uint,
    financing-amount: uint,
    lender-id: principal,
    is-accepted: bool,
    interest-rate: uint,
    refunded: bool,
    is-rejected: bool,
    created-at: uint,  ;; Timestamp of creation
    accepted-at: uint, ;; Timestamp of acceptance
}))

  (let 
    (
      (financing-id (increment-next-financing-id))
    )

    (map-set po-financing { id: financing-id }
      {
        purchase-order-id: (get purchase-order-id financing),
        financing-amount: (get financing-amount financing),
        lender-id: (get lender-id financing),
        is-accepted: (get is-accepted financing),
        interest-rate: (get interest-rate financing),
        refunded: (get refunded financing),
        is-rejected: (get is-rejected financing),
        created-at: (get created-at financing),
        accepted-at: (get accepted-at financing),
      }
    )
    
    (ok financing-id)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-payment (payment {
    borrower-id: principal,
    purchase-order-id: uint,
    amount: uint,
    block: uint,
  }))
  
  (ok (map-set payments
    {
      id: (increment-next-payment-id)
    }
    {
      borrower-id: (get borrower-id payment),
      purchase-order-id: (get purchase-order-id payment),
      amount: (get amount payment),
      block: block-height
    }
  ))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-purchase-order (id uint) (po {
  borrower-id: principal,
  lender-id: (optional principal),
  seller-id: principal,
  total-amount: uint,
  downpayment: uint,
  outstanding-amount: uint,
  is-completed: bool,
  completed-successfully: bool,
  accepted-financing-id: (optional uint),
  is-canceled: bool,
  has-active-financing: bool,
  created-at: uint,  ;; Timestamp of creation
  updated-at: uint,   ;; Timestamp of last update
}))
  (ok (map-set purchase-orders 
                          {
                            id: id
                          }
                          {
                            borrower-id: (get borrower-id po),
                            lender-id: (get lender-id po),
                            seller-id: (get seller-id po),
                            total-amount: (get total-amount po),
                            downpayment: (get downpayment po),
                            outstanding-amount: (get outstanding-amount po),
                            is-completed: (get is-completed po),
                            completed-successfully: (get completed-successfully po),
                            accepted-financing-id: (get accepted-financing-id po),
                            is-canceled: (get is-canceled po),
                            has-active-financing: (get has-active-financing po),
                            created-at: (get created-at po),
                            updated-at: (get updated-at po),
                          }
                        ))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-purchase-order (po {
  borrower-id: principal,
  lender-id: (optional principal),
  seller-id: principal,
  total-amount: uint,
  downpayment: uint,
  outstanding-amount: uint,
  is-completed: bool,
  completed-successfully: bool,
  accepted-financing-id: (optional uint),
  is-canceled: bool,
  has-active-financing: bool,
  created-at: uint,  ;; Timestamp of creation
  updated-at: uint,   ;; Timestamp of last update
}))
  (let (
    (purchase-order-id (increment-next-purchase-order-id))
  )

  (map-set purchase-orders 
                          {
                            id: purchase-order-id
                          }
                          {
                            borrower-id: (get borrower-id po),
                            lender-id: (get lender-id po),
                            seller-id: (get seller-id po),
                            total-amount: (get total-amount po),
                            downpayment: (get downpayment po),
                            outstanding-amount: (get outstanding-amount po),
                            is-completed: (get is-completed po),
                            completed-successfully: (get completed-successfully po),
                            accepted-financing-id: (get accepted-financing-id po),
                            is-canceled: (get is-canceled po),
                            has-active-financing: (get has-active-financing po),
                            created-at: (get created-at po),
                            updated-at: (get updated-at po),
                          }
                        )
    (ok purchase-order-id)
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