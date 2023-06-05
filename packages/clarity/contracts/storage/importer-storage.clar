;; Storage contract for taral importer

(define-data-var importer-id-nonce uint u10001)

(define-map importer-by-principal principal uint)

(define-map importer-profile {importer-id: uint} 
  {
    name: (string-utf8 100), 
    category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed Importer
    orders-next-avail-id: uint
  }  
)

(define-map orders {id: uint,importer-id: uint} {order-id: uint})


;; Read-only functions

(define-read-only (get-importer-by-principal (importer principal)) 
    (map-get? importer-by-principal importer)
)

(define-read-only (get-importer-id-nonce)
    (var-get importer-id-nonce)
)

(define-read-only (get-importer-profile-by-id (importer-id uint)) 
    (map-get? importer-profile {importer-id: importer-id})
)

(define-read-only (get-orders (id uint) (importer-id uint))
   (map-get? orders { id: id,importer-id: importer-id})
)

(define-read-only (get-orders-next-avail-id (importer {name: (string-utf8 100), category: (string-utf8 100), orders-next-avail-id: uint} ))
    (get orders-next-avail-id importer)
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

(define-public (add-importer-profile (importer-id uint) (importer-name (string-utf8 100)) (importer-category (string-utf8 100)))
    (ok (map-insert importer-profile {importer-id: importer-id} 
                                     {
                                        name: importer-name, 
                                        category: importer-category,
                                        orders-next-avail-id: u0                                       
                                    }
        )
    )
)

