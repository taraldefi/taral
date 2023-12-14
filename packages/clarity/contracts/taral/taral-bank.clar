;; Maps to keep track of data
(define-map purchase-orders
  {
    id: uint
  }
  {
    borrower-id: principal,
    lender-id: (optional principal),
    seller-id: principal,
    total-amount: uint,
    downpayment: uint,
    outstanding-amount: uint,
    is-completed: bool,
    completed-successfully: bool,
    accepted-financing-id: (optional uint),
    is-canceled: bool,
    has-active-financing: bool,
    created-at: uint,  ;; Timestamp of creation
    updated-at: uint   ;; Timestamp of last update
  }
)

(define-map po-financing ;; this will be called financing-offers
  {
    id: uint
  }
  {
    purchase-order-id: uint,
    financing-amount: uint,
    lender-id: principal,
    is-accepted: bool,
    interest-rate: uint,
    refunded: bool,
    is-rejected: bool,
    created-at: uint,  ;; Timestamp of creation
    accepted-at: uint, ;; Timestamp of acceptance
  }
)

(define-map payments
  {
    id: uint
  }
  {
    borrower-id: principal,
    purchase-order-id: uint,
    amount: uint,
    block: uint,
  }
)

;; Version string
(define-constant VERSION "0.0.5.beta")

(define-data-var contract-owner principal tx-sender)
(define-data-var protocol-interest-rate-per-annum uint u12) ;; 12% protocol interest
(define-data-var payments-default-grace-period-in-days uint u5)
(define-data-var po-due-date uint u90) ;; start payment after 90 days in case of bullet payment

(define-data-var contract-paused bool false)

;; Counter for Purchase Orders and financing offers
(define-data-var next-purchase-order-id uint u1)
(define-data-var next-payment-id uint u1)
(define-data-var next-financing-id uint u1)

;; Define a data variable for block time in seconds
(define-data-var blocks-time-in-seconds uint u600) ;; Default to 600 seconds (10 minutes)

;; Error codes
(define-constant ERR_PURCHASE_ORDER_NOT_FOUND u100)
(define-constant ERR_FINANCING_NOT_FOUND_FOR_PURCHASE_ORDER u101)
(define-constant ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT u102)
(define-constant ERR_FAILED_TO_RECORD_PAYMENTS u103)
(define-constant ERR_FAILED_TO_CHECK_MISSED_PAYMENTS u104)
(define-constant ERR_NO_LENDER_FOR_PURCHASE_ORDER u105)
(define-constant ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD u106)
(define-constant ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD u107)
(define-constant ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD u108)
(define-constant ERR_NO_MISSED_PAYMENTS u109)
(define-constant ERR_NO_LENDER_FOR_FINANCING u110)
(define-constant ERR_CANNOT_MODIFY_ACCEPTED_FINANCING u111)
(define-constant ERR_NOT_ENOUGH_FUNDS u112)
(define-constant ERR_PURCHASE_ORDER_NOT_FULLY_PAID u113)
(define-constant ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER u114)
(define-constant ERR_FINANCING_NOT_FOUND u115)
(define-constant ERR_FINANCING_ALREADY_REFUNDED u116)
(define-constant ERR_ONLY_BORROWER_CAN_ACCEPT_FINANCING u117)
(define-constant ERR_PAYMENT_LUMP_SUM_TRANSFER_FAILED u118)
(define-constant ERR_COULD_NOT_COMPLETE_PURCHASE_ORDER u119)
(define-constant ERR_MISSED_PAYMENTS u120)
(define-constant ERR_OVERPAYMENT u121)

(define-constant ERR_PO_HAS_ACTIVE_FINANCING u122)
(define-constant ERR_PURCHASE_ORDER_CANCELED u123)
(define-constant ERR_CANNOT_REJECT_ACCEPTED_FINANCING u124)
(define-constant ERR_DOWNPAYMENT_TOO_LARGE u125)
(define-constant ERR_COULD_NOT_TRANSFER_FUNDS_TO_SELLER u126)
(define-constant ERR_BORROWER_CANNOT_FINANCE_THEMSELVES u127)
(define-constant ERR_PAYMENTS_MISSED u128)
(define-constant ERR_SELLER_CANNOT_FINANCE_THEIR_PO u129)

