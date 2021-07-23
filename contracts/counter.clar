(define-data-var counter int 0)

(define-constant decimals u8)

(define-read-only (get-counter)
  (var-get counter))

(define-public (increment)
  (let
    (
      (current-val (var-get counter))
      (next-val (+ current-val 1))
      (sender tx-sender)
    )
    (var-set counter next-val)
    (try! (mint))
    (ok next-val)
  )
)

(define-public (decrement)
  (let
    (
      (current-val (var-get counter))
      (next-val (- current-val 1))
    )
    (var-set counter next-val)
    (try! (mint))
    (ok next-val)
  )
)

(define-private (mint)
  (let
    (
      (sender tx-sender)
    )
    (try! (as-contract (contract-call? .counter-coin mint sender (mint-amount))))
    (ok true)
  )
)

(define-private (mint-amount)
  (pow u10 decimals)
)