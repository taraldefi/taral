;; Storage contract for taral exporter
;; NOTE: To be only called by the respective parent contract
(define-data-var exporter-id-nonce uint u1)

(define-map exporter-by-principal principal uint)

(define-map exporter-profile 
    {
        exporter-id: uint
    }  
    {
        name: (string-utf8 100),
        hash: (buff 256),
        category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed exporter
        orders-next-avail-id: uint,
        successful-transactions: uint,
        failed-transactions: uint,
        created: uint
    }  
)

(define-map orders 
    {
        id: uint,
        exporter-id: uint
    } 
    {
        order-id: uint
    }
)

;; Read-only functions
(define-read-only (get-exporter-by-principal (exporter principal)) 
    (map-get? exporter-by-principal exporter)
)

(define-read-only (get-exporter-id-nonce)
    (var-get exporter-id-nonce)
)

(define-read-only (get-exporter-profile (exporter principal))
    (let ((exporter-id (try! (get-exporter-by-principal exporter))))          
        (map-get? exporter-profile {exporter-id: exporter-id})
    )
)

(define-read-only (get-exporters (principals (list 10 principal))) 
    (map get-exporter-profile principals)       
)

(define-read-only (get-orders-next-avail-id (exporter 
    { 
        name: (string-utf8 100),
        hash: (buff 256), 
        category: (string-utf8 100), 
        orders-next-avail-id: uint,
        successful-transactions: uint,
        failed-transactions: uint,
        created: uint
    } )
)
    (get orders-next-avail-id exporter)
)

;; @Desc function to get exporter order
;; @Param id : order ID
;; @Param exporter : principal of exporter
(define-read-only (get-exporter-order (id uint) (exporter principal))
    (let ((exporter-id (try! (get-exporter-by-principal exporter))))                             
        (map-get? orders { id: id,exporter-id: exporter-id})
    )       
)

;; @Desc function to get exporter orders
;; @Param ids : list of 10 IDs
;; @Param principals : list of 10 principals
(define-read-only (get-exporter-orders (ids (list 10 uint)) (principals (list 10 principal)))    
    (filter is-valid-value (map get-exporter-order ids principals))      
)


;; Public functions
(define-public (increment-exporter-id-nonce)
    (ok (var-set exporter-id-nonce (+ (var-get exporter-id-nonce) u1)))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-exporter (exporter principal) (exporter-id uint)) 
    (ok (map-set exporter-by-principal exporter exporter-id))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-order (id uint) (exporter-id uint) (order-id uint)) 
    (ok 
        (map-insert orders {id: id,exporter-id: exporter-id}   
            {order-id: order-id }     
        )                  
    )   
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-exporter-profile (key-tuple {exporter-id: uint}) (value-tuple {
    name: (string-utf8 100), 
    hash: (buff 256),
    category: (string-utf8 100),
    orders-next-avail-id: uint,
    successful-transactions: uint,
    failed-transactions: uint,
    created: uint
    }))
    (ok
        (map-set exporter-profile key-tuple value-tuple) 
    )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-exporter-profile (exporter-id uint) (exporter-name (string-utf8 100)) (hash (buff 256)) (exporter-category (string-utf8 100)))
    (ok (map-insert exporter-profile 
            {exporter-id: exporter-id} 
            {   
                name: exporter-name,
                hash: hash,
                category: exporter-category,
                orders-next-avail-id: u0, 
                created: block-height,
                successful-transactions: u0,
                failed-transactions: u0
            }
        )
    )
)

;; @Desc function to to filter out none from list [none none (some XXX) none]
;; @Param value : tuple containing the order ID
(define-private (is-valid-value (value (optional {order-id: uint})))
    (is-some value)
)