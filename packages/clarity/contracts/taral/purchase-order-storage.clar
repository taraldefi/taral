;; Storage contract for purchase order contract

;; data maps and vars
(define-data-var order-id-nonce uint u10001)

(define-map order {id: uint} 
  {    
    exporter-id: uint,
    importer-id: uint,
    hash: (buff 256),
    payment-term: (string-utf8 200), ;; 30/60/90/120 Days, 50% Deposit, balance upon bill of lading
    amount: uint,        
    delivery-term: (string-utf8 10) ;; FOB CIF, CFR, 
  }  
)

(define-map order-detail {id: uint} 
  {
    hash: (buff 256)  
  }  
)

;; Read only functions

;; @Desc get purchase order from ID
;; @Param order-id: order ID of type uint
(define-read-only (get-purchase-order (order-id uint))
  (map-get? order {id: order-id})
)

;; @Desc get list of purchase orders from ID list
;; @param order-ids: 100 unique order IDs of type uint
(define-read-only (get-purchase-orders (order-ids (list 100 uint))) 
  (filter is-valid-value (map get-purchase-order order-ids))  
)

;; @Desc get purchase order detail from ID
;; @Param order-id: order ID of type uint
(define-read-only (get-purchase-order-detail (order-id uint))
  (map-get? order-detail {id: order-id})
)

;; @Desc get current order ID
(define-read-only (get-order-id-nonce)
    (var-get order-id-nonce)
)

;; @Desc increments the order ID by 1, used after adding an order
(define-public (increment-order-id-nonce)
    (ok (var-set order-id-nonce (+ u1 (var-get order-id-nonce))))
)

;; public functions

;; @Desc function to insert order object
;; @Param exporter-id: ID of exporter of type unit
;; @Param importer-id: ID of importer of type uint
;; @Param order-hash: Hashed data of order data
;; @Param payment-term: 30/60/90/120 Days, 50% Deposit, balance upon bill of lading of type string UTF8
;; @Param amount: amount in uint
;; @param delivery-term: Terms of delivery of type string UTF8 eg: FOB CIF, CFR

(define-public (add-order 
    (exporter-id uint)
    (importer-id uint)
    (order-hash (buff 256))
    (payment-term (string-utf8 200))                                
    (amount uint)
    (delivery-term (string-utf8 10)))
    (ok (map-insert order 
        {id: (get-order-id-nonce)} 
        {
            exporter-id: exporter-id,
            importer-id: importer-id,
            hash: order-hash,
            payment-term: payment-term,    
            amount: amount,
            delivery-term: delivery-term
        })
    )
)

;; @Desc function to insert order detail object
;; @Param order-detail-hash: Hashed data of order details

(define-public (add-order-details 
    (order-detail-hash (buff 256)))
    (ok (map-insert order-detail 
        {id: (get-order-id-nonce)} 
        {hash: order-detail-hash})
    )
)

;; to filter out none from list [none none (some XXX) none]
(define-private (is-valid-value
    (value (optional 
        {
            exporter-id: uint,
            importer-id: uint,
            hash: (buff 256),
            payment-term: (string-utf8 200), ;; 30/60/90/120 Days, 50% Deposit, balance upon bill of lading
            amount: uint,        
            delivery-term: (string-utf8 10) ;; FOB CIF, CFR, 
        })
    ))
   
  (is-some value)
)

