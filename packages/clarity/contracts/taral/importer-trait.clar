
(define-trait importer-trait
  (
    ;;Read-only functions
    (get-info () (response {version: (string-ascii 20) } uint))

    ;;Core functions
    (register (principal (buff 256) (string-utf8 100) (string-utf8 100)) (response bool uint))
    (append-order (uint principal (buff 256)) (response bool uint))
  )
)


