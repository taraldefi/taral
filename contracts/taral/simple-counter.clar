(define-data-var counter int 0)

(define-read-only (get-counter)
  (var-get counter))

(define-public (increment)
  (let
    (
      (current-val (var-get counter))
      (next-val (+ current-val 1))
    )
    (var-set counter next-val)
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
    (ok next-val)
  )
)