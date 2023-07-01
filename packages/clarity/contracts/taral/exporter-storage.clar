;; Storage contract for taral exporter
;; NOTE: To be only called by the respective parent contract
(define-data-var exporter-id-nonce uint u10001)

(define-map exporter-by-principal principal uint)

(define-map exporter-profile 
    {
        exporter-id: uint,
        hash: (buff 256)
    }  
    {
        name: (string-utf8 100),
        category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed exporter
        orders-next-avail-id: uint,
        created: uint
    }  
)

(define-map orders 
    {
        id: uint,
        exporter-id: uint,
        hash: (buff 256)
    } 
    {order-id: uint}
)

;; Read-only functions
(define-read-only (get-exporter-by-principal (exporter principal)) 
    (map-get? exporter-by-principal exporter)
)

(define-read-only (get-exporter-id-nonce)
    (var-get exporter-id-nonce)
)
(define-read-only (get-exporter-profile (exporter principal) (hash (buff 256)))
    (let ((exporter-id (try! (get-exporter-by-principal exporter))))          
        (map-get? exporter-profile {exporter-id: exporter-id, hash: hash})
    )
)

(define-read-only (get-exporters (principals (list 10 principal)) (hashes (list 10 (buff 256)))) 
    (map get-exporter-profile principals hashes)       
)

(define-read-only (get-orders-next-avail-id (exporter {name: (string-utf8 100), category: (string-utf8 100), orders-next-avail-id: uint, created: uint} ))
    (get orders-next-avail-id exporter)
)

;; @Desc function to get exporter order
;; @Param id : order ID
;; @Param exporter : principal of exporter
(define-read-only (get-exporter-order (id uint) (exporter principal) (hash (buff 256)))
    (let ((exporter-id (try! (get-exporter-by-principal exporter))))                             
        (map-get? orders { id: id,exporter-id: exporter-id, hash: hash})
    )       
)

;; @Desc function to get exporter orders
;; @Param ids : list of 10 IDs
;; @Param principals : list of 10 principals
(define-read-only (get-exporter-orders (ids (list 10 uint)) (principals (list 10 principal)) (hashes (list 10 (buff 256))) )    
    (filter is-valid-value (map get-exporter-order ids principals hashes))      
)


;; Public functions
(define-public (increment-exporter-id-nonce)
    (ok (var-set exporter-id-nonce (+ (var-get exporter-id-nonce) u1)))
)

(define-public (add-exporter (exporter principal) (exporter-id uint)) 
    (ok (map-set exporter-by-principal exporter exporter-id))
)

(define-public (add-order (id uint) (exporter-id uint) (hash (buff 256)) (order-id uint)) 
    (ok 
        (map-insert orders {id: id,exporter-id: exporter-id, hash: hash}   
            {order-id: order-id }     
        )                  
    )   
)

(define-public (update-exporter-profile (key-tuple {exporter-id: uint, hash: (buff 256)}) (value-tuple {
    name: (string-utf8 100), 
    category: (string-utf8 100),
    orders-next-avail-id: uint,
    created: uint
    }))
    (ok
        (map-set exporter-profile key-tuple value-tuple) 
    )
)

(define-public (add-exporter-profile (exporter-id uint) (hash (buff 256)) (exporter-name (string-utf8 100)) (exporter-category (string-utf8 100)))
    (ok (map-insert exporter-profile 
            {exporter-id: exporter-id, hash: hash} 
            {   
                name: exporter-name,
                category: exporter-category,
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