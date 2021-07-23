(impl-trait .sip-10-ft-standard.sip-010-trait)

(define-fungible-token counter-token)

(define-constant authorized-minter .counter)

;; get the token balance of owner
(define-read-only (get-balance (owner principal))
  (begin
    (ok (ft-get-balance counter-token owner))))

;; returns the total number of tokens
(define-read-only (get-total-supply)
  (ok (ft-get-supply counter-token)))

;; returns the token name
(define-read-only (get-name)
  (ok "CounterCoin"))

;; the symbol or "ticker" for this token
(define-read-only (get-symbol)
  (ok "COUNTER"))

;; the number of decimals used
(define-read-only (get-decimals)
  (ok u8))

;; Transfers tokens to a recipient
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (if (is-eq tx-sender sender)
    (begin
      (try! (ft-transfer? counter-token amount sender recipient))
      (print memo)
      (ok true)
    )
    (err u4)))

(define-public (get-token-uri)
  (ok (some u"https://example.com")))

(define-public (mint (recipient principal) (amount uint))
  (ft-mint? counter-token amount recipient)
)