--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: Auctions_status_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Auctions_status_enum" AS ENUM (
    'FINALIZED',
    'OPEN',
    'CLOSED',
    'CANCELLED'
);


ALTER TYPE public."Auctions_status_enum" OWNER TO root;

--
-- Name: CollaborationRelationships_paymentexperiencehistory_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."CollaborationRelationships_paymentexperiencehistory_enum" AS ENUM (
    'ON_TIME',
    'DELAYS'
);


ALTER TYPE public."CollaborationRelationships_paymentexperiencehistory_enum" OWNER TO root;

--
-- Name: Collaterals_facilitytype_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Collaterals_facilitytype_enum" AS ENUM (
    'IMPORTER_FINANCING',
    'EXPORTER_FINANCING'
);


ALTER TYPE public."Collaterals_facilitytype_enum" OWNER TO root;

--
-- Name: PaymentTerms_paymenttype_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."PaymentTerms_paymenttype_enum" AS ENUM (
    'SHORT',
    'MEDIUM',
    'SHORT_MEDIUM'
);


ALTER TYPE public."PaymentTerms_paymenttype_enum" OWNER TO root;

--
-- Name: QuickApplications_paymentmethod_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."QuickApplications_paymentmethod_enum" AS ENUM (
    'CREDIT_CARD',
    'CRYPTO'
);


ALTER TYPE public."QuickApplications_paymentmethod_enum" OWNER TO root;

--
-- Name: QuickApplications_status_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."QuickApplications_status_enum" AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'ON_REVIEW',
    'APPROVED'
);


ALTER TYPE public."QuickApplications_status_enum" OWNER TO root;

--
-- Name: Sectors_status_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Sectors_status_enum" AS ENUM (
    'unknown',
    'subsidiary',
    'independent'
);


ALTER TYPE public."Sectors_status_enum" OWNER TO root;

--
-- Name: Sectors_type_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Sectors_type_enum" AS ENUM (
    'unknown',
    'public',
    'private'
);


ALTER TYPE public."Sectors_type_enum" OWNER TO root;

--
-- Name: auctions_history_status_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.auctions_history_status_enum AS ENUM (
    'FINALIZED',
    'OPEN',
    'CLOSED',
    'CANCELLED'
);


ALTER TYPE public.auctions_history_status_enum OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Auctions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Auctions" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    hash character(64) NOT NULL,
    "auctionId" integer NOT NULL,
    "endBlock" character varying NOT NULL,
    "highestBid" character varying,
    maker character varying NOT NULL,
    "nftAsset" character varying NOT NULL,
    "highestBidder" character varying,
    status public."Auctions_status_enum" DEFAULT 'OPEN'::public."Auctions_status_enum" NOT NULL
);


ALTER TABLE public."Auctions" OWNER TO root;

--
-- Name: Auctions_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Auctions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Auctions_id_seq" OWNER TO root;

--
-- Name: Auctions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Auctions_id_seq" OWNED BY public."Auctions".id;


--
-- Name: Bids; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Bids" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    hash character(64) NOT NULL,
    amount numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    bidder character varying NOT NULL,
    "auctionId" integer
);


ALTER TABLE public."Bids" OWNER TO root;

--
-- Name: Bids_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Bids_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Bids_id_seq" OWNER TO root;

--
-- Name: Bids_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Bids_id_seq" OWNED BY public."Bids".id;


--
-- Name: BuyerCompanies; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."BuyerCompanies" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    "registrationNumber" character varying NOT NULL,
    "beneficialOwner" character varying NOT NULL,
    abbreviation character varying NOT NULL,
    nationality character varying NOT NULL,
    headquarters character varying NOT NULL,
    "industryType" character varying NOT NULL,
    "coreBusiness" character varying NOT NULL,
    "incorporationDate" timestamp with time zone NOT NULL,
    "legalForm" character varying NOT NULL,
    logo character varying,
    "sectorId" uuid,
    "companyInformationId" uuid,
    "userId" integer NOT NULL,
    email character varying,
    "stripeId" character varying
);


ALTER TABLE public."BuyerCompanies" OWNER TO root;

--
-- Name: BuyerCompanyTaxAndRevenue; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."BuyerCompanyTaxAndRevenue" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "taxNumber" integer,
    "lastFiscalYear" integer NOT NULL,
    "totalRevenue" character varying NOT NULL,
    "exportValue" integer,
    audited boolean,
    "exportRevenuePercentage" numeric(10,2) DEFAULT '0'::numeric,
    "buyerCompanyId" uuid
);


ALTER TABLE public."BuyerCompanyTaxAndRevenue" OWNER TO root;

--
-- Name: CollaborationRelationships; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."CollaborationRelationships" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "shareHoldingRelationship" character varying,
    influence character varying,
    "supplierId" uuid,
    "buyerId" uuid,
    "paymentExperienceDescription" character varying,
    "paymentExperienceLength" character varying,
    "paymentExperienceNoofdeals" integer,
    "paymentExperienceAvgbusinessvol" character varying,
    "paymentExperienceHistory" public."CollaborationRelationships_paymentexperiencehistory_enum",
    "paymentExperienceDelays" character varying
);


ALTER TABLE public."CollaborationRelationships" OWNER TO root;

--
-- Name: Collaterals; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Collaterals" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "facilityType" public."Collaterals_facilitytype_enum" NOT NULL,
    "financingRatio" numeric(2,2) DEFAULT '0'::numeric NOT NULL,
    "facilityAmount" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "requestedTenure" timestamp with time zone NOT NULL,
    "requestedPurpose" character varying NOT NULL,
    "repaymentSource" character varying NOT NULL,
    "collateralProviderInfluence" character varying,
    "collateralProviderExperience" character varying
);


ALTER TABLE public."Collaterals" OWNER TO root;

--
-- Name: CompanyAddresses; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."CompanyAddresses" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    city character varying NOT NULL,
    "addressLine1" character varying NOT NULL,
    "addressLine2" character varying NOT NULL,
    "postalCode" character varying NOT NULL
);


