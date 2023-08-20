;; Storage contract for taral importer
;; NOTE: To be only called by the respective parent contract
(define-data-var importer-id-nonce uint u10001)

(define-map importer-by-principal principal uint)

(define-map importer-profile 
    {
        importer-id: uint
    }  
    {
        name: (string-utf8 100),
        hash: (buff 256),
        category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed importer
        orders-next-avail-id: uint,
        successful-transactions: uint,
        failed-transactions: uint,
        created: uint
    }  
)

(define-map orders 
    {
        id: uint,
        importer-id: uint
    } 
    {
        order-id: uint
    }
)

;; Read-only functions
(define-read-only (get-importer-by-principal (importer principal)) 
    (map-get? importer-by-principal importer)
)

(define-read-only (get-importer-id-nonce)
    (var-get importer-id-nonce)
)

(define-read-only (get-importer-profile (importer principal))
    (let ((importer-id (try! (get-importer-by-principal importer))))          
        (map-get? importer-profile {importer-id: importer-id})
    )
)

(define-read-only (get-importers (principals (list 10 principal))) 
    (map get-importer-profile principals)       
)

(define-read-only (get-orders-next-avail-id (importer {
    name: (string-utf8 100), 
    hash: (buff 256), 
    category: (string-utf8 100), 
    orders-next-avail-id: uint, 
    successful-transactions: uint,
    failed-transactions: uint,
    created: uint
    } )
)
    (get orders-next-avail-id importer)
)

;; @Desc function to get importer order
;; @Param id : order ID
;; @Param importer : principal of importer
(define-read-only (get-importer-order (id uint) (importer principal))
    (let ((importer-id (try! (get-importer-by-principal importer))))                             
        (map-get? orders { id: id,importer-id: importer-id})
    )       
)

;; @Desc function to get importer orders
;; @Param ids : list of 10 IDs
;; @Param principals : list of 10 principals
(define-read-only (get-importer-orders (ids (list 10 uint)) (principals (list 10 principal)))    
    (filter is-valid-value (map get-importer-order ids principals))      
)


;; Public functions
(define-public (increment-importer-id-nonce)
    (ok (var-set importer-id-nonce (+ (var-get importer-id-nonce) u1)))
)

(define-public (add-importer (importer principal) (importer-id uint)) 
    (ok (map-set importer-by-principal importer importer-id))
)

(define-public (add-order (id uint) (importer-id uint) (order-id uint)) 
    (ok 
        (map-insert orders {id: id,importer-id: importer-id}   
            {order-id: order-id }     
        )                  
    )   
)

(define-public (update-importer-profile (key-tuple {importer-id: uint}) (value-tuple {
    name: (string-utf8 100), 
    hash: (buff 256),
    category: (string-utf8 100),
    orders-next-avail-id: uint,
    created: uint,
    successful-transactions: uint,
    failed-transactions: uint
    }))
    (ok
        (map-set importer-profile key-tuple value-tuple) 
    )
)

(define-public (add-importer-profile (importer-id uint) (importer-name (string-utf8 100)) (hash (buff 256)) (importer-category (string-utf8 100)))
    (ok (map-insert importer-profile 
            {importer-id: importer-id} 
            {   
                name: importer-name,
                hash: hash,
                category: importer-category,
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