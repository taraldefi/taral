
(define-trait storage-service-trait
  (
    ;; Read-only functions
    (get-info () (response {version: (string-ascii 20) } uint))


    ;; Core functions
    (register-file (
        (string-utf8 36)
        (string-ascii 128)
        (buff 256)
        (buff 65)) 
        (response (string-utf8 36) uint))

    (grant-access (
        principal
        (string-utf8 36)
        bool
        bool) 
        (response bool uint))

    (update-access (
        principal
        (string-utf8 36)
        bool
        bool) 
        (response bool uint))

    (revoke-access (
        (string-utf8 36)
        principal) 
        (response bool uint))

    (update-file (
        (string-utf8 36)
        (buff 256)
        (buff 65)) 
        (response bool uint))
  )
)


