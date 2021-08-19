(impl-trait .sip-10-ft-standard.sip-010-trait)

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

(define-public (mint (recipient principal) (amount uint))
  (ft-mint? taral-token amount recipient)
)


;; Initialize the contract
(begin
  ;; TODO: do not do this on testnet or mainnet
  (try! (ft-mint? taral-token u10 'ST75HW7YBJ2R7YJ6Z70PJMB9B1XWT001DD0BDJAZ))
  (try! (ft-mint? taral-token u1000000000000 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR)) ;; 1 million TAL
  (try! (ft-mint? taral-token u1000000000000 'ST31Q2S6CXS4WTQS92CR1GCGD0W9PRHSFZZH8XXRH)) ;; 1 million TAL
  (try! (ft-mint? taral-token u1000000000000 'ST2604KQ6A2TD9EP1FMAJ6BESC22H0E557KQHB7CV)) ;; 1 million TAL
  (try! (ft-mint? taral-token u1000000000000 'ST22ZZ99DRQQZ3HATGYRKCYKVZY78Z1ZAWBA7QE2P)) ;; 1 million TAL
)
