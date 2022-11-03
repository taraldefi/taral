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
    (let ((optExporterId (contract-call? .exporter get-exporter-id exporter) ))
      (asserts! (not (is-none optExporterId)) ERR-EXPORTER-NOT-REGISTERED )

      ;; Verify Importer 
      (let ((optImporterId (contract-call? .importer get-importer-id importer) ))
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
                  (try! (contract-call? .exporter append-order orderId exporter)) 
                  (try! (contract-call? .importer append-order orderId importer)) 
                )
            )
 
          )
        )
      )          
    )
  )
)

;; enum State { NOT_INITIATED, AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE}
;;     State public currentState;

;;     bool public isTalentIn;
;;     bool public isFounderIn;

;;     uint public price;

;;     address payable public talent;
;;     address public founder;

;;     modifier onlyFounder(){
;;         require(msg.sender == founder, "Only founder can call this function");
;;         _;
;;     }    

;;     modifier escrowNotStarted(){
;;         require(currentState == State.NOT_INITIATED);
;;         _;
;;     }    

;;     constructor(address _founder, address payable _talent, uint _price) {
;;       founder = _founder;
;;       talent = _talent;
;;       price = _price * (1 ether);  
;;     }

;;     function initContract() escrowNotStarted public {
;;         if(msg.sender == founder){
;;             isFounderIn = true;
;;         }
;;         if(msg.sender == talent){
;;             isTalentIn = true;
;;         }
;;         if(isFounderIn && isTalentIn){
;;             currentState = State.AWAITING_PAYMENT;
;;         }
;;     }

;;     function deposit() onlyFounder public payable { 
;;         require(currentState == State.AWAITING_PAYMENT, "Already paid");
;;         require(msg.value == price, "Wrong deposit amount");
;;         currentState = State.AWAITING_DELIVERY;
;;     }

;;     function confirmCompletion() onlyFounder public payable{
;;         require(currentState == State.AWAITING_DELIVERY, "Cannot confirm delivery");
;;         talent.transfer(price);
;;         currentState = State.COMPLETE;
;;     }    

;;     function withdraw() onlyFounder public payable{
;;         require(currentState == State.AWAITING_DELIVERY, "Cannot withdraw at this stage");
;;         payable(msg.sender).transfer(price);
;;         currentState = State.COMPLETE;
;;     }