;; bitcoin reward address of the pool
(define-constant pool-reward-addr-hash 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce)
(define-constant pool-pubscriptkey (concat (concat 0x76a914 pool-reward-addr-hash) 0x88ac))

(define-private (find-pool-out-compact (entry {scriptPubKey: (buff 128), value: uint}) (result (optional {scriptPubKey: (buff 128), value: uint})))
   (if (is-eq (get scriptPubKey entry) pool-pubscriptkey)
    (some entry)
    none))

(define-read-only (get-tx-value-for-pool-compact (tx (buff 1024)))
  (let ((transaction (unwrap! (contract-call? .clarity-bitcoin parse-tx tx) ERR_FAILED_TO_PARSE_TX)))
    (ok (fold find-pool-out-compact (get outs transaction) none))))

(define-constant ERR_FAILED_TO_PARSE_TX (err u1))
