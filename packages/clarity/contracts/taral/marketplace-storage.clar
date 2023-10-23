(define-data-var fixed-price-nonce uint u0)

(define-data-var auction-nonce uint u0)

;; Data Maps and Variables
(define-map auctions
  uint
  {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }
)

(define-map bids
  { auction-id: uint, bidder: principal }
  uint
)

(define-map completed-auctions
  uint
  {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }
)

(define-map cancelled-auctions
  uint
  {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }
)

(define-map withdrawn-bids
  { auction-id: uint, bidder: principal }
  uint
)

(define-map fixed-price-listings
  uint
  {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    price: uint
  }
)

(define-map completed-fixed-price-listings
  uint
  {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    price: uint
  }
)

(define-map cancelled-fixed-price-listings
  uint
  {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    price: uint
  }
)


(define-map whitelisted-asset-contracts principal bool)


(define-data-var contract-owner principal tx-sender)

;; Read-Only Functions
(define-read-only (get-completed-auction (auction-id uint))
  (map-get? completed-auctions auction-id)
)

(define-read-only (get-auction (auction-id uint))
  (map-get? auctions auction-id)
)

(define-read-only (get-withdrawn-bid (auction-id uint) (bidder principal))
  (map-get? withdrawn-bids { auction-id: auction-id, bidder: bidder })
)

(define-read-only (is-whitelisted (asset-contract principal))
  (default-to false (map-get? whitelisted-asset-contracts asset-contract))
)

(define-read-only (get-fixed-price-listing-nonce)
  (var-get fixed-price-nonce)
)

(define-read-only (get-fixed-price-listing (listing-id uint))
  (map-get? fixed-price-listings listing-id)
)

(define-read-only (get-auction-nonce)
  (var-get auction-nonce)
)

(define-read-only (get-previous-bid (auction-id uint) (bidder principal))
  (default-to u0 (map-get? bids { auction-id: auction-id, bidder: bidder }))
)

;; Public Functions
(define-public (increment-fixed-price-nonce)
  (ok (var-set fixed-price-nonce (+ (var-get fixed-price-nonce) u1)))
)

(define-public (increment-auction-nonce)
  (ok (var-set auction-nonce (+ (var-get auction-nonce) u1)))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-whitelisted (asset-contract principal) (whitelisted bool))
  (ok (map-set whitelisted-asset-contracts asset-contract whitelisted))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (set-owner (new-owner principal))
  (ok (var-set contract-owner new-owner))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-fixed-price-listing (listing-id uint) (listing { maker: principal, token-id: uint, nft-asset-contract: principal, price: uint }))
  (ok
    (map-set fixed-price-listings listing-id {
        maker: (get maker listing), 
        nft-asset-contract: (get nft-asset-contract listing), 
        token-id: (get token-id listing), price: (get price listing)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-completed-fixed-price-listing (listing-id uint) (listing { maker: principal, token-id: uint, nft-asset-contract: principal, price: uint }))
  (ok
    (map-set completed-fixed-price-listings listing-id {
        maker: (get maker listing), 
        nft-asset-contract: (get nft-asset-contract listing), 
        token-id: (get token-id listing), price: (get price listing)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-cancelled-fixed-price-listing (listing-id uint) (listing { maker: principal, token-id: uint, nft-asset-contract: principal, price: uint }))
  (ok
    (map-set cancelled-fixed-price-listings listing-id {
        maker: (get maker listing), 
        nft-asset-contract: (get nft-asset-contract listing), 
        token-id: (get token-id listing), price: (get price listing)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (remove-fixed-price-listing (listing-id uint))

  (ok (map-delete fixed-price-listings listing-id))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-auction (auction-id uint) (auction {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }))
 (ok
    (map-set auctions auction-id {
        maker: (get maker auction), 
        nft-asset-contract: (get nft-asset-contract auction), 
        token-id: (get token-id auction), 
        start-block: (get start-block auction), 
        end-block: (get end-block auction), 
        reserve-price: (get reserve-price auction), 
        start-bid: (get start-bid auction), 
        highest-bid: (get highest-bid auction), 
        highest-bidder: (get highest-bidder auction)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-completed-auction (auction-id uint) (auction {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }))
 (ok
    (map-set completed-auctions auction-id {
        maker: (get maker auction), 
        nft-asset-contract: (get nft-asset-contract auction), 
        token-id: (get token-id auction), 
        start-block: (get start-block auction), 
        end-block: (get end-block auction), 
        reserve-price: (get reserve-price auction), 
        start-bid: (get start-bid auction), 
        highest-bid: (get highest-bid auction), 
        highest-bidder: (get highest-bidder auction)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-cancelled-auction (auction-id uint) (auction {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }))
 (ok
    (map-set cancelled-auctions auction-id {
        maker: (get maker auction), 
        nft-asset-contract: (get nft-asset-contract auction), 
        token-id: (get token-id auction), 
        start-block: (get start-block auction), 
        end-block: (get end-block auction), 
        reserve-price: (get reserve-price auction), 
        start-bid: (get start-bid auction), 
        highest-bid: (get highest-bid auction), 
        highest-bidder: (get highest-bidder auction)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (update-auction (auction-id uint) (auction {
    maker: principal,
    token-id: uint,
    nft-asset-contract: principal,
    start-block: uint,
    end-block: uint,
    reserve-price: uint,
    start-bid: uint,
    highest-bid: uint,
    highest-bidder: (optional principal)
  }))
 (ok
    (map-set auctions auction-id {
        maker: (get maker auction), 
        nft-asset-contract: (get nft-asset-contract auction), 
        token-id: (get token-id auction), 
        start-block: (get start-block auction), 
        end-block: (get end-block auction), 
        reserve-price: (get reserve-price auction), 
        start-bid: (get start-bid auction), 
        highest-bid: (get highest-bid auction), 
        highest-bidder: (get highest-bidder auction)
    })
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-bid (key { auction-id: uint, bidder: principal }) (amount  uint))
  (ok (map-set bids { auction-id: (get auction-id key), bidder: (get bidder key) } amount))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (add-withdrawn-bid (key { auction-id: uint, bidder: principal }) (amount  uint))
  (ok (map-set withdrawn-bids { auction-id: (get auction-id key), bidder: (get bidder key) } amount))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (delete-bid (key { auction-id: uint, bidder: principal }))
  (ok (map-delete bids { auction-id: (get auction-id key), bidder: (get bidder key) }))
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (delete-auction (auction-id uint))
  (ok (map-delete auctions auction-id))
)