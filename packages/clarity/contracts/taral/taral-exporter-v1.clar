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

;; A buffer containing the ascii string "Stacks Signed Message: "
(define-constant message-prefix 0x537461636b73205369676e6564204d6573736167653a20)
(define-constant VERSION "0.2.5.beta")

(define-read-only (hash-message (message (buff 256)))
	(sha256 (concat message-prefix message))
)

(define-read-only (validate-signature (hash (buff 32)) (signature (buff 65)) (signer principal))
    (is-eq (principal-of? (unwrap! (secp256k1-recover? hash signature) false) ) (ok signer))    
)

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
    (hash (buff 256)) 
)
    (let (
        (exporter-id (unwrap! (contract-call? .exporter-storage get-exporter-by-principal exporter ) ERR-EXPORTER-NOT-REGISTERED))
        (current-exporter (unwrap! (contract-call? .exporter-storage get-exporter-profile exporter) exporter-storage-error))
        (new-id (contract-call? .exporter-storage get-orders-next-avail-id current-exporter))
        )
        (asserts! (not (is-none (contract-call? .exporter-storage get-exporter-by-principal exporter))) ERR-EXPORTER-NOT-REGISTERED)
        ;; check that the hash is not empty
        (asserts! (> (len hash) u0) ERR_EMPTY_HASH)
        (unwrap! (contract-call? .exporter-storage update-exporter-profile {exporter-id: exporter-id} (merge current-exporter { hash: hash, orders-next-avail-id: (+ u1 new-id), created: block-height})) exporter-storage-error)
        (unwrap! (contract-call? .exporter-storage add-order new-id exporter-id hash new-order-id) exporter-storage-error)
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
