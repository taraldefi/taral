(impl-trait .marketplace-trait.marketplace-trait)

(use-trait nft-trait .sip009-nft-trait.nft-trait)
(use-trait ft-trait .sip010-ft-trait.sip010-ft-trait)

;; Constants and Errors

(define-constant ERR_INVALID_ROLE (err u201))
(define-constant ERR_INVALID_PRINCIPAL (err u202))
(define-constant PERMISSION_DENIED_ERROR u403)

(define-constant err-expiry-in-past (err u1000))
(define-constant err-price-zero (err u1001))
(define-constant err-unknown-listing (err u2000))
(define-constant err-unauthorised (err u2001))
(define-constant err-listing-expired (err u2002))
(define-constant err-nft-asset-mismatch (err u2003))
(define-constant err-payment-asset-mismatch (err u2004))
(define-constant err-maker-taker-equal (err u2005))
(define-constant err-unintended-taker (err u2006))
(define-constant err-asset-contract-not-whitelisted (err u2007))
(define-constant err-payment-contract-not-whitelisted (err u2008))
(define-constant err-auction-ended (err u3000))
(define-constant err-bid-too-low (err u3001))
(define-constant err-bid-withdrawal (err u3002))
(define-constant err-reserve-not-met (err u3003))
(define-constant err-auction-not-ended (err u3004))
(define-constant err-block-info (err u4000))
(define-constant default-error-value (err u4001))
(define-constant err-no-bids (err u4002))
(define-constant failed-to-transfer (err u4003))
(define-constant failed-to-transfer-nft (err u4004))

(define-constant err-contract-paused (err u9000))
(define-constant marketplace-storage-error (err u9001))


;; Access Restrictions
;; --------------------------------------------------------------------------
(define-constant RESTRICTION_NONE u0) ;; No restriction detected
(define-constant RESTRICTION_BLACKLIST u5) ;; Caller is on the blacklist

;; Role Based Access Control
;; --------------------------------------------------------------------------
(define-constant OWNER_ROLE u0) ;; Can manage RBAC
(define-constant BLACKLISTER_ROLE u4) ;; Can add principals to a blacklist that can prevent them listing assets on the marketplace, or buying the assets from the marketplace

(define-data-var is-initialized bool false)

;; Each role will have a mapping of principal to boolean.  A true "allowed" in the mapping indicates that the principal has the role.
;; Each role will have special permissions to modify or manage specific capabilities in the contract.
;; Note that adding/removing roles could be optimized by having just 1 function, but since this is sensitive functionality, it was split
;;    into 2 separate functions to make it explicit.
;; See the Readme about more details on the RBAC setup.
(define-map roles { role: uint, account: principal } { allowed: bool })

;; Blacklist mapping.  If an account has blacklisted = true then no transfers in or out are allowed
(define-map blacklist { account: principal } { blacklisted: bool })

;; Version string
(define-constant VERSION "0.0.5.beta")

(define-data-var contract-owner principal tx-sender)

(define-data-var contract-paused bool false)

;; Readonly Functions

;; Checks if an account has the specified role
(define-read-only (has-role (role-to-check uint) (principal-to-check principal))
  (default-to false (get allowed (map-get? roles {role: role-to-check, account: principal-to-check}))))  


;; Checks if an account is blacklisted
(define-read-only (is-blacklisted (principal-to-check principal))
  (default-to false (get blacklisted (map-get? blacklist { account: principal-to-check }))))

;; Checks to see if a transfer should be restricted.  If so returns an error code that specifies restriction type.
(define-read-only (detect-restriction (participant principal))
  (if (is-blacklisted participant)
    (err RESTRICTION_BLACKLIST)
    (ok RESTRICTION_NONE)))

(define-read-only (get-info)
    (ok {
        version: (get-version)
    })
)

;; Returns version of the safe contract
;; @returns string-ascii
(define-read-only (get-version) 
    VERSION
)


;; Add a principal to the specified role
;; Only existing principals with the OWNER_ROLE can modify roles
(define-public (add-principal-to-role (role-to-add uint) (principal-to-add principal))   
   (begin
    (asserts! (> role-to-add u0) ERR_INVALID_ROLE)
    (asserts! (is-some (some principal-to-add)) ERR_INVALID_PRINCIPAL)
    ;; Check the contract-caller to verify they have the owner role
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    ;; Print the action for any off chain watchers
    (print { type: "roles", action: "add-principal-to-role", role-to-add: role-to-add, principal-to-add: principal-to-add })
    (ok (map-set roles { role: role-to-add, account: principal-to-add } { allowed: true }))))

