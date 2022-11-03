;; Exporter
;; Smart Contract 
;;     Should record exporter name
;;     Should record exporter area of export
;;     Should record exporter's transaction (purchase/sale) history


;; constants
(define-constant ERR-GENERIC (err u100))
(define-constant ERR-PERMISSION-DENIED (err u101))

(define-constant ERR-EXPORTER-NOT-REGISTERED (err u120))
(define-constant ERR-EXPORTER-ALREADY-REGISTERED (err u121))

;; data maps and vars
(define-data-var exporterIdNonce uint u10001)

(define-map exporterByPrincipal
  principal
  uint
)

(define-map exporterProfile {exporterId: uint} 
  {    
    name: (string-utf8 100), 
    category: (string-utf8 100), ;; Merchant /Manufacturer /Service /Project /Deemed Exporter
    ordersNextAvailId: uint
  }  
)

(define-map orders 
    {id: uint,
     exporterId: uint
    } 
    {       
      orderId: uint
    }
)

;; private functions
(define-private (get-or-create-exporter-id (exporter principal))

  (match (map-get? exporterByPrincipal exporter) 
          value 
          value  (let ((exporterId (var-get exporterIdNonce)))  
                      (map-set exporterByPrincipal exporter exporterId)
                      (var-set exporterIdNonce (+ u1 exporterId))
                      exporterId
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
(define-read-only (get-exporter-id (exporter principal))

  (map-get? exporterByPrincipal exporter)
)

(define-read-only (get-next-exporter-id)    

  (var-get exporterIdNonce)
)

(define-read-only (get-exporter-profile (exporter principal))

  (let ((exporterId (try! (get-exporter-id exporter))))          
     (map-get? exporterProfile {exporterId: exporterId})
  )
)

(define-read-only (get-exporters (principals (list 10 principal))) 
  
  (map get-exporter-profile principals)       
)

(define-read-only (get-exporter-order (id uint) (exporter principal))

  (let ((exporterId (try! (get-exporter-id exporter))))                              
    (map-get? orders { id: id,
                       exporterId: exporterId, 
                     }
    )
  )       
)

(define-read-only (get-exporter-orders (ids (list 10 uint)) (principals (list 10 principal)) )    

  (filter is-valid-value (map get-exporter-order ids principals))      
)

;; public functions
(define-public (register (exporter principal) 
                         (exporterName (string-utf8 100)) 
                         (exporterCategory (string-utf8 100)))

  (begin 
            
      ;; (asserts! (is-eq tx-sender exporter) 
      ;;           PERMISSION_DENIED_ERROR
      ;; )

      (asserts! (is-none (map-get? exporterByPrincipal exporter)) ERR-EXPORTER-ALREADY-REGISTERED)
      (asserts! (> (len exporterName) u0) ERR-GENERIC)
      (asserts! (> (len exporterCategory) u0) ERR-GENERIC) 
      
      (ok (let ((exporterId (get-or-create-exporter-id exporter)))
            exporterId 
            (map-insert exporterProfile {exporterId: exporterId} 
                                         {name: exporterName, 
                                          category: exporterCategory,
                                          ordersNextAvailId: u0
                                         }
            )
      ))
  )
)

(define-public (append-order (newOrderId uint)
                             (exporter principal)
               )
  (begin 

      ;; (asserts! (is-eq tx-sender importer) 
      ;;            PERMISSION_DENIED_ERROR
      ;; )


    ;; validate exporter           
    (let ((OptExporterId (get-exporter-id exporter)))

      (asserts! (not (is-none OptExporterId)) ERR-EXPORTER-NOT-REGISTERED)
      
      ;; ? validate the new order 

      (let ((exporterId (unwrap-panic OptExporterId)))
        ;; update ordersNextAvailId, exporter tuple, and orders  
        (let ((currentExporter (unwrap-panic (get-exporter-profile exporter)) ))                    
          (let ((newId (get ordersNextAvailId currentExporter) ))  

            (map-set exporterProfile {exporterId: exporterId} 
                (merge currentExporter { ordersNextAvailId: (+ u1 newId)})
            )            
          
            (ok 
              (map-insert orders {id: newId,
                                  exporterId: exporterId}   
                                 {orderId: newOrderId }     
              )                  
            )
          )
        )
      )

    )
  )
)
