
(define-trait exporter-trait
  (
    ;;Read-only functions
    (get-info () (response {version: (string-ascii 20) } uint))

    ;;Core functions
    (register (principal (string-utf8 100) (buff 256) (string-utf8 100)) (response uint uint))
    (append-order (uint principal) (response uint uint))
  )
)


