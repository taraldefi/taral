(define-map lenders 
    {
        id: principal
    }
    {
        name: (string-utf8 128),
        description: (string-utf8 256),
        country: (string-utf8 56),
        successful-transactions: uint,
        failed-transactions: uint
    }
)

(define-public (register-lender (name (string-utf8 128)) (description (string-utf8 256)) (country (string-utf8 56)))
    (ok (map-set lenders { id: tx-sender } { name: name, description: description, country: country, successful-transactions: u0, failed-transactions: u0 }))
)

(define-private (update-lender-track-record (lender-id principal) (success bool))
    (let ((lender-data (unwrap! (map-get? lenders { id: lender-id }) (err "Lender not found"))))
        (if success
            (ok (map-set lenders
                { id: lender-id }
                { name: (get name lender-data), description: (get description lender-data), country: (get country lender-data), successful-transactions: (+ (get successful-transactions lender-data) u1), failed-transactions: (get failed-transactions lender-data) }
            ))
            (ok (map-set lenders
                { id: lender-id }
                { name: (get name lender-data), description: (get description lender-data), country: (get country lender-data), successful-transactions: (get successful-transactions lender-data), failed-transactions: (+ (get failed-transactions lender-data) u1) }
            ))
        )
    )
)

(define-read-only (get-lender (id principal))
    (map-get? lenders { id: id })
)