ALTER TABLE public."CompanyAddresses" OWNER TO root;

--
-- Name: CompanyInformation; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."CompanyInformation" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "employeeCount" integer,
    type character varying NOT NULL,
    "addressId" uuid
);


ALTER TABLE public."CompanyInformation" OWNER TO root;

--
-- Name: Contracts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Contracts" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    conoclusion timestamp with time zone NOT NULL,
    "isSigned" boolean NOT NULL
);


ALTER TABLE public."Contracts" OWNER TO root;

--
-- Name: ExternalRatings; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."ExternalRatings" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    rating numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "agencyName" character varying NOT NULL,
    "issuanceDate" timestamp with time zone NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public."ExternalRatings" OWNER TO root;

--
-- Name: FinancialInformations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."FinancialInformations" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    turnover numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "balanceSheetTotal" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public."FinancialInformations" OWNER TO root;

--
-- Name: PaymentTerms; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."PaymentTerms" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "isConcluded" boolean DEFAULT false NOT NULL,
    "partialRefinancing" boolean DEFAULT false NOT NULL,
    "interestCurrency" character varying,
    "interestPercentage" numeric(10,2) DEFAULT '0'::numeric,
    "interestFixedRate" numeric(10,2) DEFAULT '0'::numeric,
    "interestDegressiveRate" numeric(10,2) DEFAULT '0'::numeric,
    "paymentType" public."PaymentTerms_paymenttype_enum" NOT NULL,
    "downpaymentCurrency" character varying NOT NULL,
    "downpaymentAmount" character varying NOT NULL,
    "downpaymentDescription" character varying NOT NULL,
    "balanceCurrency" character varying NOT NULL,
    "balanceAmount" character varying NOT NULL,
    "balancePaymentDeadline" character varying NOT NULL,
    "paymentVehicleDescription" character varying NOT NULL,
    "paymentDuration" character varying NOT NULL
);


ALTER TABLE public."PaymentTerms" OWNER TO root;

--
-- Name: QuickApplications; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."QuickApplications" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "applicationNumber" character varying NOT NULL,
    title character varying NOT NULL,
    "exporterName" character varying NOT NULL,
    "issuanceDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    status public."QuickApplications_status_enum" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    type character varying NOT NULL,
    "buyerInformationId" uuid,
    "supplierInformationId" uuid,
    "paymentTermsId" uuid,
    "orderDetailsId" uuid,
    "securityId" uuid,
    "transactionDocumentsId" uuid,
    "companyId" uuid,
    "onchainPrincipal" character varying,
    "sellerPrincipal" character varying,
    "purchaseOrderId" character varying,
    "paymentMethod" public."QuickApplications_paymentmethod_enum"
);


ALTER TABLE public."QuickApplications" OWNER TO root;

--
-- Name: Sectors; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Sectors" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "industryType" character varying NOT NULL,
    type public."Sectors_type_enum" DEFAULT 'unknown'::public."Sectors_type_enum" NOT NULL,
    status public."Sectors_status_enum" DEFAULT 'unknown'::public."Sectors_status_enum" NOT NULL
);


ALTER TABLE public."Sectors" OWNER TO root;

--
-- Name: Services; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Services" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "capitalGoods" boolean NOT NULL,
    service character varying NOT NULL,
    "serviceDescription" character varying NOT NULL
);


ALTER TABLE public."Services" OWNER TO root;

--
-- Name: SupplierCompanies; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SupplierCompanies" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    "registrationNumber" character varying NOT NULL,
    "beneficialOwner" character varying NOT NULL,
    abbreviation character varying NOT NULL,
    nationality character varying NOT NULL,
    headquarters character varying NOT NULL,
    "industryType" character varying NOT NULL,
    "coreBusiness" character varying NOT NULL,
    "incorporationDate" timestamp with time zone NOT NULL,
    "legalForm" character varying NOT NULL,
    logo character varying,
    "financialsId" uuid,
    "ratingId" uuid,
    "companyInformationId" uuid,
    "onchainPrincipal" character varying,
    email character varying,
    "stripeId" character varying
);


ALTER TABLE public."SupplierCompanies" OWNER TO root;

--
-- Name: SupplierCompanyTaxAndRevenue; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SupplierCompanyTaxAndRevenue" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "taxNumber" integer,
    "lastFiscalYear" integer NOT NULL,
    "totalRevenue" character varying NOT NULL,
    "exportValue" integer,
    audited boolean,
    "exportRevenuePercentage" numeric(10,2) DEFAULT '0'::numeric,
    "supplierCompanyId" uuid
);


ALTER TABLE public."SupplierCompanyTaxAndRevenue" OWNER TO root;

--
-- Name: TransactionDocuments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TransactionDocuments" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "confirmationDocument" boolean,
    "additionalDocument" boolean
);


ALTER TABLE public."TransactionDocuments" OWNER TO root;

--
-- Name: Transactions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Transactions" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "goodsAndServicesId" uuid,
    "contractId" uuid
);


ALTER TABLE public."Transactions" OWNER TO root;

--
-- Name: auction_bids_history; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.auction_bids_history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    action character varying NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    changes json DEFAULT '{}'::json NOT NULL,
    hash character(64) NOT NULL,
    "auctionId" integer NOT NULL,
    amount numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    bidder character varying NOT NULL,
    CONSTRAINT "CHK_6c4e750761fe8516e09a77b04e" CHECK (((action)::text = ANY ((ARRAY['insert'::character varying, 'update'::character varying, 'delete'::character varying])::text[])))
);


ALTER TABLE public.auction_bids_history OWNER TO root;

--
-- Name: auctions_history; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.auctions_history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    action character varying NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    changes json DEFAULT '{}'::json NOT NULL,
    hash character(64) NOT NULL,
    "auctionId" integer NOT NULL,
    "endBlock" character varying NOT NULL,
    "highestBid" character varying,
    maker character varying NOT NULL,
    "nftAsset" character varying NOT NULL,
    "highestBidder" character varying,
    status public.auctions_history_status_enum DEFAULT 'OPEN'::public.auctions_history_status_enum NOT NULL,
    CONSTRAINT "CHK_058da0f8f89bebc2b50711eb2c" CHECK (((action)::text = ANY ((ARRAY['insert'::character varying, 'update'::character varying, 'delete'::character varying])::text[])))
);


