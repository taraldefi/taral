;; NFT Purchase Order
;; Smart Contract 
;;     Should record Exporter 
;;     Should record Importer
;;     Should record Delivery Country 
;;     Should record Dispatch Method
;;     Should record Shipment Type
;;     Should record Shipping route.
;;     Should record Terms of payment 
;;     Should record Ttems
;;     Should record Amount in stable coin
;;     Should record Invoice Terms

;; constants
(define-constant ERR-GENERIC (err u100))
(define-constant ERR-PERMISSION-DENIED (err u101))

(define-constant ERR-EXPORTER-NOT-REGISTERED (err u120))
(define-constant ERR-IMPORTER-NOT-REGISTERED (err u121))


;; data maps and vars
(define-data-var orderIdNonce uint u10001)

(define-map order {id: uint} 
  {    
    exporterId: uint,
    importerId: uint,
    deliveryCountry: (string-utf8 10),            
    dispatchMethod: (string-utf8 50), ;; Air/ Courier/ Road /Sea      
    shipmentType: (string-utf8 10), ;; LCL, FCL, STL, FTL, LTL
    paymentTerm: (string-utf8 200), ;; 30/60/90/120 Days, 50% Deposit, balance upon bill of lading
    amount: uint,        
    invoiceTerms: (string-utf8 10) ;; FOB CIF, CFR, 
    ;; place and date of issue. ? block height <- created at 
    ;; orders-next-avail-id: uint,
    ;; status: uint 
  }  
)

(define-map orderDetail {id: uint} 
  {
    shippingRoute: (list 15 (string-utf8 50)), ;; loading-port > .....  > discharge-port    
    item: (list 30 { id: (string-utf8 50), ;; list of max 100 items
                     description: (string-utf8 1000), 
                     type: (string-utf8 50),  ;; each, box, ....  
                     quantity: uint,                     
                     unitPrice: uint
                   })    
  }  
)

;; private functions
(define-private (get-order-id)
   (let ((orderId (var-get orderIdNonce)))  
                   (var-set orderIdNonce (+ u1 orderId)
        )
        orderId
   )  
)

;; to filter out none from list [none none (some XXX) none]
(define-private (is-valid-value
                  (value (optional 
                          {exporterId: uint,
                           importerId: uint,
                           deliveryCountry: (string-utf8 10),            
                           dispatchMethod: (string-utf8 50), 
                           shipmentType: (string-utf8 10), 
                           paymentTerm: (string-utf8 200), 
                           amount: uint,        
                           invoiceTerms: (string-utf8 10) 
                          }
                        ))
                )
   
  (is-some value)
)

;; read-only functions
(define-read-only (get-purchase-order (orderId uint))

  (map-get? order {id: orderId})
)

(define-read-only (get-purchase-orders (orderIds (list 100 uint))) 
    
  (filter is-valid-value (map get-purchase-order orderIds) )  
)

(define-read-only (get-purchase-order-detail (orderId uint))

  (map-get? orderDetail {id: orderId})
)

;; public functions
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (initialize 
                  (exporter principal)
                  (importer principal)
                  (deliveryCountry (string-utf8 10))        
                  (dispatchMethod (string-utf8 50))
                  (shipmentType (string-utf8 10)) 
                  (shippingRoute (list 15 (string-utf8 50)))
                  (paymentTerm (string-utf8 200))                  
                  (items (list 30 { id: (string-utf8 50), 
                                    description: (string-utf8 1000), 
                                    type: (string-utf8 50),  
                                    quantity: uint,                     
                                    unitPrice: uint
                                  }) )                   
                  (amount uint)
                  (invoiceTerms (string-utf8 10))                      
                )
  (begin 

    ;; (asserts! (is-eq tx-sender exporter) 
    ;;           ERR-PERMISSION-DENIED
    ;; )
    
    ;; Verify Exporter      
    (let ((optExporterId (contract-call? .taral-exporter get-exporter-id exporter) ))
      (asserts! (not (is-none optExporterId)) ERR-EXPORTER-NOT-REGISTERED )

      ;; Verify Importer 
      (let ((optImporterId (contract-call? .taral-importer get-importer-id importer) ))
        (asserts! (not (is-none optImporterId)) ERR-IMPORTER-NOT-REGISTERED )
        
        ;; Validate paymentTerm uint

        ;; Validate amount uint        
                        ;; ((total-supply (unwrap! (contract-call? .taral-coin get-total-supply) ERR-GENERIC)))
                        ;; does importer holds TAL  -- if yes lower the protocol rate
                        
        ;; Validate invoiceTerms (string-utf8 10)                      
                        ;; (asserts! (> (len invoiceTerms) u0)  ERR-GENERIC)
        
        (let ((exporterId (unwrap-panic optExporterId)))
          (let ((importerId (unwrap-panic optImporterId)))
            (ok (let ((orderId (get-order-id)))
                  orderId 
                  (map-insert order {id: orderId} 
                                    {exporterId: exporterId,
                                     importerId: importerId,
                                     deliveryCountry: deliveryCountry,        
                                     dispatchMethod: dispatchMethod,
                                     shipmentType: shipmentType,
                                     paymentTerm: paymentTerm,     
                                     amount: amount,
                                     invoiceTerms: invoiceTerms
                                  })

                  (map-insert orderDetail {id: orderId} 
                                          {shippingRoute: shippingRoute, 
                                           item: items 
                                          })

                  ;; append the order in exporter and importer
                  (try! (contract-call? .taral-exporter append-order orderId exporter)) 
                  (try! (contract-call? .taral-importer append-order orderId importer)) 
                )
            )
 
          )
        )
      )          
    )
  )
)

(define-public (check-if-user-holds-tal-token (user principal))
  (let (
    ;; Get TAL balance of the user
    (balance (unwrap-panic (contract-call? .taral-coin get-balance user)))
  )
    ;; Check if the balance is greater than 0
    (if (> balance u0)
      (ok true)
      (ok false)
    )
  )
)
