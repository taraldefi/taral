;; bitcoin reward address of the pool
(define-constant pool-reward-addr-hash 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce)
(define-constant pool-pubscriptkey (concat (concat 0x76a914 pool-reward-addr-hash) 0x88ac))

;; store reward txs and their value per block (from up to 100 miners per block)
(define-map reward-txs
  uint (list 100 {txid: (buff 1024), value: uint}))

(define-map rewards-per-cycle uint uint)

(define-data-var last-price (tuple (amount uint) (height uint) (timestamp uint))
  (unwrap! (contract-call? .insurance-pool-oracle get-price "artifix-binance" "STX-BTC") ERR_FAILED_TO_GET_PRICE))

;; Backport of .pox's burn-height-to-reward-cycle
(define-read-only (burn-height-to-reward-cycle (height uint))
    (let (
        (pox-info (unwrap-panic (contract-call? 'ST000000000000000000002AMW42H.pox get-pox-info)))
    )
    (/ (- height (get first-burnchain-block-height pox-info)) (get reward-cycle-length pox-info))))

(define-private (add-value (out {scriptPubKey: (buff 128), value: uint}) (result uint))
  (+ (get value out) result)
)

(define-private (find-pool-outs (entry {scriptPubKey: (buff 128), value: (buff 8)}) (result (list 8 {scriptPubKey: (buff 128), value: uint})))
  (if (is-eq (get scriptPubKey entry) pool-pubscriptkey)
    (unwrap-panic (as-max-len? (append result {scriptPubKey: (get scriptPubKey entry), value: (get uint32 (unwrap-panic (contract-call? .clarity-bitcoin read-uint32 {txbuff: (get value entry), index: u0})))}) u8))
    result))

(define-read-only (get-outs-for-pool (tx {
    version: (buff 4),
    ins: (list 8
      {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
    outs: (list 8
      {value: (buff 8), scriptPubKey: (buff 128)}),
    locktime: (buff 4)}))
    (ok (fold find-pool-outs (get outs tx) (list))))

(define-read-only (get-tx-value-for-pool (tx {
    version: (buff 4),
    ins: (list 8
      {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
    outs: (list 8
      {value: (buff 8), scriptPubKey: (buff 128)}),
    locktime: (buff 4)}))
    (ok (fold add-value (fold find-pool-outs (get outs tx) (list)) u0)))

(define-private (map-add-tx (height uint) (tx (buff 1024)) (pool-out-value uint) (price uint))
  (let ((entry {txid: (contract-call? .clarity-bitcoin get-txid tx), value: pool-out-value})
    (cycle (burn-height-to-reward-cycle height)))
    (map-set rewards-per-cycle cycle (+ (/ pool-out-value price) (default-to u0 (map-get? rewards-per-cycle cycle))))
    (match (map-get? reward-txs height)
      txs (ok (map-set reward-txs height (unwrap! (as-max-len? (append txs entry) u100) ERR_TOO_MANY_TXS)))
      (ok (map-insert reward-txs height (list entry))))))

(define-private (update (price (tuple (amount uint) (height uint) (timestamp uint))) (height uint))
  (if (> (get height (var-get last-price)) height)
    (var-set last-price price)
    false))

(define-private (oracle-by-hash (height uint))
  (match (get-block-info? id-header-hash height)
    hash (match (at-block hash (contract-call? .insurance-pool-oracle get-price "artifix-binance" "STX-BTC"))
          price (begin
                  (update price height)
                  (some (get amount price)))
          none)
    none))

(define-private (oracle-get-price-stx-btc (height uint))
  (match (oracle-by-hash height)
    price price
    (match (oracle-by-hash (- height u1))
      price-1 price-1
      (match (oracle-by-hash (- height u2))
        price-2 price-2
        (get amount (print (var-get last-price)))))))

(define-public (wrapped-oracle-get-price-stx-btc (height uint))
  (ok (oracle-get-price-stx-btc height)))

;; any user can submit a tx that contains payments into the pool's address
;; the value of the tx is added to the block
(define-public (submit-reward-tx
    (block { version: (buff 4), parent: (buff 32), merkle-root: (buff 32), timestamp: (buff 4), nbits: (buff 4), nonce: (buff 4), height: uint })
    (tx {version: (buff 4),
      ins: (list 8
        {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
      outs: (list 8
        {value: (buff 8), scriptPubKey: (buff 128)}),
      locktime: (buff 4)})
    (proof { tx-index: uint, hashes: (list 12 (buff 32)), tree-depth: uint })
    )
  (let ((tx-buff (contract-call? .clarity-bitcoin concat-tx tx)))
    (match (contract-call? .clarity-bitcoin was-tx-mined block tx-buff proof)
      result
        (begin
          (asserts! result ERR_VERIFICATION_FAILED)
          (let ((out-value (unwrap! (get-tx-value-for-pool tx) ERR_FAILED_TO_PARSE_TX)))
            (if (> out-value u0)
              (let ((price (oracle-get-price-stx-btc (get height block))))
                ;; add tx value to corresponding cycle
                (match (map-add-tx (get height block) tx-buff out-value price)
                  result-map-add (begin
                    (asserts! result-map-add ERR_TX_ADD_FAILED)
                    (ok {out-value: out-value, price: price}))
                  error-map-add (err (* error-map-add u2000))))
              ERR_TX_NOT_FOR_POOL)))
      error (err (* error u1000)))))

;; any user can submit a tx that contains payments into the pool's address
;; the value of the tx is added to the block
(define-public (report-btc-tx
    (block { version: (buff 4), parent: (buff 32), merkle-root: (buff 32), timestamp: (buff 4), nbits: (buff 4), nonce: (buff 4), height: uint })
    (tx {version: (buff 4),
      ins: (list 8
        {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
      outs: (list 8
        {value: (buff 8), scriptPubKey: (buff 128)}),
      locktime: (buff 4)})
    (proof { tx-index: uint, hashes: (list 12 (buff 32)), tree-depth: uint }))
  (let ((tx-buff (contract-call? .clarity-bitcoin concat-tx tx)))
    (contract-call? .clarity-bitcoin was-tx-mined block tx-buff proof)))

(define-read-only (get-rewards (cycle uint))
  (default-to u0 (map-get? rewards-per-cycle cycle)))

(define-read-only (get-pool-pubscriptkey)
  pool-pubscriptkey)

;; Error handling
(define-constant ERR_FAILED_TO_PARSE_TX (err u1))
(define-constant ERR_VERIFICATION_FAILED (err u2))
(define-constant ERR_INSERT_FAILED (err u3))
(define-constant ERR_TX_NOT_FOR_POOL (err u4))
(define-constant ERR_TOO_MANY_TXS (err u5))
(define-constant ERR_TX_ADD_FAILED (err u6))
(define-constant ERR_FAILED_TO_GET_PRICE (err u7))
