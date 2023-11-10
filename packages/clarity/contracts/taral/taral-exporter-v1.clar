;; Updated version of taral exporter contract
(impl-trait .exporter-trait.exporter-trait)
;; Constants and Errors
(define-constant ERR-GENERIC (err u100))
(define-constant ERR_INVALID_SIGNATURE (err u101))
(define-constant ERR-EXPORTER-NOT-REGISTERED (err u102))
(define-constant ERR_EMPTY_HASH (err u103))
(define-constant ERR_EMPTY_SIGNATURE (err u104))
(define-constant ERR-EXPORTER-ALREADY-REGISTERED (err u105))
(define-constant exporter-storage-error (err u106))
(define-constant VERSION "0.2.6.beta")

(define-read-only (get-exporter-hash (exporter principal))
    (let 
    ((current-exporter-profile (unwrap! (contract-call? .exporter-storage get-exporter-profile exporter) exporter-storage-error)))           
    (ok (get hash current-exporter-profile))
    )
)

(define-public (update-exporter-track-record (exporter-principal principal) (success bool))
    (let (
        (exporter-id (unwrap! (contract-call? .exporter-storage get-exporter-by-principal exporter-principal ) ERR-EXPORTER-NOT-REGISTERED))
        (current-exporter (unwrap! (contract-call? .exporter-storage get-exporter-profile exporter-principal) exporter-storage-error))
        (successful-transaction-count (get successful-transactions current-exporter ))
        (failed-transaction-count (get failed-transactions current-exporter ))
        )
        
        (if success
            (unwrap! (contract-call? .exporter-storage update-exporter-profile {exporter-id: exporter-id} (merge current-exporter { successful-transactions: (+ u1 successful-transaction-count)})) exporter-storage-error)

            (unwrap! (contract-call? .exporter-storage update-exporter-profile {exporter-id: exporter-id} (merge current-exporter { failed-transactions: (+ u1 failed-transaction-count)})) exporter-storage-error)
        )
        
        (ok true)
    )
)

;; (define-private (update-seller-track-record (seller-id principal) (success bool))
;;     (let ((seller-data (unwrap! (map-get? sellers { id: seller-id }) (err "Seller not found"))))
;;         (if success
;;             (map-set sellers
;;                 { id: seller-id }
;;                 { name: (get name seller-data), description: (get description seller-data), country: (get country seller-data), successful-transactions: (+ (get successful-transactions seller-data) u1), failed-transactions: (get failed-transactions seller-data) }
;;             )
;;             (map-set sellers
;;                 { id: seller-id }
;;                 { name: (get name seller-data), description: (get description seller-data), country: (get country seller-data), successful-transactions: (get successful-transactions seller-data), failed-transactions: (+ (get failed-transactions seller-data) u1) }
;;             )
;;         )
;;     )
;; )

;; @Desc function to fetch or create an exporter ID, makes use of match function to check if exporter id exists
;; @Param exporter : principal of exporter
(define-private (get-or-create-exporter-id (exporter principal))
    ;; (let (
    ;;     (exporter-info (contract-call? .exporter-storage get-exporter-by-principal exporter))
    ;;     (exporter-id (contract-call? .exporter-storage get-exporter-id-nonce))
    ;; ) 
    ;; (match exporter-info
    ;; matched-exporter-id (ok matched-exporter-id)
    ;; (begin
    ;;     (unwrap! (contract-call? .exporter-storage add-exporter exporter exporter-id) exporter-storage-error)
    ;;     (unwrap! (contract-call? .exporter-storage increment-exporter-id-nonce) exporter-storage-error)
    ;;     (ok exporter-id)))
    ;; )

    (match (contract-call? .exporter-storage get-exporter-by-principal exporter) 
          matched-exporter-id (ok matched-exporter-id)  
          (let ((exporter-id (contract-call? .exporter-storage get-exporter-id-nonce)))  
            (unwrap! (contract-call? .exporter-storage add-exporter exporter exporter-id) exporter-storage-error)
            (unwrap! (contract-call? .exporter-storage increment-exporter-id-nonce) exporter-storage-error)
            (ok exporter-id)
            )
    )
)

;; @Desc Core function to implement exporter registration
;; @Params exporter : exporter principal
;; @params exporter-name : name of the exporter
;; @params exporter-category : category of exporter
(define-public (register 
    (exporter principal) 
    (exporter-name (string-utf8 100)) 
    (hash (buff 256)) 
    (exporter-category (string-utf8 100))
)
    (begin
        (asserts! (is-none (contract-call? .exporter-storage get-exporter-by-principal exporter)) ERR-EXPORTER-ALREADY-REGISTERED)
        (asserts! (> (len exporter-name) u0) ERR-GENERIC)
        (asserts! (> (len exporter-category) u0) ERR-GENERIC) 
        ;; check that the hash is not empty
        (asserts! (> (len hash) u0) ERR_EMPTY_HASH)
            
        (let ((exporter-id (unwrap! (get-or-create-exporter-id exporter) ERR-GENERIC)))
        (unwrap! (contract-call? .exporter-storage add-exporter-profile exporter-id exporter-name hash exporter-category) exporter-storage-error)
        (print {action: "register", exporter: exporter, exporter-name: exporter-name, exporter-category: exporter-category })
        (ok true)
        )
    ) 
)

;; @Desc appends order to exporter and updates exporter profile
;; @params new-order-id : ID of new order
;; @Params exporter : Principal of exporter
(define-public (append-order 
    (new-order-id uint) 
    (exporter principal) 
)
    (let (
        (exporter-id (unwrap! (contract-call? .exporter-storage get-exporter-by-principal exporter ) ERR-EXPORTER-NOT-REGISTERED))
        (current-exporter (unwrap! (contract-call? .exporter-storage get-exporter-profile exporter) exporter-storage-error))
        (new-id (contract-call? .exporter-storage get-orders-next-avail-id current-exporter))
        )
        (asserts! (not (is-none (contract-call? .exporter-storage get-exporter-by-principal exporter))) ERR-EXPORTER-NOT-REGISTERED)
        (unwrap! (contract-call? .exporter-storage update-exporter-profile {exporter-id: exporter-id} (merge current-exporter { orders-next-avail-id: (+ u1 new-id)})) exporter-storage-error)
        (unwrap! (contract-call? .exporter-storage add-order new-id exporter-id new-order-id) exporter-storage-error)
        (print {action: "append-order", exporter: exporter, new-order-id: new-order-id  })
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
