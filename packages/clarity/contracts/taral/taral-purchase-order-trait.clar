
(define-trait purchase-order-trait
  (
    ;;Read-only functions
    (get-info () (response {version: (string-ascii 20) } uint))

    ;;Core functions
    (check-if-user-holds-tal-token (principal) (response bool uint))
    (initialize (principal principal (buff 256) (buff 256) (string-utf8 200) uint (string-utf8 10)) (response bool uint))
    (create-vault (uint uint uint uint) (response uint uint))
    (repay-loan (uint uint) (response uint uint))
    (liquidate (uint) (response uint uint))
  )
)