(define-constant err-unauthorised u401)

;;TODO: parameterize how much time a block takes. 

(define-read-only (get-info)
    (ok {
        version: (get-version),
        protocol-interest-rate-per-annum: (var-get protocol-interest-rate-per-annum),
    })
)

;; Returns version of the safe contract
;; @returns string-ascii
(define-read-only (get-version) 
    VERSION
)

(define-read-only (interest-per-payment) 
  (/ (var-get protocol-interest-rate-per-annum) u4)) ;; bullet payment is 90 days


;; Function to get the current block time
(define-read-only (get-blocks-time-in-seconds)
  (var-get blocks-time-in-seconds)
)


(define-read-only (months-since-first-payment (first-year uint) (first-month uint) (current-year uint) (current-month uint))
  (-
    (+ (* (- current-year first-year) u12) current-month)
    first-month
  )
)

(define-read-only (is-po-defaulted (purchase-order-id uint))
  (match (map-get? purchase-orders { id: purchase-order-id })
    po
    (let 
        (
          (current-block-height block-height)
        )

      (let 
        (
          (accepted-financing-id (unwrap-panic (get accepted-financing-id po)))
          (financing (unwrap-panic (map-get? po-financing {id: accepted-financing-id})))
          (financing-accepted-at (get accepted-at financing))
          (grace-period-blocks (grace-period-to-block-height (var-get payments-default-grace-period-in-days)))
          (due-date-blocks (due-date-to-block-height (var-get po-due-date)))
        )

        (if (> current-block-height (+ financing-accepted-at due-date-blocks grace-period-blocks))
            (ok true)
            (ok false)
        )
      )
    )
    (err ERR_PURCHASE_ORDER_NOT_FOUND)
  )
)

(define-read-only (get-payment-details (purchase-order-id uint))
  (let ((po (unwrap-panic (map-get? purchase-orders {id: purchase-order-id})))
        (financing-id (unwrap-panic (get accepted-financing-id po))))
    (let ((financing (unwrap-panic (map-get? po-financing {id: financing-id}))))
      (ok { 
        payment-left: (get outstanding-amount po)
      })
    )
  )
)

;; Function to check if a purchase order has active financing offers
(define-read-only (has-active-financing (purchase-order-id uint))
  (let ((po (map-get? purchase-orders {id: purchase-order-id})))
    (match po
      po-data (is-eq (get has-active-financing po-data) true)
      false  ;; If purchase order not found, return false
    )
  )
)

(define-public (update-protocol-interest-rate-per-annum (new-interest-rate uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err err-unauthorised))
    (var-set protocol-interest-rate-per-annum new-interest-rate)
    (ok true)
  )
)

(define-public (update-protocol-due-date (new-due-date uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err err-unauthorised))
    (var-set po-due-date new-due-date)
    (ok true)
  )
)

(define-public (update-grace-period-in-days (new-grace-period uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err err-unauthorised))
    (var-set payments-default-grace-period-in-days new-grace-period)
    (ok true)
  )
)

(define-public (pause-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err err-unauthorised))
    (var-set contract-paused true)
    (ok true)
  )
)

(define-public (resume-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err err-unauthorised))
    (var-set contract-paused false)
    (ok true)
  )
)

