;; Files map, holds all files
(define-map files 
    {
        id: (string-utf8 36)
    }
    {
        name: (string-ascii 128),
        hash: (buff 256),
        created: uint,
        last-updated: uint
    }
)

;; Latest hash by file
(define-map file-hash 
    {
        id: (string-utf8 36)
    } 
    {
        hash: (buff 256),
        name: (string-ascii 128)
    }
)

;; File ID by participant, hash and filename
(define-map files-by-name
    {
        name: (string-ascii 128),
        participant: principal,
        hash: (buff 256)
    }
    {
        id: (string-utf8 36)
    }
)

;; File versions
(define-map file-versions 
    {
        id: (string-utf8 36),
        hash: (buff 256)
    }
    {
        changed-by: principal
    }
)

;; Files authorizations
(define-map file-authorizations
    {
        id: (string-utf8 36),
        participant: principal
    }
    {
        can-read: bool,
        can-write: bool,
        owns: bool
    }
)

;; Readonly functions

(define-read-only (get-file-hash (file-id (string-utf8 36)))
    (map-get? file-hash { id: file-id })
)

(define-read-only (get-files-by-name (filename (string-ascii 128)) (participant principal) (hash (buff 256)))
    (map-get? files-by-name { name: filename, participant: participant, hash: hash })
)

(define-read-only (get-files (file-id (string-utf8 36)))
    (map-get? files {id: file-id })
)

(define-read-only (get-file-authorizations (file-id (string-utf8 36)) (participant principal))
    (map-get? file-authorizations { id: file-id, participant: participant })
)

;; Public functions

(define-public (set-files-by-name (filename (string-ascii 128)) (participant principal) (hash (buff 256)) (file-id (string-utf8 36)))
    (ok (map-set files-by-name { name: filename, participant: participant, hash: hash } { id: file-id }))
)

(define-public (delete-files-by-name (filename (string-ascii 128)) (participant principal) (hash (buff 256)))
    (ok (map-delete files-by-name { name: filename, participant: participant, hash: hash }))
)

(define-public (set-files (file-id (string-utf8 36)) (filename (string-ascii 128)) (hash (buff 256)))
    (ok (map-set files { id: file-id } {
            name: filename,
            hash: hash,
            created: block-height,
            last-updated: block-height
        })
    )
)

(define-public (set-file-hash (file-id (string-utf8 36)) (hash (buff 256)) (filename (string-ascii 128)))
    (ok (map-set file-hash { id: file-id } {
            hash: hash,
            name: filename
        })
    )
)

(define-public (update-file-hash 
    (key-tuple {
        id: (string-utf8 36)
    })
    (value-tuple {
        hash: (buff 256),
        name: (string-ascii 128)
    }))
    (ok (map-set file-hash key-tuple value-tuple)
    )
)

(define-public (set-file-versions (file-id (string-utf8 36)) (hash (buff 256)) (changed-by principal))
    (ok (map-set file-versions {
            id: file-id,
            hash: hash
        } 
        {
            changed-by: tx-sender
        })
    )
)

(define-public (set-file-authorizations 
    (file-id (string-utf8 36)) 
    (participant principal)
    (owns bool)
    (can-write bool)
    (can-read bool)
    )
        (ok (map-set file-authorizations {id: file-id, participant: participant } {
            owns: owns,
            can-write: can-write,
            can-read: can-read
        })
        )
)

(define-public (delete-file-authorizations (file-id (string-utf8 36)) (participant principal))
    (ok (map-delete file-authorizations { id: file-id, participant: participant }))
)

(define-public (update-file-authorizations 
    (key-tuple {
        id: (string-utf8 36),
        participant: principal}) 
    (value-tuple { 
        owns: bool,
        can-write: bool,
        can-read: bool
        })) 
    (ok (map-set file-authorizations key-tuple value-tuple))
)