ALTER TABLE public.auctions_history OWNER TO root;

--
-- Name: email_templates; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.email_templates (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    sender character varying NOT NULL,
    subject character varying NOT NULL,
    body character varying NOT NULL,
    "isDefault" boolean NOT NULL
);


ALTER TABLE public.email_templates OWNER TO root;

--
-- Name: email_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.email_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.email_templates_id_seq OWNER TO root;

--
-- Name: email_templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.email_templates_id_seq OWNED BY public.email_templates.id;


--
-- Name: file; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.file (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    original_name character varying NOT NULL,
    created timestamp with time zone NOT NULL,
    last_updated timestamp with time zone NOT NULL
);


ALTER TABLE public.file OWNER TO root;

--
-- Name: file_participants; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.file_participants (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    wallet character varying NOT NULL,
    "publicKey" character varying NOT NULL,
    created timestamp with time zone NOT NULL
);


ALTER TABLE public.file_participants OWNER TO root;

--
-- Name: file_participants_files_file; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.file_participants_files_file (
    "fileParticipantsId" uuid NOT NULL,
    "fileId" uuid NOT NULL
);


ALTER TABLE public.file_participants_files_file OWNER TO root;

--
-- Name: file_versions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.file_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    hash character varying NOT NULL,
    path character varying NOT NULL,
    created timestamp with time zone NOT NULL,
    on_disk_name character varying NOT NULL,
    "fileId" uuid
);


ALTER TABLE public.file_versions OWNER TO root;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: orderDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."orderDetails" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "importPort" character varying NOT NULL,
    "exportPort" character varying NOT NULL
);


ALTER TABLE public."orderDetails" OWNER TO root;

--
-- Name: orderProducts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."orderProducts" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    quantity integer NOT NULL,
    "unitPrice" integer NOT NULL,
    "orderId" uuid
);


ALTER TABLE public."orderProducts" OWNER TO root;

--
-- Name: permission; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    resource character varying(100) NOT NULL,
    description character varying NOT NULL,
    path character varying NOT NULL,
    method character varying(20) DEFAULT 'get'::character varying NOT NULL,
    "isDefault" boolean NOT NULL
);


