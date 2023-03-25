;; NFT contract for purchase order
;; metadata schema example : 
(impl-trait .nft-trait.nft-trait)

(define-non-fungible-token purchase-order-nft uint)

;; constants
(define-constant mint-price u35)
(define-constant ERR_UNAUTHORIZED (err u1000))

;; maps and variables
(define-data-var last-token-id uint u0)
(define-map token-uris uint (string-ascii 256))
(define-data-var contract-owner principal tx-sender)

;; SIP009 functions
(define-read-only (get-last-token-id) 
    (ok (var-get last-token-id))
)

(define-public (set-token-uri (token-id uint) (value (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR_UNAUTHORIZED)
    (ok (map-set token-uris token-id value))))

(define-read-only (get-token-uri (token-id uint))
	(ok (map-get? token-uris token-id)))

(define-read-only (get-owner (id uint))
    (ok (nft-get-owner? purchase-order-nft id))
)

(define-public (transfer (id uint) (sender principal) (receiver principal))
    (begin 
        (try! (nft-transfer? purchase-order-nft id sender receiver))
        (ok true)
    )
)

(define-public (mint) 
    (let 
        (
            (id (+ (var-get last-token-id) u1))
        )
        (try! (nft-mint? purchase-order-nft id tx-sender))
        (var-set last-token-id id)
        (ok id)
    )
)