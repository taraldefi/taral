
;; sip010-ft-trait
;; standard traits for ft on stacks

(define-trait sip010-ft-trait
  (
    ;; Transfer an amount of tokens from the caller to a new principal
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))

    ;; read-only function returns the human readable name of the token
    (get-name () (response (string-ascii 32) uint))

    ;; read-only function returns the ticker symbol of the token (empty if none)
    (get-symbol () (response (string-ascii 32) uint))

    ;; number of decimals used (u6 means token can be divided as 0.000001)
    (get-decimals () (response uint uint))

    ;; returns the token balance of the provided principal
    (get-balance (principal) (response uint uint))

    ;; returns the current total supply (does not need to be a static amount)
    (get-total-supply () (response uint uint))

    ;; returns URI (link) to the metadata file of the token
    (get-token-uri () (response (optional (string-utf8 256)) uint))
    )
  )
  