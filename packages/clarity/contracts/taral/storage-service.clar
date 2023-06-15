;; storage-service
;; On-chain utility to prove access to files

(impl-trait .storage-service-trait.storage-service-trait)
;; File access Restrictions
;; --------------------------------------------------------------------------
(define-constant RESTRICTION_NONE u0) ;; No restriction detected
(define-constant RESTRICTION_BLACKLIST u5) ;; Sender or receiver is on the blacklist
;; A buffer containing the ascii string "Stacks Signed Message: "
(define-constant message-prefix 0x537461636b73205369676e6564204d6573736167653a20)
;; error codes
(define-constant ERR_UNAUTHORIZED (err u401))
;; Error returned for permission denied - stolen from http 403
(define-constant PERMISSION_DENIED_ERROR u403)
(define-constant ERR_FILE_NOT_FOUND (err u105))
(define-constant ERR_NOT_FOUND (err u404))
(define-constant ERR_UNEXPECTED (err u500))
(define-data-var owner principal tx-sender)

;; Each role will have a mapping of principal to boolean.  A true "allowed" in the mapping indicates that the principal has the role.
;; Each role will have special permissions to modify or manage specific capabilities in the contract.
;; Note that adding/removing roles could be optimized by having just 1 function, but since this is sensitive functionality, it was split
;;    into 2 separate functions to make it explicit.
;; See the Readme about more details on the RBAC setup.
(define-map roles { role: uint, account: principal } { allowed: bool })

;; Blacklist mapping.  If an account has blacklisted = true then no transfers in or out are allowed
(define-map blacklist { account: principal } { blacklisted: bool })

;; Track who deployed the token and whether it has been initialized
(define-data-var deployer-principal principal tx-sender)
(define-data-var is-initialized bool false)

;; Role Based Access Control
;; --------------------------------------------------------------------------
(define-constant OWNER_ROLE u0) ;; Can manage RBAC
(define-constant BLACKLISTER_ROLE u4) ;; Can add principals to a blacklist that can prevent transfers

;; Error Codes

(define-constant ERR_FILE_ALREADY_REGISTERED (err u100))
(define-constant ERR_INVALID_SIGNATURE (err u101))
(define-constant ERR_EMPTY_FILENAME (err u102))
(define-constant ERR_EMPTY_HASH (err u103))
(define-constant ERR_EMPTY_SIGNATURE (err u104))
(define-constant ERR_UNKNOWN_FILE_ACCESS (err u106))
(define-constant ERR_INVALID_FILE_ID (err u107))
(define-constant ERR_INVALID_ROLE (err u201))
(define-constant ERR_INVALID_PRINCIPAL (err u202))
(define-constant ERR-CONTRACT-CALL (err u500))

(define-constant VERSION "0.0.5.beta")

;; Read-only functions

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

(define-read-only (get-hash (file-id (string-utf8 36)))
    (let 
    ((latest-file-info (unwrap! (contract-call? .taral-file-storage get-file-hash file-id) ERR_FILE_NOT_FOUND )))        
    (ok (get hash latest-file-info))
    )
)

(define-read-only (can-read-file (participant principal) (file-id (string-utf8 36)))
    (let ((file-authorization (default-to 
        {
            can-read: false,
            can-write: false,
            owns: false
        } (contract-call? .taral-file-storage get-file-authorizations file-id participant)))
        )

        (if (or
            (is-blacklisted participant)
            (is-eq (get can-read file-authorization) false)
        )   
            (ok false)
            (ok true)
        )
    )
)

(define-read-only (can-write-file (participant principal) (file-id (string-utf8 36)))
    (let ((file-authorization (default-to 
        {
            can-read: false,
            can-write: false,
            owns: false
        } (contract-call? .taral-file-storage get-file-authorizations file-id participant)))
        )

        (if (and
            (not (is-blacklisted participant))
            (is-eq (get can-write file-authorization) true)
        )   
            (ok true)
            (ok false)
        )
    )
)

;; Checks if an account has the specified role
(define-read-only (has-role (role-to-check uint) (principal-to-check principal))
  (default-to false (get allowed (map-get? roles {role: role-to-check, account: principal-to-check}))))  


;; Checks if an account is blacklisted
(define-read-only (is-blacklisted (principal-to-check principal))
  (default-to false (get blacklisted (map-get? blacklist { account: principal-to-check }))))


(define-read-only (hash-message (message (buff 256)))
	(sha256 (concat message-prefix message))
)

