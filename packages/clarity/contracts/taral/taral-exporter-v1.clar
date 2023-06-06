;; Updated version of taral exporter contract
(impl-trait .exporter-trait.exporter-trait)
;; Constants and Errors
(define-constant ERR-GENERIC (err u100))
(define-constant ERR-EXPORTER-ALREADY-REGISTERED (err u101))
(define-constant ERR-EXPORTER-NOT-REGISTERED (err u102))
(define-constant exporter-storage-error (err u103))

(define-constant VERSION "0.0.5.beta")


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
(define-public (register (exporter principal) (exporter-name (string-utf8 100)) (exporter-category (string-utf8 100)))
    (begin 
        (asserts! (is-none (contract-call? .exporter-storage get-exporter-by-principal exporter)) ERR-EXPORTER-ALREADY-REGISTERED)
        (asserts! (> (len exporter-name) u0) ERR-GENERIC)
        (asserts! (> (len exporter-category) u0) ERR-GENERIC) 
            (let ((exporter-id (unwrap! (get-or-create-exporter-id exporter) ERR-GENERIC)))
            (unwrap! (contract-call? .exporter-storage add-exporter-profile exporter-id exporter-name exporter-category) exporter-storage-error)
            (ok true)
        )
    ) 
)

;; @Desc appends order to exporter and updates exporter profile
;; @params new-order-id : ID of new order
;; @Params exporter : Principal of exporter
(define-public (append-order (new-order-id uint) (exporter principal))
    (begin
        (asserts! (not (is-none (contract-call? .exporter-storage get-exporter-by-principal exporter))) ERR-EXPORTER-NOT-REGISTERED)
            (let (
                (exporter-id (unwrap! (contract-call? .exporter-storage get-exporter-by-principal exporter ) ERR-GENERIC))
                (current-exporter (unwrap! (contract-call? .exporter-storage get-exporter-profile exporter) exporter-storage-error))
                (new-id (contract-call? .exporter-storage get-orders-next-avail-id current-exporter))
                )
            (unwrap! (contract-call? .exporter-storage update-exporter-profile {exporter-id: exporter-id} (merge current-exporter { orders-next-avail-id: (+ u1 new-id)})) exporter-storage-error)
            (unwrap! (contract-call? .exporter-storage add-order new-id exporter-id new-order-id) exporter-storage-error)
            (ok true)
            )
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