;; Remove a principal from the specified role
;; Only existing principals with the OWNER_ROLE can modify roles
;; WARN: Removing all owners will irrevocably lose all ownership permissions
(define-public (remove-principal-from-role (role-to-remove uint) (principal-to-remove principal))   
   (begin
    (asserts! (> role-to-remove u0) ERR_INVALID_ROLE)
    (asserts! (is-some (some principal-to-remove)) ERR_INVALID_PRINCIPAL)
    ;; Check the contract-caller to verify they have the owner role
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    ;; Print the action for any off chain watchers
    (print { type: "roles", action: "remove-principal-from-role", role-to-remove: role-to-remove, principal-to-remove: principal-to-remove })
    (ok (map-set roles { role: role-to-remove, account: principal-to-remove } { allowed: false }))))

;; Updates an account's blacklist status
;; Only existing principals with the BLACKLISTER_ROLE can update blacklist status
(define-public (update-blacklisted (principal-to-update principal) (set-blacklisted bool))
  (begin
    (asserts! (is-some (some principal-to-update)) ERR_INVALID_PRINCIPAL)
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    ;; Print the action for any off chain watchers
    (print { type: "blacklisting", action: "update-blacklisted", principal-to-update: principal-to-update, set-blacklisted: set-blacklisted })
    (ok (map-set blacklist { account: principal-to-update } { blacklisted: set-blacklisted }))))


(define-public (set-whitelisted (asset-contract principal) (whitelisted bool))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (unwrap! (contract-call? .marketplace-storage set-whitelisted asset-contract whitelisted) marketplace-storage-error)
    (print { type: "whitelisting", action: "set-whitelisted", asset-contract: asset-contract, whitelisted: whitelisted })

    (ok true)
  )
)

(define-public (pause-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set contract-paused true)
    (ok true)
  )
)

(define-public (resume-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set contract-paused false)
    (ok true)
  )
)


;; Private Functions
(define-private (transfer-nft (token-contract <nft-trait>) (token-id uint) (sender principal) (recipient principal))
  (contract-call? token-contract transfer token-id sender recipient)
)

;; Public Functions

(define-public (set-owner (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (var-set contract-owner new-owner)
    (ok true)
  )
)

(define-public (list-fixed-price (nft-asset-contract <nft-trait>) (nft-asset { token-id: uint, price: uint }))
  (let (
    (listing-id (contract-call? .marketplace-storage get-fixed-price-listing-nonce))
  )
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)
    
    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction

    (asserts! (contract-call? .marketplace-storage is-whitelisted (contract-of nft-asset-contract)) err-asset-contract-not-whitelisted)
    (asserts! (> (get price nft-asset) u0) err-price-zero)

    ;; Transfer the NFT to the contract
    (unwrap! (transfer-nft nft-asset-contract (get token-id nft-asset) tx-sender (as-contract tx-sender)) failed-to-transfer-nft)

    (unwrap! (contract-call? .marketplace-storage add-fixed-price-listing listing-id { 
      maker: tx-sender, 
      nft-asset-contract: (contract-of nft-asset-contract), 
      token-id: (get token-id nft-asset), 
      price: (get price nft-asset) } ) marketplace-storage-error)

    (print { type: "fixed-price", action: "list-fixed-price", maker: tx-sender, 
      nft-asset-contract: (contract-of nft-asset-contract), 
      token-id: (get token-id nft-asset), 
      price: (get price nft-asset) })

    (unwrap! (contract-call? .marketplace-storage increment-fixed-price-nonce) marketplace-storage-error)

    (ok listing-id)
  )
)

(define-public (purchase-fixed-price-listing (listing-id uint) (recipient principal) (nft-asset-contract <nft-trait>))
  (let (
    (listing (unwrap! (contract-call? .marketplace-storage get-fixed-price-listing listing-id) err-unknown-listing))
  )
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)

    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction
    
    ;; Transfer the stx from the buyer to the maker
    (try! (stx-transfer? (get price listing) tx-sender (get maker listing)))
    ;; Transfer the NFT to the buyer
    (try! (as-contract (transfer-nft nft-asset-contract (get token-id listing) tx-sender recipient)))

    (unwrap! (contract-call? .marketplace-storage add-completed-fixed-price-listing listing-id listing) marketplace-storage-error)
    ;; Delete the listing
    (unwrap! (contract-call? .marketplace-storage remove-fixed-price-listing listing-id) marketplace-storage-error)

    (print { type: "fixed-price", action: "purchase-fixed-price-listing", listing-id: listing-id, 
          nft-asset-contract: (contract-of nft-asset-contract), 
          recipient: recipient, 
          price: (get price listing) })

    (ok true)
  )
)