;; Function to update the block time (restricted to contract owner or authorized users)
(define-public (set-blocks-time-in-seconds (new-block-time uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err err-unauthorised))
    ;; Add any required authorization checks here
    (var-set blocks-time-in-seconds new-block-time)
    (ok true)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (make-payment (purchase-order-id uint))
  (let 
    (
      (po (unwrap-panic (map-get? purchase-orders {id: purchase-order-id})))
      (financing (unwrap-panic (map-get? po-financing {id: (unwrap-panic (get accepted-financing-id po))})))
      (bullet-interest-rate (/ (/ (var-get protocol-interest-rate-per-annum) u4) u100)) ;; bullet payment is 3 months
      (interest-rate-per-payment (/ (var-get protocol-interest-rate-per-annum) u4)) ;; monthly payment)))
      (lender-id (unwrap-panic (get lender-id po)))
      (borrower-id (get borrower-id po))
    )

    ;; Calculate the current outstanding amount and monthly payment
    (let ((outstanding-amount (get outstanding-amount po))
          (interest-for-payment ( - (/ ( + (* outstanding-amount u100) (* outstanding-amount interest-rate-per-payment)) u100) outstanding-amount))          
          (total-payment-required (+ outstanding-amount interest-for-payment))
    )

        (unwrap-panic 
          (contract-call? .usda-token transfer 
                                        interest-for-payment
                                        (get borrower-id po) 
                                        (var-get contract-owner)
                                        none) 
        )

        (unwrap-panic 
          (contract-call? 
              .usda-token transfer 
                outstanding-amount
                borrower-id
                lender-id
                none
          )
        )

      (map-set payments
        {
          id: (increment-next-payment-id)
        }
        {
          borrower-id: (get borrower-id po),
          purchase-order-id: purchase-order-id,
          amount: outstanding-amount,
          block: block-height
        }
      )

        ;; Update the purchase order
      (map-set purchase-orders 
        {
          id: purchase-order-id
        }
        
        (merge po 
          {
            updated-at: block-height,
            outstanding-amount: u0
          }
        )
      )

      ;; (ok (end-purchase-order-successfully purchase-order-id))

      ;; Check if this payment completes the purchase order
      ;; If all payments are made, end the purchase order successfully
      (let ((end-purchase-order-response (end-purchase-order-successfully purchase-order-id)))

      (match end-purchase-order-response
        end-purchase-order-success
        (ok true)
        end-purchase-order-error
          ;; Nested error branch
          ;; Return type: (response bool uint) or err
        (err ERR_COULD_NOT_COMPLETE_PURCHASE_ORDER)
      )
      )
      )
    )
  )


;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; (define-public (check-purchase-order-health (purchase-order-id uint))
;;   (let ((po (unwrap! (map-get? purchase-orders {id: purchase-order-id}) (err ERR_PURCHASE_ORDER_NOT_FOUND))))
;;     (let ((first-payment-block (get first-payment-block-height po))
;;           (current-block block-height)
;;           (payment-interval-blocks u1440) ;; Example: Monthly payment interval in blocks
;;           (payments-expected (get payments-left po)))

;;       (let ((blocks-since-first-payment (- current-block first-payment-block))
;;             (expected-blocks-until-payment (* payment-interval-blocks payments-expected)))

;;         (if (>= blocks-since-first-payment expected-blocks-until-payment)
;;           (begin 
          
;;             (map-set purchase-orders
;;                         { id: purchase-order-id }
;;                         (merge po {
;;                           is-completed: true,
;;                           completed-successfully: false,
;;                           updated-at: block-height
;;                         })
;;                 )

;;                 ;; Update lender's track record.
;;                 (let ((lender-principal (unwrap! (get lender-id po) (err ERR_NO_LENDER_FOR_PURCHASE_ORDER))))
;;                     (unwrap! (contract-call? .taral-importer update-importer-track-record (get borrower-id po) false) (err ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD))
;;                     (unwrap! (contract-call? .taral-exporter update-exporter-track-record (get seller-id po) false) (err ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD))
;;                     (unwrap! (contract-call? .taral-lender update-lender-track-record lender-principal false) (err ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD))

;;                     (err ERR_MISSED_PAYMENTS)
;;                 )
;;           )
;;             ;; If the current block height exceeds the expected payment schedule
;;           (ok purchase-order-id)  ;; Indicates health, payments are up-to-date
;;         )
;;       )
;;     )
;;   )
;; )

