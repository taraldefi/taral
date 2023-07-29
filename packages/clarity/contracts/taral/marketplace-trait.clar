(use-trait nft-trait .sip009-nft-trait.nft-trait)

(define-trait marketplace-trait
  (
    ;; Whitelist functions
    (set-whitelisted (principal bool) (response bool uint))
    (pause-contract () (response bool uint))
    (resume-contract () (response bool uint))
    (set-owner (principal) (response bool uint))

    ;; Listing operations
    (list-fixed-price (<nft-trait> { token-id: uint, price: uint }) (response uint uint))
    (purchase-fixed-price-listing (uint principal <nft-trait>) (response bool uint))
    (cancel-fixed-price-listing (uint <nft-trait>) (response bool uint))

    ;; Auction operations
    (start-auction (<nft-trait> { token-id: uint, start-block: uint, end-block: uint, start-bid: uint, reserve-price: uint }) (response uint uint))
    (place-bid (uint uint) (response bool uint))
    (end-auction (uint <nft-trait>) (response { auction-id: uint, reserve-price-met: bool } uint))
    (cancel-auction (uint <nft-trait>) (response bool uint))

    ;;Read-only functions
    (get-info () (response {version: (string-ascii 20) } uint))
  )
)