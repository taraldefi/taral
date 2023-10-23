(impl-trait .ft-trait.ft-trait)

;; define the fungible token TAL with a max supply of one billion
(define-fungible-token taral-token u1000000000000000)

;; get the token balance of owner
(define-read-only (get-balance (owner principal))
  (begin
    (ok (ft-get-balance taral-token owner))))

;; returns the total number of tokens
(define-read-only (get-total-supply)
  (ok (ft-get-supply taral-token)))

  ;; returns the token name
(define-read-only (get-name)
  (ok "TARAL"))

;; the symbol or "ticker" for this token
(define-read-only (get-symbol)
  (ok "TAL"))

;; the number of decimals used
(define-read-only (get-decimals)
  (ok u6))

;; Transfers tokens to a recipient
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (if (is-eq tx-sender sender)
    (begin
      (try! (ft-transfer? taral-token amount sender recipient))
      (print memo)
      (ok true)
    )
    (err u4)))

(define-public (get-token-uri)
  (ok (some u"https://taraldefi.github.io")))

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (mint (recipient principal) (amount uint))
  (ft-mint? taral-token amount recipient)
)


;; Initialize the contract
(begin
  ;; TODO: do not do this on testnet or mainnet
  (try! (ft-mint? taral-token u10 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5))
  (try! (ft-mint? taral-token u1000000000000 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG)) ;; 1 million TAL
  (try! (ft-mint? taral-token u1000000000000 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC)) ;; 1 million TAL
  (try! (ft-mint? taral-token u1000000000000 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND)) ;; 1 million TAL
  (try! (ft-mint? taral-token u1000000000000 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB)) ;; 1 million TAL
)