(define-public (cancel-fixed-price-listing (listing-id uint) (nft-asset-contract <nft-trait>))
  (let (
    (listing (unwrap! (contract-call? .marketplace-storage get-fixed-price-listing listing-id) err-unknown-listing))
  )
    (asserts! (or (is-eq tx-sender (get maker listing)) (is-eq  tx-sender (var-get contract-owner))) err-unauthorised)

    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction
    
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)
    ;; Transfer the NFT back to the maker
    (try! (as-contract (transfer-nft nft-asset-contract (get token-id listing) tx-sender (get maker listing))))
    (unwrap! (contract-call? .marketplace-storage add-cancelled-fixed-price-listing listing-id listing) marketplace-storage-error)
    ;; Delete the listing
    (unwrap! (contract-call? .marketplace-storage remove-fixed-price-listing listing-id) marketplace-storage-error)

    (print { type: "fixed-price", action: "cancel-fixed-price-listing", maker: tx-sender, 
          listing-id: listing-id,
          nft-asset-contract: (contract-of nft-asset-contract), 
          token-id: (get token-id listing), 
          price: (get price listing) })

    (ok true)
  )
)

(define-public (start-auction (nft-asset-contract <nft-trait>) (nft-asset { token-id: uint, start-block: uint, end-block: uint, start-bid: uint, reserve-price: uint }))
  (let (
    (auction-id (contract-call? .marketplace-storage get-auction-nonce))
  )
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)
    
    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction
    
    (asserts! (contract-call? .marketplace-storage is-whitelisted (contract-of nft-asset-contract)) err-asset-contract-not-whitelisted)

    (asserts! (> (get end-block nft-asset) (get start-block nft-asset)) err-expiry-in-past)
    (asserts! (> (get start-bid nft-asset) u0) err-price-zero)

    (unwrap! (transfer-nft nft-asset-contract (get token-id nft-asset) tx-sender (as-contract tx-sender)) failed-to-transfer-nft)

    (unwrap! (contract-call? .marketplace-storage add-auction auction-id (merge { 
      maker: tx-sender, 
      nft-asset-contract: (contract-of nft-asset-contract), 
      highest-bid: u0, 
      highest-bidder: none 
      } nft-asset)) marketplace-storage-error)    
    
    (unwrap! (contract-call? .marketplace-storage increment-auction-nonce) marketplace-storage-error)

    (print (merge {
      type: "auction", 
      action: "start-auction",
      auction-id: auction-id,
      maker: tx-sender, 
      nft-asset-contract: (contract-of nft-asset-contract), 
      highest-bid: u0, 
      highest-bidder: none 
      } nft-asset))

    (ok auction-id)
  )
)

(define-public (place-bid (auction-id uint) (bid uint))
  (let (
    (auction (unwrap! (contract-call? .marketplace-storage get-auction auction-id) err-unknown-listing))
    (previous-bid (contract-call? .marketplace-storage get-previous-bid auction-id tx-sender ))
  )
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)
    
    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction
    ;; Check that the auction is still ongoing
    (asserts! (and (>= block-height (get start-block auction)) (<= block-height (get end-block auction))) err-auction-ended)
    ;; Check that the bid is higher than the current highest bid
    (asserts! (> bid (get highest-bid auction)) err-bid-too-low)
    ;; Transfer the bid difference from the bidder to the contract
    (unwrap! (stx-transfer? (- bid previous-bid) tx-sender (as-contract tx-sender)) failed-to-transfer)

    ;; Return the previous highest bid
    (match (get highest-bidder auction)
        some-bidder 
        (begin
            (try! (as-contract (stx-transfer? (get highest-bid auction) tx-sender some-bidder)))

            (unwrap! (contract-call? .marketplace-storage add-auction auction-id (merge auction {
               highest-bid: bid, 
               highest-bidder: (some tx-sender) })) marketplace-storage-error)

            (unwrap! (contract-call? .marketplace-storage add-bid { auction-id: auction-id, bidder: tx-sender } bid) marketplace-storage-error)

            ;; Move the bid to the withdrawn-bids map
            (unwrap! (contract-call? .marketplace-storage add-withdrawn-bid { auction-id: auction-id, bidder: some-bidder } (get highest-bid auction)) marketplace-storage-error)

            ;; Delete the bidder's bid
            (unwrap! (contract-call? .marketplace-storage delete-bid { auction-id: auction-id, bidder: some-bidder }) marketplace-storage-error)

            (print (merge { type: "auction", action: "place-bid", bidder: tx-sender, auction-id: auction-id, bid: bid } auction))

            (print (merge { action: "place-bid-return-previous-bid", previous-bidder: some-bidder, auction-id: auction-id, bid: (get highest-bid auction) } auction))

            (ok true)
        )
        (begin

            (unwrap! (contract-call? .marketplace-storage add-auction auction-id (merge auction {
               highest-bid: bid, 
               highest-bidder: (some tx-sender) })) marketplace-storage-error)

            (unwrap! (contract-call? .marketplace-storage add-bid { auction-id: auction-id, bidder: tx-sender } bid) marketplace-storage-error)

            (print (merge { type: "auction", action: "place-bid", bidder: tx-sender, auction-id: auction-id, bid: bid } auction))

            (ok true)
        )
    )
  )
)

