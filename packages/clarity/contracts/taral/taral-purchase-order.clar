;; Purchase Order Contract 0.1.5-beta
(impl-trait .taral-purchase-order-trait.purchase-order-trait)
(use-trait nft-trait .nft-trait.nft-trait)
;; constants
(define-constant DEBT_RATIO (/ u11 u10))
(define-constant MIN_COLLATERAL_AMOUNT u1000)
(define-constant MIN_BTC_COLLATERAL_AMOUNT u100000)
(define-constant MIN_LOAN_AMOUNT u100)

(define-constant VERSION "0.1.5.beta")

;; Error codes
(define-constant ERR-GENERIC (err u100))
(define-constant ERR_EMPTY_HASH (err u103))
(define-constant ERR_CONTRACT_CALL (err u106))
(define-constant ERR_PURCHASE_ORDER_STORAGE (err u107))
(define-constant ERR_INVALID_VAULT (err u203))
(define-constant ERR_INSUFFICIENT_REPAYMENT (err u203))
(define-constant ERR_VAULT_NOT_FOUND (err u203))
(define-constant ERR_VAULT_NOT_UNDERCOLLATERALIZED (err u406))
(define-constant ERR_INSUFFICIENT_COLLATERAL ( err u1001))
(define-constant ERR_INVALID_LOAN_AMOUNT (err u404))
(define-constant ERR_INVALID_LOAN_DURATION (err u405))

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

;; private functions

(define-private (get-collateral-value (collateral-stx uint) (collateral-btc uint))
    (let (
    (btc-price (unwrap! (contract-call? .dummy-oracle get-btc-price) u0))
    (stx-price (unwrap! (contract-call? .dummy-oracle get-stx-price) u0))
    )
        (+ (* collateral-stx stx-price) (* collateral-btc btc-price))
    )
)

(define-private (get-repayment-due (vault {borrower: principal, collateral-stx: uint, collateral-btc: uint, debt: uint, nft-id: uint, last-repayment-date: uint}))
    (let (
    (remaining-debt (get debt vault))
    (days-since-last-payment (- block-height (get last-repayment-date vault)))
    )
    (if (>= days-since-last-payment u80)
      remaining-debt
      (if (>= days-since-last-payment u30)
        (/ (* remaining-debt u2) u3)
        (if (>= days-since-last-payment u20)      
          (/ remaining-debt u2)
          u0
        )
      )
    )
  )
)

;; public functions

;; @Desc public function to check if a user holds TAL token
;; @Param user: principal value of a user
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

;; @Desc public function to initialize a purchase order
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
        (unwrap! (contract-call? .taral-exporter append-order order-id exporter) ERR_CONTRACT_CALL)
        (unwrap! (contract-call? .taral-importer append-order order-id importer) ERR_CONTRACT_CALL) 
        ;; Logs the action
        (print {action: "initialize purchase order", exporter: exporter, order-id: order-id })
        ;; Increments the order id nonce value by 1
        (unwrap! (contract-call? .purchase-order-storage increment-order-id-nonce) ERR_PURCHASE_ORDER_STORAGE)
        (ok true)
    )
)

(define-public (create-vault (collateral-stx uint) (collateral-btc uint) (loan-amount uint) (duration uint))
  (let (
    (MIN_COLLATERAL_VALUE (/ (* loan-amount u11) u10)) ;; require 110% collateral
    (vault-id (contract-call? .purchase-order-storage get-next-vault-id))
    (collateral-value (get-collateral-value collateral-stx collateral-btc))
    (required-collateral-value (* loan-amount MIN_COLLATERAL_VALUE))
  )
    (asserts! (>= collateral-value required-collateral-value) ERR_INSUFFICIENT_COLLATERAL)
    (try! (contract-call? .taral-purchase-order-nft mint vault-id tx-sender))

    ;; (asserts! (>= collateral-stx MIN_COLLATERAL_AMOUNT) (err ERR_INVALID_COLLATERAL_AMOUNT))
    ;; (asserts! (>= collateral-btc MIN_BTC_COLLATERAL_AMOUNT) (err ERR_INVALID_COLLATERAL_AMOUNT))
    (asserts! (>= loan-amount MIN_LOAN_AMOUNT) ERR_INVALID_LOAN_AMOUNT)
    (asserts! (<= duration u80) ERR_INVALID_LOAN_DURATION)
    (asserts! (>= (get-collateral-value collateral-stx collateral-btc) required-collateral-value) ERR_INSUFFICIENT_COLLATERAL)
    (unwrap! (contract-call? .purchase-order-storage update-vault 
        {vault-id: vault-id}
        {
            borrower: tx-sender,
            collateral-stx: collateral-stx,
            collateral-btc: collateral-btc,
            debt: loan-amount,
            nft-id: vault-id,
            last-repayment-date: block-height
        }) ERR_PURCHASE_ORDER_STORAGE)
    (ok vault-id)
  )
)

(define-public (repay-loan (vault-id uint) (repayment-amount uint))
    (let (
        (vault (unwrap! (contract-call? .purchase-order-storage get-vault-by-id vault-id) ERR_VAULT_NOT_FOUND))
        (updated-debt (- (get debt vault) repayment-amount))
        (repayment-due (get-repayment-due vault))
    )
        (asserts! (> vault-id u0) ERR_INVALID_VAULT)
        (asserts! (>= repayment-amount repayment-due) ERR_INSUFFICIENT_REPAYMENT)
        (if (>= updated-debt u0)
        (begin
            (try! (contract-call? .taral-purchase-order-nft transfer (get nft-id vault) (get borrower vault) tx-sender))
            (unwrap! (contract-call? .purchase-order-storage delete-vault vault-id) ERR_PURCHASE_ORDER_STORAGE)
            (ok u0)
        )
        (begin
            (unwrap! (contract-call? .purchase-order-storage update-vault {vault-id: vault-id} (merge vault {debt: updated-debt, last-repayment-date: block-height})) ERR_PURCHASE_ORDER_STORAGE)
            (ok updated-debt)
        ))
    )
)

(define-public (liquidate (vault-id uint))
  (let (
    (vault (unwrap! (contract-call? .purchase-order-storage get-vault-by-id vault-id) ERR_VAULT_NOT_FOUND))
    (collateral-value (get-collateral-value (get collateral-stx vault) (get collateral-btc vault)))
    (debt-value (* (get debt vault) DEBT_RATIO))
  )
    (asserts! (> vault-id u0) ERR_INVALID_VAULT)
    (asserts! (< collateral-value debt-value) ERR_VAULT_NOT_UNDERCOLLATERALIZED)

    (print {collateral-value: collateral-value, debt-value: debt-value})
    
    (try! (contract-call? .taral-purchase-order-nft transfer (get nft-id vault) (get borrower vault) tx-sender))
    ;; (unwrap! (contract-call? .wstx transfer (get collateral-stx vault) (get borrower vault) tx-sender) (err ERR_TRANSFER_FAILED))
    ;; (unwrap! (contract-call? .wbtc transfer (get collateral-btc vault) (get borrower vault) tx-sender) (err ERR_TRANSFER_FAILED))
    (unwrap! (contract-call? .purchase-order-storage delete-vault vault-id) ERR_PURCHASE_ORDER_STORAGE)
    (ok u0)
  )
)