;; NFT contract for purchase order
;; metadata example : ipfs://bafybeidntmydwppanpzvvz4clnp5ngbsyd6vd2aheppbnsuogh442s3kyu/
(impl-trait .nft-trait.nft-trait)

(define-non-fungible-token purchase-order-nft uint)

;; constants
(define-constant mint-price u35)
;; TODO: Change contract owner based on logic
(define-constant contract-owner tx-sender)     


;; maps and variables
(define-data-var last-token-id uint u0)
(define-map token-uris uint (string-ascii 256))


;; SIP009 functions
(define-read-only (get-last-token-id) 
    (ok (var-get last-token-id))
)

(define-public (set-token-uri (token-id uint) (value (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR-OWNER-ONLY)
    (ok (map-set token-uris token-id value))))

(define-read-only (get-token-uri (token-id uint))
	(ok (map-get? token-uris token-id)))

(define-read-only (get-owner (id uint))
    (ok (nft-get-owner? purchase-order-nft id))
)

;; @Desc transfer function to transfer NFT 
;; @Params token-id: NFT id
;; @Params sender: principal of sender
;; @Params receiver: principal of receiver
;; @returns (response bool uint)
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (transfer (token-id uint) (sender principal) (receiver principal))
    (begin 
        (try! (nft-transfer? purchase-order-nft token-id sender receiver))
        (ok true)
    )
)

;; @Desc mint function to transfer NFT 
;; @Params receiver: principal of receiver to mint NFT
;; @returns (response uint uint)
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (mint (token-id uint) (receiver principal)) 
    (begin
        ;;(asserts! (is-eq tx-sender contract-owner) ERR-OWNER-ONLY)
        (try! (nft-mint? purchase-order-nft token-id receiver))
        (var-set last-token-id token-id)
        (ok true)
    )
)

;; @Desc burn function to burn a NFT 
;; @Params token-id: NFT id
;; @Params sender: principal of sender
;; @returns (response bool uint)

;; note: Clarity restricts burning of an asset only by it's owner.
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (burn (token-id uint) (sender principal)) 
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR-OWNER-ONLY)
        (try! (nft-burn? purchase-order-nft token-id sender))
        (ok true)
    )
)


;; ERROR start 100
(define-constant ERR-OWNER-ONLY (err u100))
(define-constant ERR-NOT-TOKEN-OWNER (err u101))