(define-public (end-auction (auction-id uint) (nft-asset-contract <nft-trait>))
  (let (
    (auction (unwrap! (contract-call? .marketplace-storage get-auction auction-id) err-unknown-listing))
  )
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)
    
    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction
    ;; Check that the auction has ended
    (asserts! (> block-height (get end-block auction)) err-auction-not-ended)
     ;; Check if the reserve price has been met
    (if (>= (get highest-bid auction) (get reserve-price auction))
        (begin
          ;; Transfer the NFT to the highest bidder
          (try! (as-contract (transfer-nft nft-asset-contract (get token-id auction) tx-sender (unwrap! (get highest-bidder auction) err-no-bids))))
          ;; Transfer the highest bid to the maker
          (try! (as-contract (stx-transfer? (get highest-bid auction) tx-sender (get maker auction))))
          ;; Move the auction to the completed-auctions map
          (unwrap! (contract-call? .marketplace-storage add-completed-auction auction-id auction) marketplace-storage-error)
          ;; Delete the auction
          (unwrap! (contract-call? .marketplace-storage delete-auction auction-id) marketplace-storage-error)

          (print (merge { type: "auction", action: "end-auction", auction-id: auction-id, reserve-price-met: true } auction))

          (ok { auction-id: auction-id, reserve-price-met: true })
        )
        (begin
          ;; Reserve price not met, return bid to the highest bidder
          (try! (as-contract (stx-transfer? (get highest-bid auction) tx-sender (unwrap! (get highest-bidder auction) err-no-bids))))
          ;; Return the NFT to the maker
          (try! (as-contract (transfer-nft nft-asset-contract (get token-id auction) tx-sender (get maker auction))))
          ;; Move the auction to the cancelled-auctions map
          (unwrap! (contract-call? .marketplace-storage add-cancelled-auction auction-id auction) marketplace-storage-error)
          ;; Delete the auction
          (unwrap! (contract-call? .marketplace-storage delete-auction auction-id) marketplace-storage-error)

          (print (merge { type: "auction", action: "end-auction", auction-id: auction-id, reserve-price-met: false } auction))

          (ok { auction-id: auction-id, reserve-price-met: false })
        )
    )
  )
)

(define-public (cancel-auction (auction-id uint) (nft-asset-contract <nft-trait>))
  (let (
    (auction (unwrap! (contract-call? .marketplace-storage get-auction auction-id) err-unknown-listing))
  )
    (asserts! (or (not (var-get contract-paused)) (is-eq tx-sender (var-get contract-owner))) err-contract-paused)
    
    (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction

    ;; Check that the auction has not ended and the sender is the maker
    (asserts! (and (<= block-height (get end-block auction)) (or (is-eq tx-sender (get maker auction)) (is-eq tx-sender (var-get contract-owner)))) err-unauthorised)
    
    ;; Transfer the NFT back to the maker
    (try! (as-contract (transfer-nft nft-asset-contract (get token-id auction) tx-sender (get maker auction))))

    (match (get highest-bidder auction)
            highest-bidder 
            (begin

                (try! (as-contract (stx-transfer? (get highest-bid auction) tx-sender highest-bidder)))
                
                (unwrap! (contract-call? .marketplace-storage add-cancelled-auction auction-id auction) marketplace-storage-error)
                ;; Delete the auction
                (unwrap! (contract-call? .marketplace-storage delete-auction auction-id) marketplace-storage-error)

                (print (merge { type: "auction", action: "cancel-auction", auction-id: auction-id, highest-bidder: highest-bidder } auction))

                (ok true)
            )
            (begin

                (unwrap! (contract-call? .marketplace-storage add-cancelled-auction auction-id auction) marketplace-storage-error)
                ;; Delete the auction
                (unwrap! (contract-call? .marketplace-storage delete-auction auction-id) marketplace-storage-error)
                
                (print (merge { type: "auction", action: "cancel-auction", auction-id: auction-id, highest-bidder: none } auction))
                
                (ok true)
            )
        )
  )
)


;; Initialization
;; --------------------------------------------------------------------------

;; Check to ensure that the same account that deployed the contract is initializing it
;; Only allow this funtion to be called once by checking "is-initialized"
(define-public (initialize (name-to-set (string-ascii 32)) (symbol-to-set (string-ascii 32) ) (decimals-to-set uint) (initial-owner principal))
  (begin
    (asserts! (is-some (some initial-owner)) ERR_INVALID_PRINCIPAL)
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorised)
    (asserts! (not (var-get is-initialized)) (err PERMISSION_DENIED_ERROR))
    (var-set is-initialized true) ;; Set to true so that this can't be called again
    (map-set roles { role: OWNER_ROLE, account: initial-owner } { allowed: true })
    (ok true)))