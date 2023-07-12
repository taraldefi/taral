;; Purchase Order Contract 0.0.5-beta
(impl-trait .taral-purchase-order-trait.purchase-order-trait)
;; constants
(define-constant ERR-GENERIC (err u100))
(define-constant ERR_EMPTY_HASH (err u103))
(define-constant ERR-PERMISSION-DENIED (err u101))
(define-constant ERR_CONTRACT_CALL (err u106))
(define-constant ERR_PURCHASE_ORDER_STORAGE (err u107))
(define-constant ERR-EXPORTER-NOT-REGISTERED (err u120))
(define-constant ERR-IMPORTER-NOT-REGISTERED (err u121))
(define-constant VERSION "0.0.5.beta")

;; Read-only functions
(define-read-only (get-info)
    (ok {
        version: (get-version)
    })
)

;; Returns version of the safe contract
;; @returns string-ascii
(define-read-only (get-version) 
    VERSION
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

;; public functions

;; @Desc public function initialize a purchase order
;; @Param exporter: principal value of exporter
;; @Param importer: principal value of importer
;; @Param order-hash: Hashed data of order
;; @Param order-detail-hash: Hashed data of order details
;; @Param payment-term: 30/60/90/120 Days, 50% Deposit, balance upon bill of lading of type string UTF8
;; @Param amount: amount in uint
;; @param delivery-term: Terms of delivery of type string UTF8 eg: FOB CIF, CFR

(define-public (initialize 
    (exporter principal)
    (importer principal)
    (order-hash (buff 256))
    (order-detail-hash (buff 256))
    (payment-term (string-utf8 200))                                
    (amount uint)
    (delivery-term (string-utf8 10)))
    (let (
        ;; Gets the IDs from respoective contracts
        (exporter-id (unwrap! (contract-call? .exporter-storage get-exporter-by-principal exporter) ERR_CONTRACT_CALL))
        (importer-id (unwrap! (contract-call? .importer-storage get-importer-by-principal importer) ERR_CONTRACT_CALL))
        ;; Fetches the current orderId -> initially u10001
        (order-id (contract-call? .purchase-order-storage get-order-id-nonce)))
        ;; assertion checklist
        ;; Exporter and Importer registration checks are already done in base contract levels

        ;; Validate Hashes and other inputs
        (asserts! (and (> (len order-hash) u0) (> (len order-detail-hash) u0)) ERR_EMPTY_HASH)
        (asserts! (> (len payment-term) u0) ERR-GENERIC)
        (asserts! (> (len delivery-term) u0) ERR-GENERIC)
        (asserts! (> amount u0) ERR-GENERIC)

        ;; Adds the order with the current order id nonce
        (unwrap! (contract-call? .purchase-order-storage add-order exporter-id importer-id order-hash payment-term amount delivery-term) ERR_PURCHASE_ORDER_STORAGE)
        (unwrap! (contract-call? .purchase-order-storage add-order-details order-detail-hash) ERR_PURCHASE_ORDER_STORAGE)
        
        ;; Appends the order to importer and exporter data
        (unwrap! (contract-call? .taral-exporter-v1 append-order order-id exporter) ERR_CONTRACT_CALL)
        (unwrap! (contract-call? .taral-importer-v1 append-order order-id importer) ERR_CONTRACT_CALL) 
        ;; Logs the action
        (print {action: "initialize purchase order", exporter: exporter, order-id: order-id })
        ;; Increments the order id nonce value by 1
        (unwrap! (contract-call? .purchase-order-storage increment-order-id-nonce) ERR_PURCHASE_ORDER_STORAGE)
        (ok true)
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