(define-read-only (get-purchase-order-by-id (purchase-order-id uint))
    (map-get? purchase-orders {id: purchase-order-id})
)

;; Create Purchase Order
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (create-purchase-order (total-amount uint) (downpayment uint) (seller-id principal))
  (let (

    ;;check if the importer,exporter exists.
    (purchase-order-id (increment-next-purchase-order-id)))

    ;; ensure the downpayment is less than the total amount
    (asserts! (< downpayment total-amount) (err ERR_DOWNPAYMENT_TOO_LARGE))

    (if (is-ok (contract-call? .usda-token transfer downpayment tx-sender (as-contract tx-sender) none))
        (begin
          (map-set purchase-orders
            { id: purchase-order-id }
            {
              borrower-id: tx-sender,
              lender-id: none,
              seller-id: seller-id,
              total-amount: total-amount,
              downpayment: downpayment,
              outstanding-amount: (- total-amount downpayment),
              is-completed: false,
              completed-successfully: false,
              accepted-financing-id: none,
              created-at: block-height,
              updated-at: block-height,
              is-canceled: false,
              has-active-financing: false,
            }
          )

          (ok purchase-order-id)
        )
        (err ERR_NOT_ENOUGH_FUNDS)
    )
  )
)

;; Function to cancel a purchase order
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (cancel-purchase-order (purchase-order-id uint))
  (let ((po (unwrap! (map-get? purchase-orders {id: purchase-order-id}) (err ERR_PURCHASE_ORDER_NOT_FOUND))))
    (asserts! (is-eq (get has-active-financing po) false) (err ERR_PO_HAS_ACTIVE_FINANCING))
    ;; ensure only the lender can cancel their own financing offer
    (asserts! (or (is-eq tx-sender (get borrower-id po)) (is-eq tx-sender (var-get contract-owner))) (err err-unauthorised))

    (if (is-ok (as-contract (contract-call? .usda-token transfer (get downpayment po) tx-sender (get borrower-id po) none)))
        (begin
          (map-set purchase-orders
            {id: purchase-order-id}
            (merge po { 
              is-canceled: true,
              updated-at: block-height 
            }))

          (ok true)
        )
        (err ERR_NOT_ENOUGH_FUNDS)
    )
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (finance (purchase-order-id uint))
  (let 
    (
      (po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err ERR_PURCHASE_ORDER_NOT_FOUND)))
      (financing-id (increment-next-financing-id))
      (total-amount (- (get total-amount po) (get downpayment po))
    )
  )
    (asserts! (not (is-eq (get borrower-id po) tx-sender)) (err ERR_BORROWER_CANNOT_FINANCE_THEMSELVES))
    (asserts! (not (is-eq (get seller-id po) tx-sender)) (err ERR_SELLER_CANNOT_FINANCE_THEIR_PO))
    (asserts! (not (get is-canceled po)) (err ERR_PURCHASE_ORDER_CANCELED))
    (asserts! (not (get has-active-financing po)) (err ERR_PO_HAS_ACTIVE_FINANCING))

    ;; Transfer the financing offer amount from the lender to the contract
    (if (is-ok (contract-call? .usda-token transfer total-amount tx-sender (as-contract tx-sender) none))
        (begin
          (map-set po-financing 
            { id: financing-id }
            {
              purchase-order-id: purchase-order-id,
              financing-amount: total-amount,
              lender-id: tx-sender,
              is-accepted: false,
              interest-rate: (interest-per-payment),
              refunded: false,
              is-rejected: false,
              created-at: block-height,
              accepted-at: u0
            }
          )

          (map-set purchase-orders
            {id: purchase-order-id}
            (merge po { 
              updated-at: block-height,
            }))
          (ok financing-id)
        )
        (err ERR_NOT_ENOUGH_FUNDS)
    )
  )
)