(define-read-only (validate-signature (hash (buff 32)) (signature (buff 65)) (signer principal))
    (is-eq (principal-of? (unwrap! (secp256k1-recover? hash signature) false) ) (ok signer))    
)

;; Checks to see if a transfer should be restricted.  If so returns an error code that specifies restriction type.
(define-read-only (detect-restriction (participant principal))
  (if (is-blacklisted participant)
    (err RESTRICTION_BLACKLIST)
    (ok RESTRICTION_NONE)))


;; Add a principal to the specified role
;; Only existing principals with the OWNER_ROLE can modify roles
(define-public (add-principal-to-role (role-to-add uint) (principal-to-add principal))   
   (begin
    (asserts! (> role-to-add u0) ERR_INVALID_ROLE)
    (asserts! (is-some (some principal-to-add)) ERR_INVALID_PRINCIPAL)
    ;; Check the contract-caller to verify they have the owner role
    (asserts! (has-role OWNER_ROLE contract-caller) (err PERMISSION_DENIED_ERROR))
    ;; Print the action for any off chain watchers
    (print { action: "add-principal-to-role", role-to-add: role-to-add, principal-to-add: principal-to-add })
    (ok (map-set roles { role: role-to-add, account: principal-to-add } { allowed: true }))))

;; Remove a principal from the specified role
;; Only existing principals with the OWNER_ROLE can modify roles
;; WARN: Removing all owners will irrevocably lose all ownership permissions
(define-public (remove-principal-from-role (role-to-remove uint) (principal-to-remove principal))   
   (begin
    (asserts! (> role-to-remove u0) ERR_INVALID_ROLE)
    (asserts! (is-some (some principal-to-remove)) ERR_INVALID_PRINCIPAL)
    ;; Check the contract-caller to verify they have the owner role
    (asserts! (has-role OWNER_ROLE contract-caller) (err PERMISSION_DENIED_ERROR))
    ;; Print the action for any off chain watchers
    (print { action: "remove-principal-from-role", role-to-remove: role-to-remove, principal-to-remove: principal-to-remove })
    (ok (map-set roles { role: role-to-remove, account: principal-to-remove } { allowed: false }))))

;; Updates an account's blacklist status
;; Only existing principals with the BLACKLISTER_ROLE can update blacklist status
(define-public (update-blacklisted (principal-to-update principal) (set-blacklisted bool))
  (begin
    (asserts! (is-some (some principal-to-update)) ERR_INVALID_PRINCIPAL)
    (asserts! (has-role BLACKLISTER_ROLE contract-caller) (err PERMISSION_DENIED_ERROR))
    ;; Print the action for any off chain watchers
    (print { action: "update-blacklisted", principal-to-update: principal-to-update, set-blacklisted: set-blacklisted })
    (ok (map-set blacklist { account: principal-to-update } { blacklisted: set-blacklisted }))))

