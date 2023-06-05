;; Updated version of taral importer contract

;;Constants and Errors
(define-constant ERR-GENERIC (err u100))
(define-constant ERR-IMPORTER-ALREADY-REGISTERED (err u101))
(define-constant ERR-IMPORTER-NOT-REGISTERED (err u102))
(define-constant importer-storage-error (err u103))

(define-constant VERSION "0.0.5.beta")

(define-private (is-valid-value (value (optional {order-id: uint})))
   (is-some value)
)

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

(define-read-only (get-importer-profile (importer principal))
    (let ((importer-id (contract-call? .importer-storage get-importer-id-nonce)))          
     (ok (unwrap! (contract-call? .importer-storage get-importer-profile-by-id importer-id) importer-storage-error))
    )
)

(define-read-only (get-importers (principals (list 10 principal))) 
    (map get-importer-profile principals)       
)

(define-read-only (get-importer-order (id uint) (importer principal))
    (let ((importer-id (contract-call? .importer-storage get-importer-id-nonce)))                              
        (contract-call? .importer-storage get-orders id importer-id)
    )       
)

(define-read-only (get-importer-orders (ids (list 10 uint)) (principals (list 10 principal)) )    
    (filter is-valid-value (map get-importer-order ids principals))      
)

(define-public (register (importer principal) (importer-name (string-utf8 100)) (importer-category (string-utf8 100)))
    (begin
        (asserts! (is-none (contract-call? .importer-storage get-importer-by-principal importer)) ERR-IMPORTER-ALREADY-REGISTERED)
        (asserts! (> (len importer-name) u0) ERR-GENERIC)
        (asserts! (> (len importer-category) u0) ERR-GENERIC) 
        (ok (let ((importer-id (unwrap! (get-or-create-importer-id importer) ERR-GENERIC)))
        importer-id 
        (unwrap! (contract-call? .importer-storage add-importer-profile importer-id importer-name importer-category ) importer-storage-error)
      ))
    )
)

(define-public (append-order (new-order-id uint) (importer principal))
    (let (
        (opt-importer-id (contract-call? .importer-storage get-importer-by-principal importer ))
        (importer-id (unwrap! opt-importer-id ERR-GENERIC))
        (current-importer (unwrap! (get-importer-profile importer) ERR-GENERIC))
        (new-id (contract-call? .importer-storage get-orders-next-avail-id current-importer))
        )
        (asserts! (not (is-none opt-importer-id)) ERR-IMPORTER-NOT-REGISTERED)
        (unwrap! (contract-call? .importer-storage add-order new-id importer-id new-order-id) importer-storage-error)
        (ok true)
    )
)