;; Function to reject a financing offer
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (reject-financing (financing-id uint))
  (let 
    (
      (financing (unwrap! (map-get? po-financing {id: financing-id}) (err ERR_FINANCING_NOT_FOUND)))
  
      (lender-id (get lender-id financing))
    )

    (asserts! (not (get is-accepted financing)) (err ERR_CANNOT_REJECT_ACCEPTED_FINANCING))
    ;; this can only be done by the owner of contract or owner of the purchase order.

    (let ((po-id (get purchase-order-id financing)))
      (let ((po (unwrap! (map-get? purchase-orders {id: po-id}) (err ERR_PURCHASE_ORDER_NOT_FOUND))))
        (if (is-ok (contract-call? .usda-token transfer (get financing-amount financing) (as-contract tx-sender) lender-id none))
          (begin
            (map-set po-financing
                  {id: financing-id}
                  (merge financing { is-rejected: true }))
              (map-set purchase-orders
                      {id: po-id}
                      (merge po { has-active-financing: false }))
              (ok true)
          )
          
          (err ERR_NOT_ENOUGH_FUNDS)
        )
      )
    )
  )
)

;; Retract or update a financing offer
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (cancel-financing (financing-id uint))
  (let 
    (
      (financing (unwrap! (map-get? po-financing {id: financing-id}) (err ERR_FINANCING_NOT_FOUND)))
  
      (lender-id (get lender-id financing))
    )

    ;; ensure the financing offer cannot be canceled after it's been accepted, not even by admin
    (asserts! (not (get is-accepted financing)) (err ERR_CANNOT_REJECT_ACCEPTED_FINANCING))

    ;; ensure only the lender can cancel their own financing offer
    (asserts! (or (is-eq tx-sender lender-id) (is-eq  tx-sender (var-get contract-owner))) (err err-unauthorised))

    (refund-financing financing-id)
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-public (accept-financing (financing-id uint))
  (let ((financing (unwrap! (map-get? po-financing { id: financing-id }) (err ERR_FINANCING_NOT_FOUND)))
        (po (unwrap! (map-get? purchase-orders { id: (get purchase-order-id financing) }) (err ERR_PURCHASE_ORDER_NOT_FOUND))))
    (asserts! (is-eq tx-sender (get borrower-id po)) (err ERR_ONLY_BORROWER_CAN_ACCEPT_FINANCING))
    (asserts! (not (get is-accepted financing)) (err ERR_CANNOT_MODIFY_ACCEPTED_FINANCING))
    (asserts! (not (get is-canceled po)) (err ERR_PURCHASE_ORDER_CANCELED))
    (asserts! (not (get has-active-financing po)) (err ERR_PO_HAS_ACTIVE_FINANCING))

    ;; Update purchase order with details from the accepted financing
    (if (is-ok (as-contract (contract-call? .usda-token transfer (get financing-amount financing) tx-sender (get seller-id po) none)))
        (begin
          (if (is-ok (as-contract (contract-call? .usda-token transfer (get downpayment po) tx-sender (get seller-id po) none)))
            (begin
              (map-set purchase-orders
                { id: (get purchase-order-id financing) }
                
                (merge po {
                  outstanding-amount: (- (get total-amount po) (get downpayment po)),
                  accepted-financing-id: (some financing-id),
                  has-active-financing: true,
                  updated-at: block-height,
                  lender-id: (some (get lender-id financing))
                })
              )

              ;; Mark financing as accepted
              (map-set po-financing 
                { id: financing-id } 
                (merge financing { 
                  is-accepted: true,
                  accepted-at: block-height
                })
              )

              (ok financing-id)
            )
            (err ERR_COULD_NOT_TRANSFER_FUNDS_TO_SELLER)
          )
        )
      (err ERR_COULD_NOT_TRANSFER_FUNDS_TO_SELLER)
    )
  )
)

