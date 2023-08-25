;; sip009-nft
;; create a sip009 nft

;; explicitly assert conformity with depending traits.
(impl-trait .sip009-nft-trait.nft-trait)

;; constants
;; contract deployer
(define-constant CONTRACT_OWNER tx-sender)

(define-constant MINT u600)

;; constant error codes
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-token-id-failure (err u102))

;; data maps and vars
;; define NFT's unique asset name (per contract) and asset identifier
(define-non-fungible-token sip009-nft uint)
;; increment a counter variable each time a new NFT is minted
(define-data-var last-token-id uint u0)

;; private functions
;;

;; public functions
;;
;; track the last token ID
(define-read-only (get-last-token-id) 
    (ok (var-get last-token-id))
)

;; return a link to the metadata of a specified NFT (or none)
(define-read-only (get-token-uri (id uint)) 
    (ok none)
)
;; concat root url + token ID in a straightforward link
;; (concat "https://domain.tld/metadata/" (to-ascii token-id))

;; wrap the built-in nft-get-owner? function
(define-read-only (get-owner (id uint)) 
    (ok (nft-get-owner? sip009-nft id))
)

;; transfer function should assert that sender == tx-sender.
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (transfer (id uint) (sender principal) (recipient principal)) 
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (nft-transfer? sip009-nft id sender recipient)
    )
)

;; minting function must prevent others than contract-owner to mint new tokens
(define-public (mint (recipient principal))
	(let ((token-id (+ (var-get last-token-id) u1)))
		(asserts! (is-eq tx-sender CONTRACT_OWNER) err-owner-only)
		(try! (nft-mint? sip009-nft token-id recipient))
		(asserts! (var-set last-token-id token-id) err-token-id-failure)
		(ok token-id)
	)
)