;; Public function that allows a file to be registered on-chain
;;
;; Parameters
;;
;; `filename` must not be empty
;; `hash` the hash of the file content
;; `signature` - the signature generated when sending this message
;;
;; Summary
;;
;; The idea is that this signature must only be generated from the owner address
;; This is to enforce that whoever registers a file, uploaded it first on the off-chain storage API 
(define-public (register-file 
    (file-id (string-utf8 36))
    (filename (string-ascii 128))
    (hash (buff 256))
    (signature (buff 65))
)
    (let (
            ;; hash the hash for signature verification
            (message-hash-for-signature (hash-message hash))
        )

        (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction

        ;; check that the filename is not empty
        (asserts! (> (len filename) u0) ERR_EMPTY_FILENAME)

        ;; check that the hash is not empty
        (asserts! (> (len hash) u0) ERR_EMPTY_HASH)

        ;; check that the signature is not empty
        (asserts! (> (len signature) u0) ERR_EMPTY_SIGNATURE)

        ;; check that the file is not already registered
        (asserts! (is-none (contract-call? .taral-file-storage get-files-by-name filename tx-sender hash)) ERR_FILE_ALREADY_REGISTERED)

        ;; validate that this register file payload has been signed
        (asserts! (validate-signature message-hash-for-signature signature tx-sender) ERR_INVALID_SIGNATURE)
        
        (print {
            contract: "storage-service",
            event: "register-file",
            participant: tx-sender,
            name: filename,
            hash: hash,
            owns: true,
            can-read: true,
            can-write: true
        })

        ;; add the new file to files-by-name
        (unwrap! (contract-call? .taral-file-storage set-files-by-name filename tx-sender hash file-id) ERR-CONTRACT-CALL)

        ;; add the new file to the files overall map

        (unwrap! (contract-call? .taral-file-storage set-files file-id filename hash) ERR-CONTRACT-CALL)

        ;; set the file versioning
        
        (unwrap! (contract-call? .taral-file-storage set-file-versions file-id hash tx-sender) ERR-CONTRACT-CALL)

        ;; set the live file auth map
        ;;
        (unwrap! (contract-call? .taral-file-storage set-file-authorizations file-id tx-sender true true true) ERR-CONTRACT-CALL)

        ;; set the latest file hash
        ;;
        (unwrap! (contract-call? .taral-file-storage set-file-hash file-id hash filename) ERR-CONTRACT-CALL)

        ;; success
        (ok file-id)
    )
)

;; Public function that allows granting someone access to the file
;;
;; Parameters
;;
;;  `file-id` must be greater than 0 and a valid, existing on-chain file id
;;  `can-read` specifies if the grantee can read
;;  `can-write` specifies if the grantee can read
;;
;; Summary
;;
;; A person that is not the owner of the file needs to be granted access here in order to be able to interact with it on the
;; off-chain file storage
;;
(define-public (grant-access
    (participant principal)
    (file-id (string-utf8 36))
    (can-read bool)
    (can-write bool)
)
    (let (
            (existing-file (unwrap! (contract-call? .taral-file-storage get-files file-id) ERR_NOT_FOUND))
        )

        (asserts! (is-some (some file-id)) ERR_INVALID_FILE_ID)

        (asserts! (is-some (some participant)) ERR_INVALID_PRINCIPAL)

        ;; Add this authorization rule
        ;;
        (unwrap! (contract-call? .taral-file-storage set-file-authorizations file-id participant true can-read can-write) ERR-CONTRACT-CALL)

        ;; Add it to the files by name
        ;;
        (unwrap! (contract-call? .taral-file-storage set-files-by-name (get name existing-file) participant (get hash existing-file) file-id) ERR-CONTRACT-CALL)

        (print {
            contract: "storage-service",
            event: "grant-access",
            participant: participant,
            can-read: can-read,
            can-write: can-write,
            id: file-id
        })

        (ok true)
    )
)

;; Public function that allows updating someone's access to the file
;;
;; Parameters
;;
;;  `file-id` must be greater than 0 and a valid, existing on-chain file id
;;  `can-read` specifies if the grantee can read
;;  `can-write` specifies if the grantee can read
;;
;; Summary
;;
;; Allows updating access to the file
;;
(define-public (update-access
    (participant principal)
    (file-id (string-utf8 36))
    (can-read bool)
    (can-write bool)
)
    (let (
            (existing-file-authorization (unwrap! (contract-call? .taral-file-storage get-file-authorizations file-id participant) ERR_UNKNOWN_FILE_ACCESS))
            (existing-file (unwrap! (contract-call? .taral-file-storage get-files file-id) ERR_FILE_NOT_FOUND))
        )

        (asserts! (is-some (some file-id)) ERR_INVALID_FILE_ID)

        (asserts! (is-some (some participant)) ERR_INVALID_PRINCIPAL)

        ;; Mutate the authorization for this file
        ;;
        (unwrap! (contract-call? .taral-file-storage delete-file-authorizations file-id participant) ERR-CONTRACT-CALL)

        (unwrap! (contract-call? .taral-file-storage update-file-authorizations { id: file-id, participant: participant }
            (merge existing-file-authorization { owns: false, can-read: can-read, can-write: can-write })) ERR-CONTRACT-CALL)
        

        (print {
            contract: "storage-service",
            event: "update-access",
            action: "update-file-authorizations",
            can-read: (get can-read (unwrap! (contract-call? .taral-file-storage get-file-authorizations file-id participant) ERR_UNKNOWN_FILE_ACCESS)),
            can-write: (get can-write (unwrap! (contract-call? .taral-file-storage get-file-authorizations file-id participant) ERR_UNKNOWN_FILE_ACCESS)),
            id: file-id
        })

        ;; Add it to the files by name
        ;;
        (unwrap! (contract-call? .taral-file-storage set-files-by-name (get name existing-file) participant (get hash existing-file) file-id) ERR-CONTRACT-CALL)
  
        (print {
            contract: "storage-service",
            event: "update-access",
            participant: participant,
            can-read: can-read,
            can-write: can-write,
            id: file-id
        })


        (ok true)
    )
)

;; Public function that allows revoking someone's access to the file
;;
;; Parameters
;;
;;  `file-id` must be greater than 0 and a valid, existing on-chain file id
;;
;; Summary
;;
;; Allows revoking someone's access to the file. This does not delete data from the map
;;
(define-public (revoke-access 
    (file-id (string-utf8 36))
    (participant principal)
)
    (let (
            (existing-file-authorization (unwrap! (contract-call? .taral-file-storage get-file-authorizations file-id participant) ERR_UNKNOWN_FILE_ACCESS))
        )

        (asserts! (is-some (some file-id)) ERR_INVALID_FILE_ID)

        (unwrap! (contract-call? .taral-file-storage update-file-authorizations { id: file-id, participant: participant }
            (merge existing-file-authorization { owns: false, can-read: false, can-write: false })) ERR-CONTRACT-CALL)

        (print {
            contract: "storage-service",
            event: "revoke-access",
            participant: participant,
            can-read: false,
            can-write: false,
            id: file-id
        })

        ;;success
        (ok true)
    )
)

;; Public function that allows a file to be updated on-chain
;;
;; Parameters
;;
;; `filename` must not be empty
;; `hash` the new hash of the file content
;; `signature` - the signature generated when sending this message
;;
;; Summary
;;
;; ALlows updating the file version / hash
(define-public (update-file
        (file-id (string-utf8 36))
        (hash (buff 256))
        (signature (buff 65))
)
    (let (
            (latest-file-info (unwrap! (contract-call? .taral-file-storage get-file-hash file-id) ERR-CONTRACT-CALL ))
            ;; hash the hash for signature verification
            (message-hash-for-signature (hash-message hash))
            (original-file (unwrap! (contract-call? .taral-file-storage get-files-by-name 
                (get name latest-file-info)
                tx-sender
                (get hash latest-file-info)
            ) ERR-CONTRACT-CALL))
        )        

        (try! (detect-restriction tx-sender)) ;; Ensure there is no restriction

        (asserts! (is-some (some file-id)) ERR_INVALID_FILE_ID)

        ;; check that the hash is not empty
        (asserts! (> (len hash) u0) ERR_EMPTY_HASH)

        ;; check that the signature is not empty
        (asserts! (> (len signature) u0) ERR_EMPTY_SIGNATURE)
        
        ;; validate that this register file payload has been signed
        (asserts! (validate-signature message-hash-for-signature signature tx-sender) ERR_INVALID_SIGNATURE)
        
        ;; Add a new file version
        ;;
        (unwrap! (contract-call? .taral-file-storage set-file-versions (get id original-file) hash tx-sender ) ERR-CONTRACT-CALL)

        ;; Update files by name
        ;;
        (unwrap! (contract-call? .taral-file-storage delete-files-by-name (get name latest-file-info) tx-sender (get hash latest-file-info)) ERR-CONTRACT-CALL)

        (unwrap! (contract-call? .taral-file-storage set-files-by-name (get name latest-file-info) tx-sender hash (get id original-file)) ERR-CONTRACT-CALL)

        ;; update file hash
        ;;
        (unwrap! (contract-call? .taral-file-storage update-file-hash { id: file-id } (merge latest-file-info { name: (get name latest-file-info), hash: hash })) ERR-CONTRACT-CALL)

        (print {
            contract: "storage-service",
            event: "update-file",
            participant: tx-sender,
            old-hash: (get hash latest-file-info),
            new-hash: hash,
            id: file-id
        })

        ;; success
        (ok true)
    )
)

;; Check to ensure that the same account that deployed the contract is initializing it
;; Only allow this funtion to be called once by checking "is-initialized"
(define-public (initialize (initial-owner principal))
  (begin
    (asserts! (is-some (some initial-owner)) ERR_INVALID_PRINCIPAL)
    (asserts! (is-eq tx-sender (var-get deployer-principal)) (err PERMISSION_DENIED_ERROR))
    (asserts! (not (var-get is-initialized)) (err PERMISSION_DENIED_ERROR))
    (var-set is-initialized true) ;; Set to true so that this can't be called again

    (map-set roles { role: OWNER_ROLE, account: initial-owner } { allowed: true })
    (ok true)))