;; Refund a financing offer
;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-private (refund-financing (financing-id uint))
    (let ((financing (unwrap-panic (map-get? po-financing { id: financing-id })))
    (lender-id (get lender-id financing))
    
    )
      (if (not (get refunded financing))
        (begin
          
          (try! (as-contract (contract-call? 
                  .usda-token transfer 
                  (get financing-amount financing) 
                  contract-caller 
                  lender-id 
                  none))
          )
        
          ;; Mark finance offer as refunded
          (map-set po-financing 
            { id: financing-id } 
            (merge financing { refunded: true })
          )

          (ok true)
        )
        
        (err ERR_FINANCING_ALREADY_REFUNDED)
      )
    )
  )

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
(define-private (end-purchase-order-successfully (purchase-order-id uint))
  (let (
        (po (unwrap! (map-get? purchase-orders { id: purchase-order-id }) (err ERR_PURCHASE_ORDER_NOT_FOUND)))
        (lender-id (unwrap! (get lender-id po) (err ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER)))
        (borrower-id (get borrower-id po))
        (seller-id (get seller-id po))
    )

    ;; Verify that the outstanding amount is fully paid
    (asserts! (<= (get outstanding-amount po) u0) (err ERR_PURCHASE_ORDER_NOT_FULLY_PAID))

    (unwrap! (contract-call? .taral-importer update-importer-track-record borrower-id true) (err ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD))
    (unwrap! (contract-call? .taral-exporter update-exporter-track-record seller-id true) (err ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD))
    (unwrap! (contract-call? .taral-lender update-lender-track-record lender-id true) (err ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD))

    ;; Mark purchase order as completed successfully
    (map-set purchase-orders
      { id: purchase-order-id }
      (merge po { 
        is-completed: true, 
        completed-successfully: true
      })
    )

    (ok true)
  )
)

(define-private (min (a uint) (b uint))
    (if (<= a b)
        a
        b
    )
)

(define-private (max (a uint) (b uint))
    (if (>= a b)
        a
        b
    )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; Implements a safe way to provide a valid ID for a purchase order
(define-private (increment-next-purchase-order-id)
  (let ((current-id (var-get next-purchase-order-id)))
    (var-set next-purchase-order-id (+ current-id u1))
    current-id
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; Implements a safe way to provide a valid ID for a payment
(define-private (increment-next-payment-id)
  (let ((current-id (var-get next-payment-id)))
    (var-set next-payment-id (+ current-id u1))
    current-id
  )
)

;; #[allow(unchecked_params)]
;; #[allow(unchecked_data)]
;; Implements a safe way to provide a valid ID for a financing offer
(define-private (increment-next-financing-id)
  (let ((current-id (var-get next-financing-id)))
    (var-set next-financing-id (+ current-id u1))
    current-id
  )
)

(define-private (calculate-blocks-per-month)
  (let ((block-time-seconds (var-get blocks-time-in-seconds)))
    ;; Calculate blocks per day: 86400 seconds per day / block time in seconds
    (let ((blocks-per-day (/ u86400 block-time-seconds)))

      ;; Assuming an average month length of 30 days
      (* blocks-per-day u30) ;; Blocks per day * 30 days
    )
  )
)

(define-private (due-date-to-block-height (due-date uint))
  (let ((block-time-seconds (var-get blocks-time-in-seconds)))
    ;; Calculate blocks per day: 86400 seconds per day / block time in seconds
    (let ((blocks-per-day (/ u86400 block-time-seconds)))

      (* blocks-per-day due-date) ;; Blocks per day * due-date
    )
  )
)

(define-private (grace-period-to-block-height (grace-period uint))
  (let ((block-time-seconds (var-get blocks-time-in-seconds)))
    ;; Calculate blocks per day: 86400 seconds per day / block time in seconds
    (let ((blocks-per-day (/ u86400 block-time-seconds)))

      ;; Assuming an average month length of 30 days
      (* blocks-per-day grace-period) ;; Blocks per day * grace-period
    )
  )
)