ALTER TABLE public.permission OWNER TO root;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO root;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: refresh_token; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.refresh_token (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    ip character varying NOT NULL,
    "userAgent" character varying NOT NULL,
    browser character varying,
    os character varying,
    "isRevoked" boolean NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public.refresh_token OWNER TO root;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.refresh_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.refresh_token_id_seq OWNER TO root;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.refresh_token_id_seq OWNED BY public.refresh_token.id;


--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.role_permission (
    "roleId" integer NOT NULL,
    "permissionId" integer NOT NULL
);


ALTER TABLE public.role_permission OWNER TO root;

--
-- Name: rolea; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.rolea (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.rolea OWNER TO root;

--
-- Name: rolea_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.rolea_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rolea_id_seq OWNER TO root;

--
-- Name: rolea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.rolea_id_seq OWNED BY public.rolea.id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.status OWNER TO root;

--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO root;

--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    address character varying,
    contact character varying,
    avatar character varying,
    status character varying NOT NULL,
    token character varying,
    "tokenValidityDate" timestamp without time zone DEFAULT now() NOT NULL,
    salt character varying NOT NULL,
    "twoFASecret" character varying,
    "twoFAThrottleTime" timestamp without time zone DEFAULT now() NOT NULL,
    "isTwoFAEnabled" boolean DEFAULT false NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public.users OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: Auctions id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Auctions" ALTER COLUMN id SET DEFAULT nextval('public."Auctions_id_seq"'::regclass);


--
-- Name: Bids id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Bids" ALTER COLUMN id SET DEFAULT nextval('public."Bids_id_seq"'::regclass);


--
-- Name: email_templates id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.email_templates ALTER COLUMN id SET DEFAULT nextval('public.email_templates_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: refresh_token id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.refresh_token ALTER COLUMN id SET DEFAULT nextval('public.refresh_token_id_seq'::regclass);


--
-- Name: rolea id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.rolea ALTER COLUMN id SET DEFAULT nextval('public.rolea_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: Auctions; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Auctions" (id, "createdAt", "updatedAt", hash, "auctionId", "endBlock", "highestBid", maker, "nftAsset", "highestBidder", status) FROM stdin;
\.


--
-- Data for Name: Bids; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Bids" (id, "createdAt", "updatedAt", hash, amount, bidder, "auctionId") FROM stdin;
\.


--
-- Data for Name: BuyerCompanies; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."BuyerCompanies" (id, name, "phoneNumber", "registrationNumber", "beneficialOwner", abbreviation, nationality, headquarters, "industryType", "coreBusiness", "incorporationDate", "legalForm", logo, "sectorId", "companyInformationId", "userId", email, "stripeId") FROM stdin;
fa2488bc-8ed5-4a81-b865-0fb04a0be70b	Doru	+40752295952	DRU123456	DoruC	Inc	Romania	Cluj-Napoca	Fintech	Insurance Carriers and Related Activities	2001-12-12 00:00:00+00	sole proprietorship	fa2bcbe7-85da-4d5d-af18-540663a2ccf3	\N	\N	170	cioclea.doru@gmail.com	cus_PnC31q5rlAhAx4
\.


--
-- Data for Name: BuyerCompanyTaxAndRevenue; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."BuyerCompanyTaxAndRevenue" (id, "taxNumber", "lastFiscalYear", "totalRevenue", "exportValue", audited, "exportRevenuePercentage", "buyerCompanyId") FROM stdin;
f19925ab-7c34-41a8-9b4c-15ad939eb706	\N	2023	10000000	\N	\N	0.00	fa2488bc-8ed5-4a81-b865-0fb04a0be70b
\.


--
-- Data for Name: CollaborationRelationships; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."CollaborationRelationships" (id, "shareHoldingRelationship", influence, "supplierId", "buyerId", "paymentExperienceDescription", "paymentExperienceLength", "paymentExperienceNoofdeals", "paymentExperienceAvgbusinessvol", "paymentExperienceHistory", "paymentExperienceDelays") FROM stdin;
\.


--
-- Data for Name: Collaterals; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Collaterals" (id, "facilityType", "financingRatio", "facilityAmount", "requestedTenure", "requestedPurpose", "repaymentSource", "collateralProviderInfluence", "collateralProviderExperience") FROM stdin;
\.


--
-- Data for Name: CompanyAddresses; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."CompanyAddresses" (id, city, "addressLine1", "addressLine2", "postalCode") FROM stdin;
\.


--
-- Data for Name: CompanyInformation; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."CompanyInformation" (id, "employeeCount", type, "addressId") FROM stdin;
\.


--
-- Data for Name: Contracts; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Contracts" (id, conoclusion, "isSigned") FROM stdin;
\.


--
-- Data for Name: ExternalRatings; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."ExternalRatings" (id, rating, "agencyName", "issuanceDate", type) FROM stdin;
\.


--
-- Data for Name: FinancialInformations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."FinancialInformations" (id, turnover, "balanceSheetTotal", type) FROM stdin;
\.


--
-- Data for Name: PaymentTerms; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."PaymentTerms" (id, "isConcluded", "partialRefinancing", "interestCurrency", "interestPercentage", "interestFixedRate", "interestDegressiveRate", "paymentType", "downpaymentCurrency", "downpaymentAmount", "downpaymentDescription", "balanceCurrency", "balanceAmount", "balancePaymentDeadline", "paymentVehicleDescription", "paymentDuration") FROM stdin;
\.


--
-- Data for Name: QuickApplications; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."QuickApplications" (id, "applicationNumber", title, "exporterName", "issuanceDate", "endDate", status, "createdAt", type, "buyerInformationId", "supplierInformationId", "paymentTermsId", "orderDetailsId", "securityId", "transactionDocumentsId", "companyId", "onchainPrincipal", "sellerPrincipal", "purchaseOrderId", "paymentMethod") FROM stdin;
\.


--
-- Data for Name: Sectors; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Sectors" (id, "industryType", type, status) FROM stdin;
\.


--
-- Data for Name: Services; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Services" (id, "capitalGoods", service, "serviceDescription") FROM stdin;
\.


--
-- Data for Name: SupplierCompanies; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SupplierCompanies" (id, name, "phoneNumber", "registrationNumber", "beneficialOwner", abbreviation, nationality, headquarters, "industryType", "coreBusiness", "incorporationDate", "legalForm", logo, "financialsId", "ratingId", "companyInformationId", "onchainPrincipal", email, "stripeId") FROM stdin;
\.


--
-- Data for Name: SupplierCompanyTaxAndRevenue; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SupplierCompanyTaxAndRevenue" (id, "taxNumber", "lastFiscalYear", "totalRevenue", "exportValue", audited, "exportRevenuePercentage", "supplierCompanyId") FROM stdin;
\.


--
-- Data for Name: TransactionDocuments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."TransactionDocuments" (id, "confirmationDocument", "additionalDocument") FROM stdin;
\.


--
-- Data for Name: Transactions; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Transactions" (id, "goodsAndServicesId", "contractId") FROM stdin;
\.


--
-- Data for Name: auction_bids_history; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.auction_bids_history (id, action, "createdAt", "updatedAt", changes, hash, "auctionId", amount, bidder) FROM stdin;
\.


--
-- Data for Name: auctions_history; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.auctions_history (id, action, "createdAt", "updatedAt", changes, hash, "auctionId", "endBlock", "highestBid", maker, "nftAsset", "highestBidder", status) FROM stdin;
\.


--
-- Data for Name: email_templates; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.email_templates (id, "createdAt", "updatedAt", title, slug, sender, subject, body, "isDefault") FROM stdin;
1	2024-03-23 10:57:49.425	2024-03-23 10:57:49.425	Activate Account	activate-account	noreply@taral.com	Activate Account	<p>Hi {{username}},</p><p>A new account has been created using your email . Click below button to activate your account.</p><p>{{link}}</p><p>If you haven't requested the code please ignore the email.</p><p>Thank you!.</p>	t
2	2024-03-23 10:57:49.425	2024-03-23 10:57:49.425	Two Factor Authentication	two-factor-authentication	noreply@taral.com	Activate Two Factor Authentication	<p>Hi {{username}},</p><p>This mail is sent because you requested to enable two factor authentication. To configure authentication via TOTP on multiple devices, during setup, scan the QR code using each device at the same time.</p><p><img src='{{qrcode}}' id='qr-code-otp' alt='QR code OTP'></p><p style='text-align:start'>A time-based one-time password (TOTP) application automatically generates an authentication code that changes after a certain period of time. We recommend using cloud-based TOTP apps such as:</p><ul><li><a href='https://support.1password.com/one-time-passwords/' target='_self'>1Password</a></li><li><a href='https://authy.com/guides/github/' target='_self'>Authy</a></li><li><a href='https://lastpass.com/auth/' target='_self'>LastPass Authenticator</a></li><li><a href='https://www.microsoft.com/en-us/account/authenticator/' target='_self'>Microsoft Authenticator</a></li><li><a href='https://docs.keeper.io/enterprise-guide/storing-two-factor-codes' target='_self'>Keeper</a></li></ul><p>If you haven't requested the code please ignore the email.</p><p>Thank you!.</p>	t
3	2024-03-23 10:57:49.425	2024-03-23 10:57:49.425	Reset Password	reset-password	noreply@taral.com	Reset Password	<p>Hi {{username}},</p><p>You have requested to reset a password. Please use following link to complete the action. Please note this link is only valid for the next hour.</p><p>{{link}}</p><p>If you haven't requested the code please ignore the email.</p><p>Thank you!.</p>	t
4	2024-03-23 10:57:49.425	2024-03-23 10:57:49.425	New User Set Password	new-user-set-password	noreply@taral.com	Set Password	<p>Hi {{username}},</p><p>A new account has been created using your email. Please use following link to set password for your account. Please note this link is only valid for the next hour.</p><p>{{link}}</p><p>If you haven't requested the code please ignore the email.</p><p>Thank you!.</p>	t
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.file (id, original_name, created, last_updated) FROM stdin;
\.


--
-- Data for Name: file_participants; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.file_participants (id, wallet, "publicKey", created) FROM stdin;
\.


--
-- Data for Name: file_participants_files_file; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.file_participants_files_file ("fileParticipantsId", "fileId") FROM stdin;
\.


--
-- Data for Name: file_versions; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.file_versions (id, hash, path, created, on_disk_name, "fileId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1702907482770	InitialMigration1702907482770
2	1702969996077	UserBuyerEntities1702969996077
3	1703154893679	applicationChanges1703154893679
4	1705309324172	applicationTableUpdate1705309324172
5	1708614424649	applicationUpdate1708614424649
6	1708845448020	companyInformationChanges1708845448020
7	1708878286294	companyTableChanges1708878286294
\.


--
-- Data for Name: orderDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."orderDetails" (id, "importPort", "exportPort") FROM stdin;
\.


--
-- Data for Name: orderProducts; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."orderProducts" (id, name, quantity, "unitPrice", "orderId") FROM stdin;
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.permission (id, "createdAt", "updatedAt", resource, description, path, method, "isDefault") FROM stdin;
1	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	user	View all user	/users	get	f
2	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	user	Store new user	/users	post	f
3	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	user	Update user by id	/users/:id	put	f
4	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	user	Get user by id	/users/:id	get	f
5	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	role	View all role	/roles	get	f
6	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	role	View role by id	/roles/:id	get	f
7	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	role	Store new role	/roles	post	f
8	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	role	Update role by id	/roles/:id	put	f
9	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	role	Delete role by id	/roles/:id	delete	f
10	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	permission	View all permission	/permissions	get	f
11	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	permission	Sync permission from config	/permissions/sync	post	f
12	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	permission	View permission by id	/permissions/:id	get	f
13	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	permission	Store new permission	/permissions	post	f
14	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	permission	Update permission by id	/permissions/:id	put	f
15	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	permission	Delete permission by id	/permissions/:id	delete	f
16	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	emailTemplates	View all email templates	/email-templates	get	f
17	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	emailTemplates	View email templates by id	/email-templates/:id	get	f
18	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	emailTemplates	Store new email templates	/email-templates	post	f
19	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	emailTemplates	Update email templates by id	/email-templates/:id	put	f
20	2024-03-23 10:57:49.469	2024-03-23 10:57:49.469	emailTemplates	Delete email templates by id	/email-templates/:id	delete	f
\.


--
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.refresh_token (id, "userId", ip, "userAgent", browser, os, "isRevoked", expires) FROM stdin;
1	170	::ffff:172.28.0.9	{"ua":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36","browser":{"name":"Chrome","version":"122.0.0.0","major":"122"},"engine":{"name":"Blink","version":"122.0.0.0"},"os":{"name":"Windows","version":"10"},"device":{},"cpu":{"architecture":"amd64"}}	Chrome	Windows	f	2024-03-30 20:58:52.017
\.


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.role_permission ("roleId", "permissionId") FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	8
1	9
1	10
1	11
1	12
1	13
1	14
1	15
1	16
1	17
1	18
1	19
1	20
\.


--
-- Data for Name: rolea; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.rolea (id, "createdAt", "updatedAt", name, description) FROM stdin;
1	2024-03-23 10:57:49.483	2024-03-23 10:57:49.483	superuser	superuser of the system
2	2024-03-23 10:57:49.483	2024-03-23 10:57:49.483	normal	normal user of the system
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.status (id, name) FROM stdin;
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (id, "createdAt", "updatedAt", username, email, password, name, address, contact, avatar, status, token, "tokenValidityDate", salt, "twoFASecret", "twoFAThrottleTime", "isTwoFAEnabled", "roleId") FROM stdin;
1	2024-03-23 10:57:49.564	2024-03-23 10:57:49.564	admin	admin@taral.com	$2b$10$O9BWip02GuE14bDPfBomQebCjwKQyuUfkulhvBB1UoizOeKxGG8Fu	taral-admin	\N	\N	\N	active	\N	2024-03-23 10:57:49.564464	$2b$10$O9BWip02GuE14bDPfBomQe	\N	2024-03-23 10:57:49.564464	f	1
137	2024-03-23 20:52:37.289	2024-03-23 20:52:37.289	doru12344	7s81x3s7rh@lettershield.com	$2b$10$qkt5zVQs2qAID3JZndbDxeNfY3eOjlhMR1JlhWYDPXlRrJtQ8dGem	Doru	\N	\N	\N	inactive	Isg4T9AYowbT	2024-03-23 21:52:37.283	$2b$10$qkt5zVQs2qAID3JZndbDxe	\N	2024-03-23 20:52:37.289007	f	2
170	2024-03-23 20:57:20.654	2024-03-23 20:58:28.296	doruc123	ki8jd9znr6@lettershield.com	$2b$10$XzUJ8yUP71jyj3PkU1ZMUuuBcg9ENHCb5sGn.1Jinz9Ros07dzP5G	Doru	\N	\N	\N	active	dvf0Ei	2024-03-23 21:57:20.65	$2b$10$XzUJ8yUP71jyj3PkU1ZMUu	\N	2024-03-23 20:57:20.654253	f	2
\.


--
-- Name: Auctions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Auctions_id_seq"', 1, false);


--
-- Name: Bids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Bids_id_seq"', 1, false);


--
-- Name: email_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.email_templates_id_seq', 181, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.migrations_id_seq', 7, true);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.permission_id_seq', 245, true);


--
-- Name: refresh_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.refresh_token_id_seq', 1, true);


--
-- Name: rolea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.rolea_id_seq', 173, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 170, true);


--
-- Name: file_participants_files_file PK_025fe43f19a4e1862c8f4112e2c; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file_participants_files_file
    ADD CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c" PRIMARY KEY ("fileParticipantsId", "fileId");


--
-- Name: CompanyAddresses PK_0313dfd6528659ba1917a92d5d8; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CompanyAddresses"
    ADD CONSTRAINT "PK_0313dfd6528659ba1917a92d5d8" PRIMARY KEY (id);


--
-- Name: email_templates PK_06c564c515d8cdb40b6f3bfbbb4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.email_templates
    ADD CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY (id);


--
-- Name: orderDetails PK_11d407f307ebf19af9702464e22; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."orderDetails"
    ADD CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY (id);


--
-- Name: FinancialInformations PK_1bcb62b7d7160ecbeb13ccca57d; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."FinancialInformations"
    ADD CONSTRAINT "PK_1bcb62b7d7160ecbeb13ccca57d" PRIMARY KEY (id);


--
-- Name: auctions_history PK_1d0cde049207d87cc40487680fb; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.auctions_history
    ADD CONSTRAINT "PK_1d0cde049207d87cc40487680fb" PRIMARY KEY (id);


--
-- Name: BuyerCompanyTaxAndRevenue PK_2e252b0e1ad71a795505287b195; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanyTaxAndRevenue"
    ADD CONSTRAINT "PK_2e252b0e1ad71a795505287b195" PRIMARY KEY (id);


--
-- Name: SupplierCompanies PK_2e491cc0ac8484134538ad7eef9; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "PK_2e491cc0ac8484134538ad7eef9" PRIMARY KEY (id);


--
-- Name: file PK_36b46d232307066b3a2c9ea3a1d; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id);


--
-- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


--
-- Name: Contracts PK_4f88addbb8b532d6e46459c8755; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Contracts"
    ADD CONSTRAINT "PK_4f88addbb8b532d6e46459c8755" PRIMARY KEY (id);


--
-- Name: SupplierCompanyTaxAndRevenue PK_63b4af95edad8d2228401f11c21; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanyTaxAndRevenue"
    ADD CONSTRAINT "PK_63b4af95edad8d2228401f11c21" PRIMARY KEY (id);


--
-- Name: CompanyInformation PK_66bb02343b9cdb0a0729de4138d; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CompanyInformation"
    ADD CONSTRAINT "PK_66bb02343b9cdb0a0729de4138d" PRIMARY KEY (id);


--
-- Name: QuickApplications PK_6f485ac97e0f3240b34a2054726; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "PK_6f485ac97e0f3240b34a2054726" PRIMARY KEY (id);


--
-- Name: Collaterals PK_76a2cc571bfa3f4926c61200af2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Collaterals"
    ADD CONSTRAINT "PK_76a2cc571bfa3f4926c61200af2" PRIMARY KEY (id);


--
-- Name: Transactions PK_7761bf9766670b894ff2fdb3700; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY (id);


--
-- Name: BuyerCompanies PK_788566f542e6013706e371f236f; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanies"
    ADD CONSTRAINT "PK_788566f542e6013706e371f236f" PRIMARY KEY (id);


--
-- Name: Services PK_811d1dc4e17047c8aee4454b968; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "PK_811d1dc4e17047c8aee4454b968" PRIMARY KEY (id);


--
-- Name: TransactionDocuments PK_8488f8e87bde7dacf065cec4cbb; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TransactionDocuments"
    ADD CONSTRAINT "PK_8488f8e87bde7dacf065cec4cbb" PRIMARY KEY (id);


--
-- Name: PaymentTerms PK_85ade235e83a47c423ab766eadf; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."PaymentTerms"
    ADD CONSTRAINT "PK_85ade235e83a47c423ab766eadf" PRIMARY KEY (id);


--
-- Name: CollaborationRelationships PK_8b5a77158ca83fd4dfc36245f34; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CollaborationRelationships"
    ADD CONSTRAINT "PK_8b5a77158ca83fd4dfc36245f34" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: rolea PK_90194187649484d907469c5e923; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.rolea
    ADD CONSTRAINT "PK_90194187649484d907469c5e923" PRIMARY KEY (id);


--
-- Name: file_participants PK_9ed1cee80af226663d3c53f2264; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file_participants
    ADD CONSTRAINT "PK_9ed1cee80af226663d3c53f2264" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: Sectors PK_ad2730b7f1790d06da70779326c; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Sectors"
    ADD CONSTRAINT "PK_ad2730b7f1790d06da70779326c" PRIMARY KEY (id);


--
-- Name: role_permission PK_b42bbacb8402c353df822432544; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT "PK_b42bbacb8402c353df822432544" PRIMARY KEY ("roleId", "permissionId");


--
-- Name: refresh_token PK_b575dd3c21fb0831013c909e7fe; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY (id);


--
-- Name: Bids PK_c883ef5b8fbd0d953d39c3b7a7d; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Bids"
    ADD CONSTRAINT "PK_c883ef5b8fbd0d953d39c3b7a7d" PRIMARY KEY (id);


--
-- Name: file_versions PK_caca394bb05012a3d17c1d8b336; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file_versions
    ADD CONSTRAINT "PK_caca394bb05012a3d17c1d8b336" PRIMARY KEY (id);


--
-- Name: Auctions PK_cb157335b3d35a7144c48d123e6; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Auctions"
    ADD CONSTRAINT "PK_cb157335b3d35a7144c48d123e6" PRIMARY KEY (id);


--
-- Name: orderProducts PK_cb16d1f7ac5d8fcd6d66edf3254; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."orderProducts"
    ADD CONSTRAINT "PK_cb16d1f7ac5d8fcd6d66edf3254" PRIMARY KEY (id);


--
-- Name: auction_bids_history PK_d8cefa4fe1dd8bf6fe48d2c70de; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.auction_bids_history
    ADD CONSTRAINT "PK_d8cefa4fe1dd8bf6fe48d2c70de" PRIMARY KEY (id);


--
-- Name: status PK_e12743a7086ec826733f54e1d95; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY (id);


--
-- Name: ExternalRatings PK_ed46faaa474dff253119c20bc64; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."ExternalRatings"
    ADD CONSTRAINT "PK_ed46faaa474dff253119c20bc64" PRIMARY KEY (id);


--
-- Name: BuyerCompanies REL_3f842c6b8708da37970bd70a14; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanies"
    ADD CONSTRAINT "REL_3f842c6b8708da37970bd70a14" UNIQUE ("companyInformationId");


--
-- Name: QuickApplications REL_42d992ef8ec8ab6d5bd3e482a5; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "REL_42d992ef8ec8ab6d5bd3e482a5" UNIQUE ("securityId");


--
-- Name: SupplierCompanies REL_4d60a8cd8f9d65dc5f0374b32f; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "REL_4d60a8cd8f9d65dc5f0374b32f" UNIQUE ("ratingId");


--
-- Name: SupplierCompanies REL_528e78318d2b1007fda27291a7; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "REL_528e78318d2b1007fda27291a7" UNIQUE ("financialsId");


--
-- Name: Transactions REL_6a3743deaf73e36a0defcec115; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "REL_6a3743deaf73e36a0defcec115" UNIQUE ("goodsAndServicesId");


--
-- Name: SupplierCompanies REL_6c2f56b7f6034211a233004183; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "REL_6c2f56b7f6034211a233004183" UNIQUE ("companyInformationId");


--
-- Name: BuyerCompanies REL_6c3070b3bc2f295ddc24b4ad92; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanies"
    ADD CONSTRAINT "REL_6c3070b3bc2f295ddc24b4ad92" UNIQUE ("sectorId");


--
-- Name: QuickApplications REL_9714c72d5f4bdbff1b3b1065ac; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "REL_9714c72d5f4bdbff1b3b1065ac" UNIQUE ("orderDetailsId");


--
-- Name: QuickApplications REL_9c7f5e3cd5c3cbc2ff1d2b172b; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "REL_9c7f5e3cd5c3cbc2ff1d2b172b" UNIQUE ("paymentTermsId");


--
-- Name: CompanyInformation REL_d4269c155a69922cd29f7eca09; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CompanyInformation"
    ADD CONSTRAINT "REL_d4269c155a69922cd29f7eca09" UNIQUE ("addressId");


--
-- Name: Transactions REL_e1accc56c67658990c6a1bfed8; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "REL_e1accc56c67658990c6a1bfed8" UNIQUE ("contractId");


--
-- Name: QuickApplications REL_f3c3b88e296d4f48588391c31c; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "REL_f3c3b88e296d4f48588391c31c" UNIQUE ("buyerInformationId");


--
-- Name: QuickApplications REL_fc64ed251907a199aaa04b6e8f; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "REL_fc64ed251907a199aaa04b6e8f" UNIQUE ("transactionDocumentsId");


--
-- Name: email_templates UQ_4d77a74e85c275da60f4badf831; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.email_templates
    ADD CONSTRAINT "UQ_4d77a74e85c275da60f4badf831" UNIQUE (title);


--
-- Name: QuickApplications UQ_85c10210343cf46c064d81bd28e; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "UQ_85c10210343cf46c064d81bd28e" UNIQUE ("applicationNumber");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: permission UQ_b690135d86d59cc689d465ac952; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "UQ_b690135d86d59cc689d465ac952" UNIQUE (description);


--
-- Name: rolea UQ_e7a191b2b5a62281445d665cc51; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.rolea
    ADD CONSTRAINT "UQ_e7a191b2b5a62281445d665cc51" UNIQUE (name);


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: IDX_011dad0a532b96fb1e70387bf5; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_011dad0a532b96fb1e70387bf5" ON public.file_participants_files_file USING btree ("fileId");


--
-- Name: IDX_1d7cb3ff06675dbb97386e18af; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_1d7cb3ff06675dbb97386e18af" ON public.file_participants_files_file USING btree ("fileParticipantsId");


--
-- Name: IDX_6aa5a39bde5e98cafe1e6a04bc; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_6aa5a39bde5e98cafe1e6a04bc" ON public."ExternalRatings" USING btree (type);


--
-- Name: IDX_72e80be86cab0e93e67ed1a7a9; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON public.role_permission USING btree ("permissionId");


--
-- Name: IDX_78ce6c5802f85135a670114d1a; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_78ce6c5802f85135a670114d1a" ON public."QuickApplications" USING btree (type);


--
-- Name: IDX_add7fce755d3af211905a03b39; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_add7fce755d3af211905a03b39" ON public."FinancialInformations" USING btree (type);


--
-- Name: IDX_e3130a39c1e4a740d044e68573; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON public.role_permission USING btree ("roleId");


--
-- Name: IDX_f8183f26c3767e444b13c71279; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_f8183f26c3767e444b13c71279" ON public."CompanyInformation" USING btree (type);


--
-- Name: file_participants_files_file FK_011dad0a532b96fb1e70387bf57; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file_participants_files_file
    ADD CONSTRAINT "FK_011dad0a532b96fb1e70387bf57" FOREIGN KEY ("fileId") REFERENCES public.file(id);


--
-- Name: QuickApplications FK_07d172ff77ef3c90675db063664; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_07d172ff77ef3c90675db063664" FOREIGN KEY ("companyId") REFERENCES public."BuyerCompanies"(id) ON DELETE CASCADE;


--
-- Name: file_participants_files_file FK_1d7cb3ff06675dbb97386e18afd; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file_participants_files_file
    ADD CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd" FOREIGN KEY ("fileParticipantsId") REFERENCES public.file_participants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users FK_368e146b785b574f42ae9e53d5e; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.rolea(id);


--
-- Name: BuyerCompanies FK_3f842c6b8708da37970bd70a14f; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanies"
    ADD CONSTRAINT "FK_3f842c6b8708da37970bd70a14f" FOREIGN KEY ("companyInformationId") REFERENCES public."CompanyInformation"(id);


--
-- Name: QuickApplications FK_42d992ef8ec8ab6d5bd3e482a5b; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_42d992ef8ec8ab6d5bd3e482a5b" FOREIGN KEY ("securityId") REFERENCES public."Collaterals"(id);


--
-- Name: SupplierCompanies FK_4d60a8cd8f9d65dc5f0374b32f7; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "FK_4d60a8cd8f9d65dc5f0374b32f7" FOREIGN KEY ("ratingId") REFERENCES public."ExternalRatings"(id);


--
-- Name: SupplierCompanies FK_528e78318d2b1007fda27291a7b; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "FK_528e78318d2b1007fda27291a7b" FOREIGN KEY ("financialsId") REFERENCES public."FinancialInformations"(id);


--
-- Name: BuyerCompanyTaxAndRevenue FK_5ad7c7c244a7d681a273157ddc3; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanyTaxAndRevenue"
    ADD CONSTRAINT "FK_5ad7c7c244a7d681a273157ddc3" FOREIGN KEY ("buyerCompanyId") REFERENCES public."BuyerCompanies"(id) ON DELETE CASCADE;


--
-- Name: file_versions FK_5b2975bbaeb5c5db8c57ac438f4; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file_versions
    ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES public.file(id);


--
-- Name: Transactions FK_6a3743deaf73e36a0defcec1158; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "FK_6a3743deaf73e36a0defcec1158" FOREIGN KEY ("goodsAndServicesId") REFERENCES public."Services"(id);


--
-- Name: SupplierCompanies FK_6c2f56b7f6034211a2330041834; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanies"
    ADD CONSTRAINT "FK_6c2f56b7f6034211a2330041834" FOREIGN KEY ("companyInformationId") REFERENCES public."CompanyInformation"(id);


--
-- Name: BuyerCompanies FK_6c3070b3bc2f295ddc24b4ad929; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanies"
    ADD CONSTRAINT "FK_6c3070b3bc2f295ddc24b4ad929" FOREIGN KEY ("sectorId") REFERENCES public."Sectors"(id);


--
-- Name: role_permission FK_72e80be86cab0e93e67ed1a7a9a; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES public.permission(id);


--
-- Name: BuyerCompanies FK_912ca6f0ac9656def9d7df7296e; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."BuyerCompanies"
    ADD CONSTRAINT "FK_912ca6f0ac9656def9d7df7296e" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: orderProducts FK_93e963c47272eb995d0b9ac533f; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."orderProducts"
    ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES public."orderDetails"(id) ON DELETE CASCADE;


--
-- Name: QuickApplications FK_9714c72d5f4bdbff1b3b1065acf; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_9714c72d5f4bdbff1b3b1065acf" FOREIGN KEY ("orderDetailsId") REFERENCES public."orderDetails"(id);


--
-- Name: QuickApplications FK_9c7f5e3cd5c3cbc2ff1d2b172be; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_9c7f5e3cd5c3cbc2ff1d2b172be" FOREIGN KEY ("paymentTermsId") REFERENCES public."PaymentTerms"(id);


--
-- Name: CollaborationRelationships FK_b3ea6eb6940a5cd0ad6ce70c126; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CollaborationRelationships"
    ADD CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126" FOREIGN KEY ("supplierId") REFERENCES public."SupplierCompanies"(id) ON DELETE CASCADE;


--
-- Name: CollaborationRelationships FK_d0b33148e450c41053a3597d3b1; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CollaborationRelationships"
    ADD CONSTRAINT "FK_d0b33148e450c41053a3597d3b1" FOREIGN KEY ("buyerId") REFERENCES public."BuyerCompanies"(id) ON DELETE CASCADE;


--
-- Name: CompanyInformation FK_d4269c155a69922cd29f7eca09e; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CompanyInformation"
    ADD CONSTRAINT "FK_d4269c155a69922cd29f7eca09e" FOREIGN KEY ("addressId") REFERENCES public."CompanyAddresses"(id);


--
-- Name: SupplierCompanyTaxAndRevenue FK_d62129e190f3e09af585acb9d67; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SupplierCompanyTaxAndRevenue"
    ADD CONSTRAINT "FK_d62129e190f3e09af585acb9d67" FOREIGN KEY ("supplierCompanyId") REFERENCES public."SupplierCompanies"(id) ON DELETE CASCADE;


--
-- Name: Transactions FK_e1accc56c67658990c6a1bfed8c; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c" FOREIGN KEY ("contractId") REFERENCES public."Contracts"(id);


--
-- Name: role_permission FK_e3130a39c1e4a740d044e685730; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES public.rolea(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Bids FK_ed42474e4bfeee3269835924ff3; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Bids"
    ADD CONSTRAINT "FK_ed42474e4bfeee3269835924ff3" FOREIGN KEY ("auctionId") REFERENCES public."Auctions"(id) ON DELETE CASCADE;


--
-- Name: QuickApplications FK_f1fa843341d95bbb126794a9548; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_f1fa843341d95bbb126794a9548" FOREIGN KEY ("supplierInformationId") REFERENCES public."SupplierCompanies"(id);


--
-- Name: QuickApplications FK_f3c3b88e296d4f48588391c31cf; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_f3c3b88e296d4f48588391c31cf" FOREIGN KEY ("buyerInformationId") REFERENCES public."CompanyInformation"(id);


--
-- Name: QuickApplications FK_fc64ed251907a199aaa04b6e8f3; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."QuickApplications"
    ADD CONSTRAINT "FK_fc64ed251907a199aaa04b6e8f3" FOREIGN KEY ("transactionDocumentsId") REFERENCES public."TransactionDocuments"(id);


--
-- PostgreSQL database dump complete
--

