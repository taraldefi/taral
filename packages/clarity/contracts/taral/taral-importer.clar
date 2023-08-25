;; importer
;; Smart Contract 
;;     Should record importer name
;;     Should record importer area of import
;;     Should record importer's transaction (purchase/sale) history


;; constants

(define-constant ERR-GENERIC (err u100))
(define-constant ERR-PERMISSION-DENIED (err u101))

(define-constant ERR-IMPORTER-NOT-REGISTERED (err u121))
(define-constant ERR-IMPORTER-ALREADY-REGISTERED (err u102))

;; data maps and vars
(define-data-var importerIdNonce uint u10001)

(define-map importerByPrincipal
  principal
  uint
)

(define-map importerProfile {importerId: uint} 
  {
    name: (string-utf8 100), 
    category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed Importer
    ordersNextAvailId: uint
  }  
)

(define-map orders 
    {id: uint,
     importerId: uint
    } 
    {       
      orderId: uint
    }
)

;; private functions
(define-private (get-or-create-importer-id (importer principal))

  (match (map-get? importerByPrincipal importer) 
          value 
          value  (let ((importerId (var-get importerIdNonce)))  
                      (map-set importerByPrincipal importer importerId)
                      (var-set importerIdNonce (+ u1 importerId))
                      importerId
                  )
  )
)

;; to filter out none from list [none none (some XXX) none]
(define-private (is-valid-value
                  (value (optional 
                          {orderId: uint}
                  ))
                )

   (is-some value)
)

;; read-only functions
(define-read-only (get-importer-id (importer principal))

  (map-get? importerByPrincipal importer)
)

(define-read-only (get-next-importer-id)    

  (var-get importerIdNonce)
)

(define-read-only (get-importer-profile (importer principal))

  (let ((importerId (try! (get-importer-id importer))))          
     (map-get? importerProfile {importerId: importerId})
  )
)

(define-read-only (get-importers (principals (list 10 principal))) 
  
  (map get-importer-profile principals)       
)

(define-read-only (get-importer-order (id uint) (importer principal))

  (let ((importerId (try! (get-importer-id importer))))                              
    (map-get? orders { id: id, 
                       importerId: importerId
                     }
    )
  )       
)

(define-read-only (get-importer-orders (ids (list 10 uint)) (principals (list 10 principal)) )    

  (filter is-valid-value (map get-importer-order ids principals))      
)

;; public functions
(define-public (register (importer principal) 
                         (importerName (string-utf8 100)) 
                         (importerCategory (string-utf8 100)))

  (begin 

      ;; (asserts! (is-eq tx-sender importer) 
      ;;            PERMISSION_DENIED_ERROR
      ;; )

      (asserts! (is-none (map-get? importerByPrincipal importer)) ERR-IMPORTER-ALREADY-REGISTERED)
      (asserts! (> (len importerName) u0) ERR-GENERIC)
      (asserts! (> (len importerCategory) u0) ERR-GENERIC) 
      
      (ok (let ((importerId (get-or-create-importer-id importer)))
            importerId 
            (map-insert importerProfile {importerId: importerId} 
                                         {name: importerName, 
                                          category: importerCategory,
                                          ordersNextAvailId: u0
                                         }
            )
      ))
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (append-order (newOrderId uint)
                             (importer principal)                                                       
               )
  (begin 

      ;; (asserts! (is-eq tx-sender importer) 
      ;;            PERMISSION_DENIED_ERROR
      ;; )


    ;; validate importer       
    (let ((optImporterId (get-importer-id importer)))

      (asserts! (not (is-none optImporterId)) ERR-IMPORTER-NOT-REGISTERED)
        
      ;; ? validate the new order 

      (let ((importerId (unwrap-panic optImporterId)))
      
        ;; update ordersNextAvailId & importer orderId
        (let ((currentImporter (unwrap-panic (get-importer-profile importer)) ))                    
          (let ((newId (get ordersNextAvailId currentImporter) ))  

            (map-set importerProfile {importerId: importerId}               
              (merge currentImporter { ordersNextAvailId: (+ u1 newId)})
            )        

            (ok 
              (map-insert orders {id: newId,
                                  importerId: importerId}   
                                {orderId: newOrderId }     
              )                  
            )
          )
        )        
      )          

    )
  )
)
