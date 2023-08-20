;; Updated version of taral importer contract
(impl-trait .importer-trait.importer-trait)
;; Constants and Errors
(define-constant ERR-GENERIC (err u100))
(define-constant ERR_INVALID_SIGNATURE (err u101))
(define-constant ERR-IMPORTER-NOT-REGISTERED (err u102))
(define-constant ERR_EMPTY_HASH (err u103))
(define-constant ERR_EMPTY_SIGNATURE (err u104))
(define-constant ERR-IMPORTER-ALREADY-REGISTERED (err u105))
(define-constant importer-storage-error (err u106))
(define-constant VERSION "0.2.6.beta")

(define-read-only (get-importer-hash (importer principal))
    (let 
    ((current-importer-profile (unwrap! (contract-call? .importer-storage get-importer-profile importer) importer-storage-error)))           
    (ok (get hash current-importer-profile))
    )
)


;; @Desc function to fetch or create an importer ID, makes use of match function to check if importer id exists
;; @Param importer : principal of importer
(define-private (get-or-create-importer-id (importer principal))
    ;; (let (
    ;;     (importer-info (contract-call? .importer-storage get-importer-by-principal importer))
    ;;     (importer-id (contract-call? .importer-storage get-importer-id-nonce))
    ;; ) 
    ;; (match importer-info
    ;; matched-importer-id (ok matched-importer-id)
    ;; (begin
    ;;     (unwrap! (contract-call? .importer-storage add-importer importer importer-id) importer-storage-error)
    ;;     (unwrap! (contract-call? .importer-storage increment-importer-id-nonce) importer-storage-error)
    ;;     (ok importer-id)))
    ;; )

    (match (contract-call? .importer-storage get-importer-by-principal importer) 
          matched-importer-id (ok matched-importer-id)  
          (let ((importer-id (contract-call? .importer-storage get-importer-id-nonce)))  
            (unwrap! (contract-call? .importer-storage add-importer importer importer-id) importer-storage-error)
            (unwrap! (contract-call? .importer-storage increment-importer-id-nonce) importer-storage-error)
            (ok importer-id)
            )
    )
)

;; @Desc Core function to implement importer registration
;; @Params importer : importer principal
;; @params importer-name : name of the importer
;; @params importer-category : category of importer
(define-public (register 
    (importer principal) 
    (importer-name (string-utf8 100)) 
    (hash (buff 256)) 
    (importer-category (string-utf8 100))
)
    (begin
        (asserts! (is-none (contract-call? .importer-storage get-importer-by-principal importer)) ERR-IMPORTER-ALREADY-REGISTERED)
        (asserts! (> (len importer-name) u0) ERR-GENERIC)
        (asserts! (> (len importer-category) u0) ERR-GENERIC) 
        ;; check that the hash is not empty
        (asserts! (> (len hash) u0) ERR_EMPTY_HASH)
            
        (let ((importer-id (unwrap! (get-or-create-importer-id importer) ERR-GENERIC)))
        (unwrap! (contract-call? .importer-storage add-importer-profile importer-id importer-name hash importer-category) importer-storage-error)
        (print {action: "register", importer: importer, importer-name: importer-name, importer-category: importer-category })
        (ok true)
        )
    ) 
)

(define-public (update-borrower-track-record (borrower-id principal) (success bool))
    (let (
        (importer-id (unwrap! (contract-call? .importer-storage get-importer-by-principal borrower-id ) ERR-IMPORTER-NOT-REGISTERED))
        (current-importer (unwrap! (contract-call? .importer-storage get-importer-profile borrower-id) importer-storage-error))
        (successful-transaction-count (get successful-transactions current-importer ))
        (failed-transaction-count (get failed-transactions current-importer ))
        )
        
        (if success
            (unwrap! (contract-call? .importer-storage update-importer-profile {importer-id: importer-id} (merge current-importer { successful-transactions: (+ u1 successful-transaction-count)})) importer-storage-error)

            (unwrap! (contract-call? .importer-storage update-importer-profile {importer-id: importer-id} (merge current-importer { failed-transactions: (+ u1 failed-transaction-count)})) importer-storage-error)
        )
        
        (ok true)
    )
)

;; @Desc appends order to importer and updates importer profile
;; @params new-order-id : ID of new order
;; @Params importer : Principal of importer
(define-public (append-order 
    (new-order-id uint) 
    (importer principal) 
)
    (let (
        (importer-id (unwrap! (contract-call? .importer-storage get-importer-by-principal importer ) ERR-IMPORTER-NOT-REGISTERED))
        (current-importer (unwrap! (contract-call? .importer-storage get-importer-profile importer) importer-storage-error))
        (new-id (contract-call? .importer-storage get-orders-next-avail-id current-importer))
        )
        (asserts! (not (is-none (contract-call? .importer-storage get-importer-by-principal importer))) ERR-IMPORTER-NOT-REGISTERED)
        (unwrap! (contract-call? .importer-storage update-importer-profile {importer-id: importer-id} (merge current-importer { orders-next-avail-id: (+ u1 new-id)})) importer-storage-error)
        (unwrap! (contract-call? .importer-storage add-order new-id importer-id new-order-id) importer-storage-error)
        (print {action: "append-order", importer: importer, new-order-id: new-order-id  })
        (ok true)
            
    )
    
)

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
