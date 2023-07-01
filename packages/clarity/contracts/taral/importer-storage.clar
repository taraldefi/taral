;; Storage contract for taral importer
;; NOTE: To be only called by the respective parent contract
(define-data-var importer-id-nonce uint u10001)

(define-map importer-by-principal principal uint)

(define-map importer-profile 
    {
        importer-id: uint,
        hash: (buff 256)
    }  
    {
        name: (string-utf8 100),
        category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed importer
        orders-next-avail-id: uint,
        created: uint
    }  
)

(define-map orders 
    {
        id: uint,
        importer-id: uint,
        hash: (buff 256)
    } 
    {order-id: uint}
)

;; Read-only functions
(define-read-only (get-importer-by-principal (importer principal)) 
    (map-get? importer-by-principal importer)
)

(define-read-only (get-importer-id-nonce)
    (var-get importer-id-nonce)
)
(define-read-only (get-importer-profile (importer principal) (hash (buff 256)))
    (let ((importer-id (try! (get-importer-by-principal importer))))          
        (map-get? importer-profile {importer-id: importer-id, hash: hash})
    )
)

(define-read-only (get-importers (principals (list 10 principal)) (hashes (list 10 (buff 256)))) 
    (map get-importer-profile principals hashes)       
)

(define-read-only (get-orders-next-avail-id (importer {name: (string-utf8 100), category: (string-utf8 100), orders-next-avail-id: uint, created: uint} ))
    (get orders-next-avail-id importer)
)

;; @Desc function to get importer order
;; @Param id : order ID
;; @Param importer : principal of importer
(define-read-only (get-importer-order (id uint) (importer principal) (hash (buff 256)))
    (let ((importer-id (try! (get-importer-by-principal importer))))                             
        (map-get? orders { id: id,importer-id: importer-id, hash: hash})
    )       
)

;; @Desc function to get importer orders
;; @Param ids : list of 10 IDs
;; @Param principals : list of 10 principals
(define-read-only (get-importer-orders (ids (list 10 uint)) (principals (list 10 principal)) (hashes (list 10 (buff 256))) )    
    (filter is-valid-value (map get-importer-order ids principals hashes))      
)


;; Public functions
(define-public (increment-importer-id-nonce)
    (ok (var-set importer-id-nonce (+ (var-get importer-id-nonce) u1)))
)

(define-public (add-importer (importer principal) (importer-id uint)) 
    (ok (map-set importer-by-principal importer importer-id))
)

(define-public (add-order (id uint) (importer-id uint) (hash (buff 256)) (order-id uint)) 
    (ok 
        (map-insert orders {id: id,importer-id: importer-id, hash: hash}   
            {order-id: order-id }     
        )                  
    )   
)

(define-public (update-importer-profile (key-tuple {importer-id: uint, hash: (buff 256)}) (value-tuple {
    name: (string-utf8 100), 
    category: (string-utf8 100),
    orders-next-avail-id: uint,
    created: uint
    }))
    (ok
        (map-set importer-profile key-tuple value-tuple) 
    )
)

(define-public (add-importer-profile (importer-id uint) (hash (buff 256)) (importer-name (string-utf8 100)) (importer-category (string-utf8 100)))
    (ok (map-insert importer-profile 
            {importer-id: importer-id, hash: hash} 
            {   
                name: importer-name,
                category: importer-category,
                orders-next-avail-id: u0, 
                created: block-height
            }
        )
    )
)

;; @Desc function to to filter out none from list [none none (some XXX) none]
;; @Param value : tuple containing the order ID
(define-private (is-valid-value (value (optional {order-id: uint})))
    (is-some value)
)