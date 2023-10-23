(define-trait oracle-trait
  (
    (get-btc-price () (response uint uint))
    (get-stx-price () (response uint uint))
    (set-btc-price (uint) (response bool uint))
    (set-stx-price (uint) (response bool uint))
  )
)

(define-data-var btc-price uint u50000)
(define-data-var stx-price uint u2)

;; Read-only functions

(define-read-only (get-btc-price)
  (ok (var-get btc-price))
)

(define-read-only (get-stx-price)
  (ok (var-get stx-price))
)

;; Public functions

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-btc-price (new-price uint))
  (begin
    (var-set btc-price new-price)
    (ok true)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-stx-price (new-price uint))
  (begin
    (var-set stx-price new-price)
    (ok true)
  )
)