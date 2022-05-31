;; authorization logics
(define-data-var owner principal tx-sender)

(define-data-var files-count uint u0)

(define-private (is-owner) 
  (ok (asserts! (is-eq tx-sender (var-get owner)) ERR_UNAUTHORIZED))
)

(define-map files
    { id: uint }
    {
        name: (string-utf8 128),
        hash: (string-utf8 256),
        created-at: (optional uint),
        last-modified: (optional uint),
        owners: (list 50 (tuple (address principal) (can-write bool) (can-read bool)))
    }
)

(define-map files-by-member
    {member: principal}
    {file-ids: (list 1000 uint)}
)

(define-public (register-file
    (name (string-utf8 128))
    (hash (string-utf8 256))
    (owners (list 50 (tuple (address principal) (can-write bool) (can-read bool))))
)
(
    let (
        (new-file-id (+ u1 (var-get files-count)))
        (now (get-block-info? time (- block-height u1)))
        (member-files (get file-ids (get-files-by-member tx-sender)))
    )

    (map-set files
        { 
            id: new-file-id }
        {
            name: name,
            hash: hash,
            created-at: now,
            last-modified: now,
            owners: (list {
                address: tx-sender, 
                can-write: true, 
                can-read: true
            })
        }
    )

    (var-set files-count new-file-id)

    (map-set files-by-member {member: tx-sender} {file-ids: (unwrap-panic (as-max-len? (append member-files new-file-id) u1000))})
    (ok true)
)
)



(define-read-only (get-files-by-member (member principal))
    (unwrap! (map-get? files-by-member { member: member }) (tuple (file-ids (list u0))))
)




;; error codes
(define-constant ERR_UNAUTHORIZED (err u401))
(define-constant ERR_NOT_FOUND (err u404))
(define-constant ERR_UNEXPECTED (err u500))