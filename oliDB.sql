--
-- PostgreSQL database dump
--

\restrict kHrZUA7K122loB2QaYpfqEN1X36ZNih7Z7yC6wEIDnvHfgxk7kWXQB9rWylOeDY

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-07-04 16:07:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 912 (class 1247 OID 26019)
-- Name: enum_leads_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_leads_status AS ENUM (
    'new',
    'contacted',
    'closed'
);


ALTER TYPE public.enum_leads_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 247 (class 1259 OID 26143)
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    slug character varying NOT NULL,
    title character varying NOT NULL,
    excerpt character varying NOT NULL,
    body jsonb NOT NULL,
    cover_image_id integer NOT NULL,
    published_at timestamp(3) with time zone NOT NULL,
    author character varying NOT NULL,
    category character varying NOT NULL,
    reading_minutes numeric NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 26142)
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO postgres;

--
-- TOC entry 5323 (class 0 OID 0)
-- Dependencies: 246
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- TOC entry 245 (class 1259 OID 26131)
-- Name: articles_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles_tags (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.articles_tags OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 26041)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    slug character varying NOT NULL,
    name character varying NOT NULL,
    short_name character varying,
    tagline character varying NOT NULL,
    description character varying NOT NULL,
    long_description character varying NOT NULL,
    hero_image_id integer NOT NULL,
    icon_key character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 26040)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 5324 (class 0 OID 0)
-- Dependencies: 236
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 253 (class 1259 OID 26202)
-- Name: gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery (
    id integer NOT NULL,
    image_id integer NOT NULL,
    caption character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.gallery OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 26201)
-- Name: gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gallery_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_id_seq OWNER TO postgres;

--
-- TOC entry 5325 (class 0 OID 0)
-- Dependencies: 252
-- Name: gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gallery_id_seq OWNED BY public.gallery.id;


--
-- TOC entry 255 (class 1259 OID 26217)
-- Name: leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leads (
    id integer NOT NULL,
    full_name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    subject character varying,
    message character varying NOT NULL,
    status public.enum_leads_status DEFAULT 'new'::public.enum_leads_status NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.leads OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 26216)
-- Name: leads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leads_id_seq OWNER TO postgres;

--
-- TOC entry 5326 (class 0 OID 0)
-- Dependencies: 254
-- Name: leads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leads_id_seq OWNED BY public.leads.id;


--
-- TOC entry 235 (class 1259 OID 26026)
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.media OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 26025)
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_id_seq OWNER TO postgres;

--
-- TOC entry 5327 (class 0 OID 0)
-- Dependencies: 234
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- TOC entry 251 (class 1259 OID 26186)
-- Name: partners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partners (
    id integer NOT NULL,
    name character varying NOT NULL,
    logo_id integer NOT NULL,
    url character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.partners OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 26185)
-- Name: partners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partners_id_seq OWNER TO postgres;

--
-- TOC entry 5328 (class 0 OID 0)
-- Dependencies: 250
-- Name: partners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.partners_id_seq OWNED BY public.partners.id;


--
-- TOC entry 223 (class 1259 OID 25893)
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


ALTER TABLE public.payload_kv OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25892)
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_kv_id_seq OWNER TO postgres;

--
-- TOC entry 5329 (class 0 OID 0)
-- Dependencies: 222
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- TOC entry 225 (class 1259 OID 25905)
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25904)
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_id_seq OWNER TO postgres;

--
-- TOC entry 5330 (class 0 OID 0)
-- Dependencies: 224
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- TOC entry 227 (class 1259 OID 25919)
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    categories_id integer,
    products_id integer,
    articles_id integer,
    services_id integer,
    partners_id integer,
    gallery_id integer,
    leads_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25918)
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNER TO postgres;

--
-- TOC entry 5331 (class 0 OID 0)
-- Dependencies: 226
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- TOC entry 233 (class 1259 OID 25957)
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25956)
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5332 (class 0 OID 0)
-- Dependencies: 232
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- TOC entry 229 (class 1259 OID 25931)
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 25930)
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_id_seq OWNER TO postgres;

--
-- TOC entry 5333 (class 0 OID 0)
-- Dependencies: 228
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- TOC entry 231 (class 1259 OID 25945)
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 25944)
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNER TO postgres;

--
-- TOC entry 5334 (class 0 OID 0)
-- Dependencies: 230
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- TOC entry 242 (class 1259 OID 26096)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    slug character varying NOT NULL,
    name character varying NOT NULL,
    category_id integer NOT NULL,
    short_description character varying NOT NULL,
    long_description character varying NOT NULL,
    hero_image_id integer NOT NULL,
    composition character varying NOT NULL,
    usage character varying NOT NULL,
    warning character varying NOT NULL,
    packaging character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 26073)
-- Name: products_certifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_certifications (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.products_certifications OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 26095)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5335 (class 0 OID 0)
-- Dependencies: 241
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 244 (class 1259 OID 26120)
-- Name: products_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    media_id integer
);


ALTER TABLE public.products_rels OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 26119)
-- Name: products_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_rels_id_seq OWNER TO postgres;

--
-- TOC entry 5336 (class 0 OID 0)
-- Dependencies: 243
-- Name: products_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_rels_id_seq OWNED BY public.products_rels.id;


--
-- TOC entry 238 (class 1259 OID 26061)
-- Name: products_specs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_specs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.products_specs OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 26084)
-- Name: products_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_tags (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.products_tags OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 26166)
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    slug character varying NOT NULL,
    name character varying NOT NULL,
    tagline character varying NOT NULL,
    description character varying NOT NULL,
    icon_key character varying NOT NULL,
    image_id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.services OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 26165)
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO postgres;

--
-- TOC entry 5337 (class 0 OID 0)
-- Dependencies: 248
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- TOC entry 221 (class 1259 OID 25877)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25876)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5338 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 219 (class 1259 OID 25865)
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO postgres;

--
-- TOC entry 4980 (class 2604 OID 26146)
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- TOC entry 4973 (class 2604 OID 26044)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4989 (class 2604 OID 26205)
-- Name: gallery id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery ALTER COLUMN id SET DEFAULT nextval('public.gallery_id_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 26220)
-- Name: leads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads ALTER COLUMN id SET DEFAULT nextval('public.leads_id_seq'::regclass);


--
-- TOC entry 4970 (class 2604 OID 26029)
-- Name: media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- TOC entry 4986 (class 2604 OID 26189)
-- Name: partners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners ALTER COLUMN id SET DEFAULT nextval('public.partners_id_seq'::regclass);


--
-- TOC entry 4958 (class 2604 OID 25896)
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- TOC entry 4959 (class 2604 OID 25908)
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- TOC entry 4962 (class 2604 OID 25922)
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- TOC entry 4967 (class 2604 OID 25960)
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- TOC entry 4963 (class 2604 OID 25934)
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- TOC entry 4966 (class 2604 OID 25948)
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- TOC entry 4976 (class 2604 OID 26099)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4979 (class 2604 OID 26123)
-- Name: products_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels ALTER COLUMN id SET DEFAULT nextval('public.products_rels_id_seq'::regclass);


--
-- TOC entry 4983 (class 2604 OID 26169)
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- TOC entry 4954 (class 2604 OID 25880)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5309 (class 0 OID 26143)
-- Dependencies: 247
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, slug, title, excerpt, body, cover_image_id, published_at, author, category, reading_minutes, updated_at, created_at) FROM stdin;
1	cach-phong-chong-muoi-mua-mua	5 cách phòng chống muỗi hiệu quả trong mùa mưa	Mùa mưa tới kéo theo bùng phát muỗi truyền sốt xuất huyết. Cùng Green Oli điểm qua 5 biện pháp phòng chống được khuyến nghị bởi Bộ Y Tế.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tại sao mùa mưa muỗi sinh sản mạnh?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Độ ẩm cao và các vũng nước đọng tạo điều kiện lý tưởng cho muỗi đẻ trứng. Trung bình, một con muỗi cái Aedes aegypti có thể đẻ 100–200 trứng mỗi lần, và trứng có thể nở chỉ sau 2–3 ngày trong nước sạch.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "5 biện pháp phòng chống", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Loại bỏ nước đọng — kiểm tra và làm sạch các vật chứa quanh nhà ít nhất 1 lần/tuần.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Phun thuốc tồn lưu — sử dụng các sản phẩm như Sumipro EW phun lên tường và bề mặt côn trùng đậu.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cửa lưới + màn ngủ — biện pháp vật lý đơn giản nhưng hiệu quả cao.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Thuốc xịt cá nhân — DEET, Picaridin được khuyến nghị cho người lớn và trẻ trên 2 tuổi.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Phối hợp cộng đồng — phun ULV không gian khi có ổ dịch xuất hiện.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Khi nào cần dịch vụ chuyên nghiệp?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Nếu mật độ muỗi quanh khu nhà bạn cao bất thường hoặc có ca sốt xuất huyết trong khu vực, hãy liên hệ đội ngũ Green Oli để được phun ULV và phun tồn lưu chuyên nghiệp.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}	35	2026-06-10 07:00:00+07	BS. Nguyễn Thị Hương	Sức khỏe cộng đồng	5	2026-07-03 16:04:00.504+07	2026-07-03 16:04:00.504+07
2	huong-dan-su-dung-phan-bon-la-dung-cach	Hướng dẫn sử dụng phân bón lá đúng cách cho rau ăn lá	Phân bón lá hấp thu nhanh nhưng nếu dùng sai liều và sai thời điểm sẽ gây cháy lá, ngộ độc cây. Bài viết này tổng hợp 7 nguyên tắc cốt lõi.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Phân bón lá là giải pháp dinh dưỡng bổ sung tuyệt vời, đặc biệt khi bộ rễ cây gặp vấn đề hoặc cần phục hồi nhanh sau stress.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "7 nguyên tắc vàng", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Phun vào sáng sớm hoặc chiều mát, tránh nắng gắt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pha đúng liều khuyến cáo, không tự ý tăng liều.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Phun đều mặt dưới lá — nơi tập trung khí khổng.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Không phun khi cây đang ra hoa rộ.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Kết hợp với phân bón gốc, không thay thế hoàn toàn.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Theo dõi phản ứng của cây sau 3 ngày để điều chỉnh.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}], "direction": "ltr"}}	36	2026-06-05 07:00:00+07	KS. Trần Văn Minh	Nông nghiệp	7	2026-07-03 16:04:01.707+07	2026-07-03 16:04:01.707+07
3	kiem-soat-moi-cho-cong-trinh-moi	Kiểm soát mối cho công trình mới: nên làm trước hay sau xây dựng?	Phòng mối tiền xây dựng tiết kiệm chi phí 60% so với xử lý sau. Cùng Green Oli phân tích 3 phương án phổ biến.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mối là một trong những tác nhân gây hư hại công trình hàng đầu tại Việt Nam, ước tính thiệt hại lên đến hàng trăm tỷ đồng mỗi năm.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tiền xây dựng vs hậu xây dựng", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Xử lý nền móng trước khi đổ bê tông cho phép tạo lớp hàng rào hóa học liên tục, ngăn mối từ đất đi lên. Phương án này có hiệu lực 10–15 năm.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Xử lý sau xây dựng phải khoan và bơm hóa chất qua sàn, chi phí cao hơn và hiệu quả thấp hơn do không tạo được lớp bảo vệ liền mạch.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Đề xuất Green Oli", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Kết hợp xử lý nền móng (Termidor SC) với hệ thống bả ngầm Xterm để tạo bảo vệ kép tối ưu.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}	37	2026-05-28 07:00:00+07	KS. Lê Quang Vinh	Kiểm soát côn trùng	8	2026-07-03 16:04:03.095+07	2026-07-03 16:04:03.094+07
4	che-pham-vi-sinh-cuu-dat-bac-mau	Chế phẩm vi sinh – giải pháp cứu đất bạc màu	Đất bạc màu sau nhiều năm canh tác hóa học có thể được phục hồi bằng chế phẩm Trichoderma + Bacillus. Cách dùng đơn giản, chi phí thấp.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Đất là nền tảng của mọi vụ mùa. Khi đất bạc màu, năng suất giảm 30–50% và phải bù bằng phân hóa học, tạo vòng xoáy độc hại.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Vai trò của vi sinh có lợi", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Trichoderma: ức chế nấm bệnh trong đất.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bacillus: cố định đạm, phân giải lân.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mycorrhiza: cộng sinh với rễ giúp cây hấp thu dinh dưỡng tốt hơn.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Quy trình sử dụng", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Trộn chế phẩm với phân chuồng hoai mục.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bón gốc 200g/m² đất.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tưới giữ ẩm 7 ngày liên tục.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lặp lại sau mỗi vụ thu hoạch.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}], "direction": "ltr"}}	38	2026-05-20 07:00:00+07	TS. Phạm Thanh Hà	Nông nghiệp	6	2026-07-03 16:04:04.403+07	2026-07-03 16:04:04.403+07
5	an-toan-khi-su-dung-hoa-chat-diet-con-trung	An toàn khi sử dụng hóa chất diệt côn trùng tại nhà	10 nguyên tắc bắt buộc để bảo vệ sức khỏe gia đình bạn khi tự xử lý côn trùng tại nhà.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Việc tự phun thuốc tại nhà là phổ biến nhưng tiềm ẩn rủi ro nếu không tuân thủ quy tắc an toàn.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "10 nguyên tắc", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Đeo khẩu trang N95 và găng tay.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mặc quần áo dài tay, kính bảo hộ.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Không phun gần thực phẩm và bể cá.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Đậy kín đồ chơi trẻ em và thức ăn vật nuôi.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cho người và thú cưng ra ngoài 2 giờ.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mở cửa thông gió sau khi phun.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Không pha trộn nhiều loại thuốc.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bảo quản nơi khóa tủ, xa tầm trẻ em.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Vứt bỏ vỏ bao bì đúng quy định.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Liên hệ trung tâm chống độc nếu có triệu chứng bất thường.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}], "direction": "ltr"}}	39	2026-05-12 07:00:00+07	BS. Hoàng Anh Tuấn	Sức khỏe cộng đồng	5	2026-07-03 16:04:05.61+07	2026-07-03 16:04:05.609+07
6	xu-huong-nong-nghiep-xanh-2026	Xu hướng nông nghiệp xanh 2026: cơ hội và thách thức	EU CBAM, USDA Organic và GlobalGAP đang thay đổi cuộc chơi xuất khẩu nông sản. Doanh nghiệp Việt cần chuẩn bị gì?	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Năm 2026, nhiều rào cản kỹ thuật mới sẽ có hiệu lực với nông sản xuất khẩu. Đây vừa là thách thức, vừa là cơ hội tái cấu trúc ngành.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "3 xu hướng chính", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Giảm dấu chân carbon — báo cáo phát thải bắt buộc cho 5 ngành mục tiêu.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Truy xuất nguồn gốc số — QR code trên từng đơn vị sản phẩm.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Thuốc BVTV sinh học — thay thế dần hoạt chất hóa học có dư lượng cao.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Hành động cho doanh nghiệp", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Đầu tư vào chế phẩm sinh học, vi sinh hữu ích và phần mềm quản lý vùng trồng là 3 ưu tiên hàng đầu.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}	40	2026-04-30 07:00:00+07	ThS. Đỗ Minh Khôi	Tin ngành	9	2026-07-03 16:04:07.202+07	2026-07-03 16:04:07.202+07
7	green-oli-mo-rong-thi-truong-mien-trung	Green Oli mở rộng thị trường miền Trung – khai trương 3 chi nhánh	Tháng 7/2026, Green Oli sẽ chính thức có mặt tại Đà Nẵng, Huế và Quy Nhơn nhằm phục vụ tốt hơn khách hàng khu vực miền Trung.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sáng sớm nay, bão số 1 Maysak đi qua đảo Hải Nam (Trung Quốc) vào vịnh Bắc Bộ.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lúc 9h ngày 4/7, vị trí tâm bão cách đặc khu Bạch Long Vĩ (Hải Phòng) khoảng 40km về phía Đông, cách Móng Cái (Quảng Ninh) khoảng 145km về phía Đông Nam. Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 8-9 (62-88km/h), giật cấp 11. Dự báo trong 3 giờ tới, bão số 1 di chuyển theo hướng Tây Bắc, tốc độ khoảng 15km/h.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bão đã gây gió mạnh cấp 8, giật cấp 9 ở Bạch Long Vĩ; cấp 6, giật cấp 8 ở Cô Tô.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ảnh vệ tinh cơ bão số 1 Maysak. (Nguồn: NCHMF)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cũng theo cơ quan khí tượng, khoảng 4-5 giờ tới, hoàn lưu bão số 1 sẽ áp sát đất liền khu vực Quảng Ninh - Hải Phòng. Từ khoảng trưa nay trở đi, vùng ven biển các tỉnh Quảng Ninh - Hải Phòng có gió mạnh cấp 5, sau tăng lên cấp 6, vùng gần tâm bão cấp 7-8, giật cấp 9-10.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Từ sáng nay, Quảng Ninh - Hải Phòng có mưa, từ chiều và đêm nay mưa to đến rất to.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Nhận định chi tiết đợt mưa lớn ở miền Bắc, cơ quan khí tượng cho hay, từ sáng 4/7 đến hết 5/7, Đông Bắc Bộ và Thanh Hóa mưa to đến rất to với lượng mưa phổ biến 100-200mm. Trong đó, khu Đông Bắc Bắc Bộ lượng mưa lên đến 200-300mm, cục bộ trên 500mm.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cơ quan khí tượng đặc biệt cảnh báo nguy cơ mưa cường độ lớn, lượng mưa có thể vượt mức 100mm chỉ trong 3 giờ, tiềm ẩn nhiều rủi ro thiên tai.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ngoài ra, ngày và đêm 4/7, từ Nghệ An đến Quảng Trị mưa rào và rải rác dông với lượng mưa 15 - 30mm, có nơi mưa to đến rất to trên 100mm. Cao nguyên Trung Bộ và Nam Bộ mưa rào và dông rải rác, lượng mưa 10 - 30mm, cục bộ mưa to trên 70mm.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Từ đêm 5/7, mưa lớn ở Đông Bắc Bộ và Thanh Hóa xu hướng giảm dần.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "justify", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Trong mưa dông khả năng xảy ra các hiện tượng thời tiết cực đoan như lốc, sét, mưa đá và gió giật mạnh. Mưa lớn và mưa lớn cục bộ có thể gây ra ngập úng tại các vùng trũng, thấp, khu đô thị, công nghiệp; lũ quét trên các sông, suối nhỏ, sạt lở đất trên sườn dốc.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	41	2026-04-15 07:00:00+07	Phòng Truyền thông Green Oli	Tin công ty	3	2026-07-04 13:07:19.932+07	2026-07-03 16:04:08.479+07
\.


--
-- TOC entry 5307 (class 0 OID 26131)
-- Dependencies: 245
-- Data for Name: articles_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles_tags (_order, _parent_id, id, value) FROM stdin;
1	1	6a477b00a0b2bd58a0cfd87a	Phòng chống muỗi
2	1	6a477b00a0b2bd58a0cfd87b	Sốt xuất huyết
3	1	6a477b00a0b2bd58a0cfd87c	Mùa mưa
1	2	6a477b01a0b2bd58a0cfd87d	Phân bón lá
2	2	6a477b01a0b2bd58a0cfd87e	Rau ăn lá
3	2	6a477b01a0b2bd58a0cfd87f	Hướng dẫn
1	3	6a477b03a0b2bd58a0cfd880	Mối
2	3	6a477b03a0b2bd58a0cfd881	Công trình
3	3	6a477b03a0b2bd58a0cfd882	Xterm
1	4	6a477b04a0b2bd58a0cfd883	Vi sinh
2	4	6a477b04a0b2bd58a0cfd884	Đất bạc màu
3	4	6a477b04a0b2bd58a0cfd885	Trichoderma
1	5	6a477b05a0b2bd58a0cfd886	An toàn
2	5	6a477b05a0b2bd58a0cfd887	PPE
3	5	6a477b05a0b2bd58a0cfd888	Hộ gia đình
1	6	6a477b07a0b2bd58a0cfd889	Nông nghiệp xanh
2	6	6a477b07a0b2bd58a0cfd88a	CBAM
3	6	6a477b07a0b2bd58a0cfd88b	Xuất khẩu
1	7	6a477b08a0b2bd58a0cfd88c	Khai trương
2	7	6a477b08a0b2bd58a0cfd88d	Miền Trung
3	7	6a477b08a0b2bd58a0cfd88e	Green Oli
\.


--
-- TOC entry 5299 (class 0 OID 26041)
-- Dependencies: 237
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, slug, name, short_name, tagline, description, long_description, hero_image_id, icon_key, updated_at, created_at) FROM stdin;
8	thuoc-diet-muoi-ruoi-con-trung-bay	Thuốc Diệt Muỗi, Ruồi & Côn Trùng Bay	Diệt Muỗi & Ruồi	Kiểm soát muỗi, ruồi và côn trùng bay trong gia dụng và y tế.	Các chế phẩm phun không gian, phun tồn lưu và xử lý côn trùng bay cho nhà ở, cơ sở dịch vụ và khu vực cộng đồng.	Danh mục gồm các sản phẩm hỗ trợ kiểm soát muỗi, ruồi và một số côn trùng bay/bò thường gặp. Sản phẩm có nhiều dạng như EW, EC, CS, SEC và dung dịch chuyên dụng; cần lựa chọn theo đối tượng, khu vực xử lý và hướng dẫn trên nhãn.	9	Bug	2026-07-04 13:26:33.857+07	2026-07-03 16:03:24.357+07
7	thuoc-diet-gian	Thuốc Diệt Gián	Diệt Gián	Giải pháp xử lý gián bằng bả gel, bột và sản phẩm chuyên dụng.	Danh mục bả gel và chế phẩm kiểm soát gián cho nhà ở, khách sạn, nhà hàng, trường học và khu vực dịch vụ.	Green Oli cung cấp các nguyên liệu hóa chất cơ bản đạt chuẩn công nghiệp/dược phẩm, có chứng nhận xuất xứ, MSDS đầy đủ và tư vấn kỹ thuật theo từng ứng dụng cụ thể.	8	FlaskConical	2026-07-04 15:03:44.92+07	2026-07-03 16:03:22.496+07
6	thuoc-diet-kien	Thuốc Diệt Kiến	Diệt Kiến	Kiểm soát kiến bằng bả chuyên dụng, hỗ trợ xử lý tận tổ.	Các sản phẩm bả diệt kiến dạng gel, phù hợp xử lý đường đi và khu vực kiến hoạt động.	Danh mục ưu tiên các loại bả có tác động chậm để kiến thợ mang mồi về tổ, hỗ trợ giảm mật độ và xử lý ổ kiến. Nên đặt bả ở vị trí khô ráo, ngoài tầm với của trẻ em và vật nuôi.	7	Microscope	2026-07-04 15:04:47.531+07	2026-07-03 16:03:20.51+07
5	thuoc-diet-moi	Thuốc Diệt Mối	Diệt Mối	Phòng trừ mối cho nhà ở, công trình, kho bãi và khu vực có nguy cơ.	Sản phẩm xử lý, phòng ngừa và kiểm soát mối cho công trình xây dựng, nhà ở, biệt thự, kho hàng và khu vực cần bảo vệ.	Danh mục gồm thuốc xử lý mối, bả diệt mối và hệ thống trạm bả. Với công trình hoặc ổ mối phức tạp, nên triển khai theo quy trình kỹ thuật và kiểm tra định kỳ bởi đơn vị chuyên môn.	6	Bug	2026-07-04 15:05:37.037+07	2026-07-03 16:03:18.546+07
4	thuoc-diet-chuot	Thuốc Diệt Chuột	Diệt Chuột	Giải pháp kiểm soát chuột bằng bả chuyên dụng.	Các sản phẩm bả diệt chuột dạng bột, viên hoặc block, phù hợp sử dụng tại nhà ở, kho bãi, trang trại và khuôn viên.\n	Danh mục gồm các chế phẩm kiểm soát chuột bằng bả chuyên dụng. Khi sử dụng nên bố trí trong hộp bả hoặc vị trí an toàn, tránh để trẻ em và vật nuôi tiếp cận; thu gom bả thừa và xác chuột sau xử lý.	5	Mouse	2026-07-04 15:06:31.009+07	2026-07-03 16:03:16.537+07
3	kiem-soat-con-trung-chuyen-dung	Kiểm Soát Côn Trùng Chuyên Dụng	Chuyên Dụng	Giải pháp chuyên sâu cho rệp, bọ chét, bọ ve và khu vực khó xử lý.	Sản phẩm hỗ trợ kiểm soát côn trùng khó xử lý, côn trùng kháng thuốc và khu vực có nhiều khe kẽ.\n	Danh mục gồm sản phẩm kiểm soát vòng đời côn trùng, rệp giường, bọ chét, bọ ve, gián và các trường hợp cần giải pháp chuyên sâu. Một số sản phẩm cần kỹ thuật thi công phù hợp để đạt hiệu quả và đảm bảo an toàn.\n	4	ShieldCheck	2026-07-04 15:07:08.302+07	2026-07-03 16:03:15.235+07
2	xua-duoi-ran-va-bo-sat	Xua Đuổi Rắn & Bò Sát	Xua Rắn & Bò Sát	Tạo hàng rào xua đuổi rắn, thằn lằn và một số loài bò sát.	Sản phẩm dạng dung dịch hoặc hạt, hỗ trợ tạo vùng xua đuổi rắn và thằn lằn cho sân vườn, khuôn viên và công trình.\n	Danh mục gồm sản phẩm xua đuổi rắn và thằn lằn dựa trên mùi của tinh dầu thực vật. Sản phẩm phù hợp sử dụng quanh khu vực cần bảo vệ; cần rải hoặc phun theo đúng hướng dẫn và duy trì vùng bảo vệ khi cần.\n	3	ShieldAlert	2026-07-04 15:07:42.586+07	2026-07-03 16:03:13.942+07
1	dung-cu-xu-ly-con-trung	Dụng Cụ Xử Lý Côn Trùng	Dụng Cụ	Thiết bị hỗ trợ thi công và xử lý côn trùng chuyên nghiệp.	Dụng cụ hỗ trợ phun/rải chế phẩm tại khe hở, khu vực khó tiếp cận và điểm trú ẩn của côn trùng.\n	Danh mục gồm thiết bị hỗ trợ thi công chuyên dụng. Lựa chọn đúng vòi phun, vật tư và cách vệ sinh thiết bị giúp việc xử lý đạt độ chính xác cao hơn và hạn chế hao phí sản phẩm.	2	Wrench	2026-07-04 15:08:22.767+07	2026-07-03 16:03:11.488+07
\.


--
-- TOC entry 5315 (class 0 OID 26202)
-- Dependencies: 253
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery (id, image_id, caption, updated_at, created_at) FROM stdin;
1	55	Phun ULV phòng dịch sốt xuất huyết	2026-07-03 16:04:31.702+07	2026-07-03 16:04:31.702+07
2	56	Dây chuyền đóng gói tại nhà máy Bình Dương	2026-07-03 16:04:33.039+07	2026-07-03 16:04:33.039+07
3	57	Phòng QC đạt chuẩn GLP	2026-07-03 16:04:34.455+07	2026-07-03 16:04:34.455+07
4	58	Tập huấn kỹ thuật miền Bắc 2026	2026-07-03 16:04:35.974+07	2026-07-03 16:04:35.974+07
5	59	Lắp đặt trạm bả Xterm – resort Phú Quốc	2026-07-03 16:04:40.763+07	2026-07-03 16:04:40.763+07
6	60	Hợp tác cùng HTX miền Tây	2026-07-03 16:04:42.543+07	2026-07-03 16:04:42.543+07
\.


--
-- TOC entry 5317 (class 0 OID 26217)
-- Dependencies: 255
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leads (id, full_name, email, phone, subject, message, status, updated_at, created_at) FROM stdin;
1	Tr?n Van Test	test@example.com	0901234567	Tu v?n d?ch v?	T�i mu?n tu v?n v? d?ch v? di?t c�n tr�ng cho nh� h�ng.	new	2026-07-03 18:16:15.606+07	2026-07-03 18:16:15.604+07
2	Prod Test	prod@test.com	0912345678	Test production	Ki?m tra contact form tr�n production build.	new	2026-07-03 19:26:19.971+07	2026-07-03 19:26:19.97+07
\.


--
-- TOC entry 5297 (class 0 OID 26026)
-- Dependencies: 235
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
2	Phân Bón Lá	2026-07-03 16:03:09.115+07	2026-07-03 16:03:09.114+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-phanbonla-1280-640?_a=BAMAPqRk0	\N	---picsum-photos-seed-phanbonla-1280-640.jpg	image/jpeg	186531	1280	640	50	50
3	Phân Bón Gốc	2026-07-03 16:03:12.89+07	2026-07-03 16:03:12.89+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-phanbongoc-1280-640?_a=BAMAPqRk0	\N	--picsum-photos-seed-phanbongoc-1280-640.jpg	image/jpeg	27669	1280	640	50	50
4	Thuốc Trừ Bệnh	2026-07-03 16:03:14.316+07	2026-07-03 16:03:14.315+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-trubenh-1280-640?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-trubenh-1280-640.jpg	image/jpeg	9799	1280	640	50	50
5	Thuốc Trừ Cỏ	2026-07-03 16:03:15.62+07	2026-07-03 16:03:15.62+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ttps---picsum-photos-seed-truco-1280-640?_a=BAMAPqRk0	\N	ttps---picsum-photos-seed-truco-1280-640.jpg	image/jpeg	199089	1280	640	50	50
6	Thuốc Trừ Sâu Rầy Rệp	2026-07-03 16:03:17.541+07	2026-07-03 16:03:17.541+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/tps---picsum-photos-seed-trusau-1280-640?_a=BAMAPqRk0	\N	tps---picsum-photos-seed-trusau-1280-640.jpg	image/jpeg	64451	1280	640	50	50
7	Chế Phẩm Sinh Học – Vi Sinh	2026-07-03 16:03:19.527+07	2026-07-03 16:03:19.527+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/tps---picsum-photos-seed-visinh-1280-640?_a=BAMAPqRk0	\N	tps---picsum-photos-seed-visinh-1280-640.jpg	image/jpeg	46405	1280	640	50	50
8	Hóa Chất Nguyên Liệu Cơ Bản	2026-07-03 16:03:21.506+07	2026-07-03 16:03:21.506+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-nguyenlieu-1280-640?_a=BAMAPqRk0	\N	--picsum-photos-seed-nguyenlieu-1280-640.jpg	image/jpeg	76853	1280	640	50	50
9	Hóa Chất Diệt Côn Trùng	2026-07-03 16:03:23.485+07	2026-07-03 16:03:23.485+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-dietcontrung-1280-640?_a=BAMAPqRk0	\N	picsum-photos-seed-dietcontrung-1280-640.jpg	image/jpeg	62852	1280	640	50	50
10	Sumipro EW	2026-07-03 16:03:24.68+07	2026-07-03 16:03:24.68+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-sumipro-ew-1200-900?_a=BAMAPqRk0	\N	--picsum-photos-seed-sumipro-ew-1200-900.jpg	image/jpeg	108318	1200	900	50	50
11	Sumipro EW	2026-07-03 16:03:26.197+07	2026-07-03 16:03:26.197+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-sumipro-ew-1-1200-900?_a=BAMAPqRk0	\N	picsum-photos-seed-sumipro-ew-1-1200-900.jpg	image/jpeg	118037	1200	900	50	50
12	Sumipro EW	2026-07-03 16:03:27.421+07	2026-07-03 16:03:27.421+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-sumipro-ew-2-1200-900?_a=BAMAPqRk0	\N	picsum-photos-seed-sumipro-ew-2-1200-900.jpg	image/jpeg	70665	1200	900	50	50
13	Sumipro EW	2026-07-03 16:03:28.77+07	2026-07-03 16:03:28.77+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-sumipro-ew-3-1200-900?_a=BAMAPqRk0	\N	picsum-photos-seed-sumipro-ew-3-1200-900.jpg	image/jpeg	224220	1200	900	50	50
14	Sumipro EW	2026-07-03 16:03:30.028+07	2026-07-03 16:03:30.028+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-sumipro-ew-4-1200-900?_a=BAMAPqRk0	\N	picsum-photos-seed-sumipro-ew-4-1200-900.jpg	image/jpeg	126546	1200	900	50	50
15	Sumithrin 10SEC	2026-07-03 16:03:31.33+07	2026-07-03 16:03:31.33+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-sumithrin-1200-900?_a=BAMAPqRk0	\N	---picsum-photos-seed-sumithrin-1200-900.jpg	image/jpeg	171070	1200	900	50	50
16	Sumithrin 10SEC	2026-07-03 16:03:32.62+07	2026-07-03 16:03:32.62+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-sumithrin-1-1200-900?_a=BAMAPqRk0	\N	-picsum-photos-seed-sumithrin-1-1200-900.jpg	image/jpeg	96527	1200	900	50	50
17	Sumithrin 10SEC	2026-07-03 16:03:33.905+07	2026-07-03 16:03:33.905+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-sumithrin-2-1200-900?_a=BAMAPqRk0	\N	-picsum-photos-seed-sumithrin-2-1200-900.jpg	image/jpeg	51509	1200	900	50	50
18	Sumithrin 10SEC	2026-07-03 16:03:35.151+07	2026-07-03 16:03:35.151+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-sumithrin-3-1200-900?_a=BAMAPqRk0	\N	-picsum-photos-seed-sumithrin-3-1200-900.jpg	image/jpeg	157284	1200	900	50	50
19	Pesguard FG 161	2026-07-03 16:03:36.511+07	2026-07-03 16:03:36.511+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/s---picsum-photos-seed-pesguard-1200-900?_a=BAMAPqRk0	\N	s---picsum-photos-seed-pesguard-1200-900.jpg	image/jpeg	194176	1200	900	50	50
20	Pesguard FG 161	2026-07-03 16:03:37.75+07	2026-07-03 16:03:37.75+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-pesguard-1-1200-900?_a=BAMAPqRk0	\N	--picsum-photos-seed-pesguard-1-1200-900.jpg	image/jpeg	73014	1200	900	50	50
21	Pesguard FG 161	2026-07-03 16:03:39.031+07	2026-07-03 16:03:39.031+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-pesguard-2-1200-900?_a=BAMAPqRk0	\N	--picsum-photos-seed-pesguard-2-1200-900.jpg	image/jpeg	72188	1200	900	50	50
22	Map Permethrin 50EC	2026-07-03 16:03:40.398+07	2026-07-03 16:03:40.398+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-permethrin-1200-900?_a=BAMAPqRk0	\N	--picsum-photos-seed-permethrin-1200-900.jpg	image/jpeg	137543	1200	900	50	50
23	Map Permethrin 50EC	2026-07-03 16:03:41.855+07	2026-07-03 16:03:41.855+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-permethrin-1-1200-900?_a=BAMAPqRk0	\N	picsum-photos-seed-permethrin-1-1200-900.jpg	image/jpeg	65796	1200	900	50	50
24	Map Permethrin 50EC	2026-07-03 16:03:43.079+07	2026-07-03 16:03:43.079+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-permethrin-2-1200-900?_a=BAMAPqRk0	\N	picsum-photos-seed-permethrin-2-1200-900.jpg	image/jpeg	119468	1200	900	50	50
25	Sumipro Solution	2026-07-03 16:03:44.452+07	2026-07-03 16:03:44.452+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-sumipro-sol-1200-900?_a=BAMAPqRk0	\N	-picsum-photos-seed-sumipro-sol-1200-900.jpg	image/jpeg	78095	1200	900	50	50
26	Sumipro Solution	2026-07-03 16:03:45.893+07	2026-07-03 16:03:45.893+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icsum-photos-seed-sumipro-sol-1-1200-900?_a=BAMAPqRk0	\N	icsum-photos-seed-sumipro-sol-1-1200-900.jpg	image/jpeg	118661	1200	900	50	50
27	Sumipro Solution	2026-07-03 16:03:47.204+07	2026-07-03 16:03:47.204+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icsum-photos-seed-sumipro-sol-2-1200-900?_a=BAMAPqRk0	\N	icsum-photos-seed-sumipro-sol-2-1200-900.jpg	image/jpeg	101287	1200	900	50	50
28	Sumithrin Extra	2026-07-03 16:03:48.572+07	2026-07-03 16:03:48.572+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-sumithrin-x-1200-900?_a=BAMAPqRk0	\N	-picsum-photos-seed-sumithrin-x-1200-900.jpg	image/jpeg	111458	1200	900	50	50
29	Sumithrin Extra	2026-07-03 16:03:49.79+07	2026-07-03 16:03:49.79+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icsum-photos-seed-sumithrin-x-1-1200-900?_a=BAMAPqRk0	\N	icsum-photos-seed-sumithrin-x-1-1200-900.jpg	image/jpeg	87375	1200	900	50	50
30	Sumithrin Extra	2026-07-03 16:03:50.98+07	2026-07-03 16:03:50.98+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icsum-photos-seed-sumithrin-x-2-1200-900?_a=BAMAPqRk0	\N	icsum-photos-seed-sumithrin-x-2-1200-900.jpg	image/jpeg	88131	1200	900	50	50
31	Hệ Thống Xterm	2026-07-03 16:03:52.289+07	2026-07-03 16:03:52.289+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ttps---picsum-photos-seed-xterm-1200-900?_a=BAMAPqRk0	\N	ttps---picsum-photos-seed-xterm-1200-900.jpg	image/jpeg	86848	1200	900	50	50
32	Hệ Thống Xterm	2026-07-03 16:03:55.383+07	2026-07-03 16:03:55.383+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-xterm-1-1200-900?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-xterm-1-1200-900.jpg	image/jpeg	270281	1200	900	50	50
33	Hệ Thống Xterm	2026-07-03 16:03:56.759+07	2026-07-03 16:03:56.759+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-xterm-2-1200-900?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-xterm-2-1200-900.jpg	image/jpeg	170094	1200	900	50	50
34	Hệ Thống Xterm	2026-07-03 16:03:58.1+07	2026-07-03 16:03:58.1+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-xterm-3-1200-900?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-xterm-3-1200-900.jpg	image/jpeg	118809	1200	900	50	50
35	5 cách phòng chống muỗi hiệu quả trong mùa mưa	2026-07-03 16:03:59.526+07	2026-07-03 16:03:59.526+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-news-muoi-1280-720?_a=BAMAPqRk0	\N	---picsum-photos-seed-news-muoi-1280-720.jpg	image/jpeg	101606	1280	720	50	50
36	Hướng dẫn sử dụng phân bón lá đúng cách cho rau ăn lá	2026-07-03 16:04:00.824+07	2026-07-03 16:04:00.824+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/--picsum-photos-seed-news-bonla-1280-720?_a=BAMAPqRk0	\N	--picsum-photos-seed-news-bonla-1280-720.jpg	image/jpeg	67460	1280	720	50	50
37	Kiểm soát mối cho công trình mới: nên làm trước hay sau xây dựng?	2026-07-03 16:04:02.033+07	2026-07-03 16:04:02.033+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/s---picsum-photos-seed-news-moi-1280-720?_a=BAMAPqRk0	\N	s---picsum-photos-seed-news-moi-1280-720.jpg	image/jpeg	75063	1280	720	50	50
38	Chế phẩm vi sinh – giải pháp cứu đất bạc màu	2026-07-03 16:04:03.414+07	2026-07-03 16:04:03.414+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-news-visinh-1280-720?_a=BAMAPqRk0	\N	-picsum-photos-seed-news-visinh-1280-720.jpg	image/jpeg	105337	1280	720	50	50
39	An toàn khi sử dụng hóa chất diệt côn trùng tại nhà	2026-07-03 16:04:04.727+07	2026-07-03 16:04:04.727+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/-picsum-photos-seed-news-antoan-1280-720?_a=BAMAPqRk0	\N	-picsum-photos-seed-news-antoan-1280-720.jpg	image/jpeg	127048	1280	720	50	50
40	Xu hướng nông nghiệp xanh 2026: cơ hội và thách thức	2026-07-03 16:04:05.951+07	2026-07-03 16:04:05.951+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/picsum-photos-seed-news-xuhuong-1280-720?_a=BAMAPqRk0	\N	picsum-photos-seed-news-xuhuong-1280-720.jpg	image/jpeg	161395	1280	720	50	50
41	Green Oli mở rộng thị trường miền Trung – khai trương 3 chi nhánh	2026-07-03 16:04:07.55+07	2026-07-03 16:04:07.55+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/csum-photos-seed-news-mienTrung-1280-720?_a=BAMAPqRk0	\N	csum-photos-seed-news-mienTrung-1280-720.jpg	image/jpeg	79385	1280	720	50	50
42	Diệt Mối Tận Gốc	2026-07-03 16:04:08.805+07	2026-07-03 16:04:08.805+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/tps---picsum-photos-seed-dietmoi-960-720?_a=BAMAPqRk0	\N	tps---picsum-photos-seed-dietmoi-960-720.jpg	image/jpeg	29752	960	720	50	50
43	Diệt Chuột	2026-07-03 16:04:11.076+07	2026-07-03 16:04:11.076+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/s---picsum-photos-seed-dietchuot-960-720?_a=BAMAPqRk0	\N	s---picsum-photos-seed-dietchuot-960-720.jpg	image/jpeg	75250	960	720	50	50
44	Diệt Muỗi	2026-07-03 16:04:13.027+07	2026-07-03 16:04:13.027+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-dietmuoi-960-720?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-dietmuoi-960-720.jpg	image/jpeg	93803	960	720	50	50
45	Vệ Sinh Công Nghiệp	2026-07-03 16:04:14.833+07	2026-07-03 16:04:14.833+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ttps---picsum-photos-seed-vesinh-960-720?_a=BAMAPqRk0	\N	ttps---picsum-photos-seed-vesinh-960-720.jpg	image/jpeg	73943	960	720	50	50
46	Diệt Gián & Côn Trùng	2026-07-03 16:04:17.013+07	2026-07-03 16:04:17.013+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-dietgian-960-720?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-dietgian-960-720.jpg	image/jpeg	144492	960	720	50	50
47	Sumitomo Chemical	2026-07-03 16:04:19.058+07	2026-07-03 16:04:19.058+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-sumitomo-240-120?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-sumitomo-240-120.jpg	image/jpeg	7616	240	120	50	50
48	Bayer CropScience	2026-07-03 16:04:20.44+07	2026-07-03 16:04:20.44+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/https---picsum-photos-seed-bayer-240-120?_a=BAMAPqRk0	\N	https---picsum-photos-seed-bayer-240-120.jpg	image/jpeg	8181	240	120	50	50
49	Syngenta	2026-07-03 16:04:21.822+07	2026-07-03 16:04:21.822+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ps---picsum-photos-seed-syngenta-240-120?_a=BAMAPqRk0	\N	ps---picsum-photos-seed-syngenta-240-120.jpg	image/jpeg	5438	240	120	50	50
50	BASF	2026-07-03 16:04:23.339+07	2026-07-03 16:04:23.339+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/https---picsum-photos-seed-basf-240-120?_a=BAMAPqRk0	\N	https---picsum-photos-seed-basf-240-120.jpg	image/jpeg	6123	240	120	50	50
51	Dow AgroSciences	2026-07-03 16:04:24.922+07	2026-07-03 16:04:24.922+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/https---picsum-photos-seed-dow-240-120?_a=BAMAPqRk0	\N	https---picsum-photos-seed-dow-240-120.jpg	image/jpeg	4696	240	120	50	50
52	FMC	2026-07-03 16:04:26.235+07	2026-07-03 16:04:26.235+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/https---picsum-photos-seed-fmc-240-120?_a=BAMAPqRk0	\N	https---picsum-photos-seed-fmc-240-120.jpg	image/jpeg	5795	240	120	50	50
53	Corteva	2026-07-03 16:04:27.775+07	2026-07-03 16:04:27.775+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/tps---picsum-photos-seed-corteva-240-120?_a=BAMAPqRk0	\N	tps---picsum-photos-seed-corteva-240-120.jpg	image/jpeg	7449	240	120	50	50
54	Nufarm	2026-07-03 16:04:29.283+07	2026-07-03 16:04:29.283+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ttps---picsum-photos-seed-nufarm-240-120?_a=BAMAPqRk0	\N	ttps---picsum-photos-seed-nufarm-240-120.jpg	image/jpeg	8757	240	120	50	50
55	Đội ngũ kỹ thuật Green Oli phun ULV tại khu dân cư	2026-07-03 16:04:30.808+07	2026-07-03 16:04:30.808+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-gallery-1-1200-800?_a=BAMAPqRk0	\N	---picsum-photos-seed-gallery-1-1200-800.jpg	image/jpeg	68719	1200	800	50	50
56	Nhà máy đóng gói hóa chất tiêu chuẩn ISO	2026-07-03 16:04:32.027+07	2026-07-03 16:04:32.027+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-gallery-2-1200-800?_a=BAMAPqRk0	\N	---picsum-photos-seed-gallery-2-1200-800.jpg	image/jpeg	68346	1200	800	50	50
57	Phòng thí nghiệm kiểm nghiệm chất lượng	2026-07-03 16:04:33.36+07	2026-07-03 16:04:33.36+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-gallery-3-1200-800?_a=BAMAPqRk0	\N	---picsum-photos-seed-gallery-3-1200-800.jpg	image/jpeg	83506	1200	800	50	50
58	Tập huấn kỹ thuật cho đội ngũ phân phối miền Bắc	2026-07-03 16:04:34.777+07	2026-07-03 16:04:34.777+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-gallery-4-1200-800?_a=BAMAPqRk0	\N	---picsum-photos-seed-gallery-4-1200-800.jpg	image/jpeg	131515	1200	800	50	50
59	Lắp đặt trạm bả Xterm cho biệt thự nghỉ dưỡng	2026-07-03 16:04:36.328+07	2026-07-03 16:04:36.328+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-gallery-5-1200-800?_a=BAMAPqRk0	\N	---picsum-photos-seed-gallery-5-1200-800.jpg	image/jpeg	154188	1200	800	50	50
60	Hợp tác canh tác xanh cùng nông dân Đồng bằng sông Cửu Long	2026-07-03 16:04:41.562+07	2026-07-03 16:04:41.562+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/---picsum-photos-seed-gallery-6-1200-800?_a=BAMAPqRk0	\N	---picsum-photos-seed-gallery-6-1200-800.jpg	image/jpeg	59848	1200	800	50	50
62	Thuốc diệt côn trùng Permethor Shield Liquid Insecticide 1 lít của Ensystex	2026-07-04 13:46:14.851+07	2026-07-04 13:46:14.851+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/permethor-shield-liquid-insecticide-1-lit?_a=BAMAAARk0	\N	permethor-shield-liquid-insecticide-1-lit.jpg	image/jpeg	351059	500	952	50	50
63	Chế phẩm kiểm soát gián Đức Pesguard Alpha 5FL 1 lít của Sumitomo Chemical	2026-07-04 13:47:33.783+07	2026-07-04 13:47:33.782+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/pesguard-alpha-5fl-1-lit?_a=BAMAAARk0	\N	pesguard-alpha-5fl-1-lit.jpg	image/jpeg	475467	826	1280	50	50
64	Chế phẩm diệt muỗi, ruồi, kiến, gián Pesguard FG161 1 lít của Sumitomo Chemical	2026-07-04 13:47:36.65+07	2026-07-04 13:47:36.65+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/pesguard-fg161-1-lit?_a=BAMAAARk0	\N	pesguard-fg161-1-lit.jpg	image/jpeg	144705	900	1000	50	50
65	Chế phẩm diệt muỗi, ruồi, kiến, gián Pesguard FG161 1 lít của Sumitomo Chemical	2026-07-04 13:47:38.035+07	2026-07-04 13:47:38.035+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/pesguard-fg161-1-lit-1?_a=BAMAAARk0	\N	pesguard-fg161-1-lit-1.jpg	image/jpeg	92465	900	1000	50	50
66	SumiPro EW hỗ trợ kiểm soát muỗi tại khu vực chăn nuôi gia súc	2026-07-04 14:01:23.692+07	2026-07-04 14:01:23.692+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumipro-ew-bao-ve-gia-suc-khoi-muoi?_a=BAMAAARk0	\N	sumipro-ew-bao-ve-gia-suc-khoi-muoi.jpg	image/jpeg	652780	1200	1200	50	50
67	Minh họa hệ thống Xterm bảo vệ công trình lịch sử khỏi mối	2026-07-04 14:01:32.27+07	2026-07-04 14:01:32.27+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/xterm-bao-ve-cong-trinh-lich-su-khoi-moi?_a=BAMAAARk0	\N	xterm-bao-ve-cong-trinh-lich-su-khoi-moi.jpg	image/jpeg	1222970	1200	1200	50	50
68	Wazary 10SC hỗ trợ kiểm soát mối tại khu vực nhà ở	2026-07-04 14:01:42.858+07	2026-07-04 14:01:42.858+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/wazary-10sc-diet-moi-cho-nha-o?_a=BAMAAARk0	\N	wazary-10sc-diet-moi-cho-nha-o.jpg	image/jpeg	682213	900	900	50	50
69	SumiPro EW hỗ trợ kiểm soát ruồi tại khu vực chăn nuôi	2026-07-04 14:01:45.338+07	2026-07-04 14:01:45.338+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumipro-ew-kiem-soat-ruoi-tai-trang-trai?_a=BAMAAARk0	\N	sumipro-ew-kiem-soat-ruoi-tai-trang-trai.jpg	image/jpeg	938736	1280	1024	50	50
70	Minh họa hệ thống Xterm tác động vào vòng đời phát triển của mối	2026-07-04 14:01:47.564+07	2026-07-04 14:01:47.564+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/xterm-tac-dong-vao-vong-doi-cua-moi?_a=BAMAAARk0	\N	xterm-tac-dong-vao-vong-doi-cua-moi.jpg	image/jpeg	473433	1200	1200	50	50
71	Wazary 10SC hỗ trợ phòng chống mối cho công trình xây dựng	2026-07-04 14:01:49.09+07	2026-07-04 14:01:49.09+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/wazary-10sc-bao-ve-cong-trinh-xay-dung?_a=BAMAAARk0	\N	wazary-10sc-bao-ve-cong-trinh-xay-dung.jpg	image/jpeg	922503	1125	1119	50	50
72	Wazary 10SC hỗ trợ chặn mối ngay từ giai đoạn khởi công công trình	2026-07-04 14:01:51.284+07	2026-07-04 14:01:51.284+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/wazary-10sc-chan-moi-khi-khoi-cong?_a=BAMAAARk0	\N	wazary-10sc-chan-moi-khi-khoi-cong.jpg	image/jpeg	1153556	1200	1200	50	50
73	Minh họa nguy cơ mối tấn công công trình và giải pháp Wazary 10SC	2026-07-04 14:01:53.39+07	2026-07-04 14:01:53.39+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/wazary-10sc-canh-bao-moi-tai-cong-trinh?_a=BAMAAARk0	\N	wazary-10sc-canh-bao-moi-tai-cong-trinh.jpg	image/jpeg	798819	1200	1200	50	50
74	Thông tin về ưu điểm và công dụng của chế phẩm SumiPro EW	2026-07-04 14:01:55.504+07	2026-07-04 14:01:55.504+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumipro-ew-uu-diem-va-cong-dung?_a=BAMAAARk0	\N	sumipro-ew-uu-diem-va-cong-dung.jpg	image/jpeg	669334	900	900	50	50
75	Hệ thống Xterm hỗ trợ diệt mối an toàn và hiệu quả trong không gian nội thất	2026-07-04 14:01:57.53+07	2026-07-04 14:01:57.53+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/xterm-diet-moi-an-toan-cho-khong-gian-noi-that?_a=BAMAAARk0	\N	xterm-diet-moi-an-toan-cho-khong-gian-noi-that.jp	image/jpeg	386590	900	900	50	50
76	SumiPro EW hỗ trợ kiểm soát muỗi tại khu vực nhà ở vào ban đêm	2026-07-04 14:01:59.437+07	2026-07-04 14:01:59.437+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumipro-ew-kiem-soat-muoi-ban-dem?_a=BAMAAARk0	\N	sumipro-ew-kiem-soat-muoi-ban-dem.jpg	image/jpeg	1015518	1200	1200	50	50
77	Chế phẩm diệt muỗi và ruồi SumiPro EW 1 lít của Sumitomo Chemical	2026-07-04 14:02:02.978+07	2026-07-04 14:02:02.978+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumipro-ew-1-lit?_a=BAMAAARk0	\N	sumipro-ew-1-lit.jpg	image/jpeg	119733	600	666	50	50
78	Chế phẩm diệt muỗi, ruồi, bọ chét và rệp giường Sumithrin 10SEC 1 lít	2026-07-04 14:02:04.292+07	2026-07-04 14:02:04.291+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumithrin-10sec-1-lit?_a=BAMAAARk0	\N	sumithrin-10sec-1-lit.jpg	image/jpeg	142710	900	1000	50	50
79	SumiPro EW hỗ trợ loại bỏ muỗi tại khu vực chuồng trại	2026-07-04 14:02:05.723+07	2026-07-04 14:02:05.723+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/sumipro-ew-loai-bo-muoi-khoi-chuong-trai?_a=BAMAAARk0	\N	sumipro-ew-loai-bo-muoi-khoi-chuong-trai.jpg	image/jpeg	1557875	1200	1200	50	50
80	Minh họa giải pháp Xterm hỗ trợ bảo vệ nhà ở và công trình khỏi mối	2026-07-04 14:02:13.425+07	2026-07-04 14:02:13.425+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/xterm-giai-phap-diet-moi-cho-nha-o?_a=BAMAAARk0	\N	xterm-giai-phap-diet-moi-cho-nha-o.jpg	image/jpeg	920514	1200	1200	50	50
81	Bả gel diệt gián Optigard Cockroach của Syngenta	2026-07-04 14:05:34.764+07	2026-07-04 14:05:34.764+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/optigard-cockroach-gel-diet-gian?_a=BAMAAARk0	\N	optigard-cockroach-gel-diet-gian.jpg	image/jpeg	63257	500	500	50	50
82	Gel diệt kiến Optigard AB 100 của Syngenta	2026-07-04 14:05:37.275+07	2026-07-04 14:05:37.275+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/optigard-ab-100-gel-diet-kien?_a=BAMAAARk0	\N	optigard-ab-100-gel-diet-kien.jpg	image/jpeg	291791	720	1280	50	50
83	Gel diệt kiến Optigard AB 100 của Syngenta	2026-07-04 14:05:38.69+07	2026-07-04 14:05:38.69+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/optigard-ab-100-gel-diet-kien-1?_a=BAMAAARk0	\N	optigard-ab-100-gel-diet-kien-1.jpg	image/jpeg	64670	500	500	50	50
84	Thuốc trừ chuột Klerat 0.005 Pellete gói 50g của Syngenta	2026-07-04 14:06:37.117+07	2026-07-04 14:06:37.117+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/klerat-0-005-pellete-goi-50g?_a=BAMAAARk0	\N	klerat-0-005-pellete-goi-50g.jpg	image/jpeg	86540	464	538	50	50
85	Viên bả thuốc trừ chuột Klerat 0.005 Pellete màu đỏ	2026-07-04 14:06:39.39+07	2026-07-04 14:06:39.39+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/klerat-0-005-pellete-vien-do?_a=BAMAAARk0	\N	klerat-0-005-pellete-vien-do.jpg	image/jpeg	64948	510	348	50	50
86	Thuốc trừ chuột Klerat 0.005 Pellete gói 50g của Syngenta trên nền trong suốt	2026-07-04 14:06:41.019+07	2026-07-04 14:06:41.019+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/klerat-0-005-pellete-goi-50g-nen-trong?_a=BAMAAARk0	\N	klerat-0-005-pellete-goi-50g-nen-trong.webp	image/webp	125620	400	533	50	50
87	Thuốc trừ chuột Klerat 0.005 Pellete gói 1kg của Syngenta	2026-07-04 14:06:42.316+07	2026-07-04 14:06:42.316+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/klerat-0-005-pellete-goi-1kg?_a=BAMAAARk0	\N	klerat-0-005-pellete-goi-1kg.jpg	image/jpeg	84827	433	577	50	50
88	Thùng sản phẩm Imperator 50EC chai 100ml của Syngenta	2026-07-04 14:08:04.828+07	2026-07-04 14:08:04.828+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/imperator-50ec-100ml-thung-hang?_a=BAMAAARk0	\N	imperator-50ec-100ml-thung-hang.jpg	image/jpeg	935174	1125	1500	50	50
89	Các quy cách Imperator 50EC 1 lít và 100ml của Syngenta	2026-07-04 14:08:08.108+07	2026-07-04 14:08:08.108+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/imperator-50ec-1-lit-va-100ml-thuc-te?_a=BAMAAARk0	\N	imperator-50ec-1-lit-va-100ml-thuc-te.jpg	image/webp	80304	400	533	50	50
90	Chế phẩm diệt côn trùng Imperator 50EC 1 lít của Syngenta trên nền trong suốt	2026-07-04 14:08:09.706+07	2026-07-04 14:08:09.706+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/imperator-50ec-1-lit-nen-trong?_a=BAMAAARk0	\N	imperator-50ec-1-lit-nen-trong.webp	image/webp	72570	400	533	50	50
91	Chế phẩm diệt côn trùng Imperator 50EC 100ml của Syngenta trên nền trong suốt	2026-07-04 14:08:10.887+07	2026-07-04 14:08:10.887+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/imperator-50ec-100ml-nen-trong?_a=BAMAAARk0	\N	imperator-50ec-100ml-nen-trong.webp	image/jpeg	36657	577	433	50	50
92	Hai quy cách Imperator 50EC 1 lít và 100ml của Syngenta	2026-07-04 14:08:12.535+07	2026-07-04 14:08:12.535+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/imperator-50ec-1-lit-va-100ml?_a=BAMAAARk0	\N	imperator-50ec-1-lit-va-100ml.jpg	image/jpeg	87083	343	842	50	50
93	Chế phẩm diệt côn trùng Imperator 50EC 1 lít của Syngenta	2026-07-04 14:08:13.878+07	2026-07-04 14:08:13.877+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/imperator-50ec-1-lit?_a=BAMAAARk0	\N	imperator-50ec-1-lit.jpg	image/jpeg	316175	960	1280	50	50
94	Chế phẩm diệt côn trùng Icon 10CS 62,5ml của Syngenta	2026-07-04 14:10:33.557+07	2026-07-04 14:10:33.557+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-10cs-62-5ml?_a=BAMAAARk0	\N	icon-10cs-62-5ml.jpg	image/jpeg	68619	375	666	50	50
95	Chế phẩm diệt côn trùng Icon 2.5CS 1 lít của Syngenta	2026-07-04 14:10:35.524+07	2026-07-04 14:10:35.523+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5cs-1-lit?_a=BAMAAARk0	\N	icon-2-5cs-1-lit.jpg	image/jpeg	37997	452	552	50	50
96	Chế phẩm diệt côn trùng Icon 2.5EW 250ml của Syngenta	2026-07-04 14:10:36.861+07	2026-07-04 14:10:36.86+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5ew-250ml?_a=BAMAAARk0	\N	icon-2-5ew-250ml.jpg	image/jpeg	20339	196	349	50	50
97	Nhiều chai chế phẩm diệt côn trùng Icon 2.5CS 1 lít của Syngenta	2026-07-04 14:10:38.139+07	2026-07-04 14:10:38.138+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5cs-1-lit-nhieu-chai?_a=BAMAAARk0	\N	icon-2-5cs-1-lit-nhieu-chai.jpg	image/jpeg	82708	492	512	50	50
98	Hai chai chế phẩm diệt côn trùng Icon 2.5EW 250ml của Syngenta	2026-07-04 14:10:39.612+07	2026-07-04 14:10:39.611+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5ew-250ml-hai-chai?_a=BAMAAARk0	\N	icon-2-5ew-250ml-hai-chai.jpg	image/jpeg	1063887	1161	1500	50	50
99	Hộp sản phẩm Icon 10CS 62,5ml của Syngenta	2026-07-04 14:10:41.745+07	2026-07-04 14:10:41.745+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-10cs-62-5ml-hop-san-pham?_a=BAMAAARk0	\N	icon-10cs-62-5ml-hop-san-pham.jpg	image/jpeg	214177	800	800	50	50
100	Chế phẩm diệt côn trùng Icon 10CS 1 lít của Syngenta	2026-07-04 14:10:43.409+07	2026-07-04 14:10:43.409+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-10cs-1-lit?_a=BAMAAARk0	\N	icon-10cs-1-lit.jpg	image/webp	94970	1170	1203	50	50
101	Các chai Icon 2.5EW 250ml của Syngenta được xếp chồng	2026-07-04 14:10:45.868+07	2026-07-04 14:10:45.867+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5ew-250ml-xep-chong?_a=BAMAAARk0	\N	icon-2-5ew-250ml-xep-chong.jpg	image/jpeg	798717	1442	2560	50	50
102	Sản phẩm Icon 2.5EW 250ml của Syngenta cùng thùng hàng	2026-07-04 14:10:47.058+07	2026-07-04 14:10:47.058+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5ew-250ml-thung-hang?_a=BAMAAARk0	\N	icon-2-5ew-250ml-thung-hang.jpg	image/jpeg	724538	1442	2560	50	50
103	Ba chai chế phẩm diệt côn trùng Icon 2.5EW 250ml của Syngenta	2026-07-04 14:10:48.475+07	2026-07-04 14:10:48.474+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-2-5ew-250ml-ba-chai?_a=BAMAAARk0	\N	icon-2-5ew-250ml-ba-chai.jpg	image/jpeg	612279	2560	1442	50	50
104	Chế phẩm diệt côn trùng Icon 10CS 1 lít của Syngenta trên nền trắng	2026-07-04 14:10:50.695+07	2026-07-04 14:10:50.695+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/icon-10cs-1-lit-nen-trang?_a=BAMAAARk0	\N	icon-10cs-1-lit-nen-trang.jpg	image/jpeg	60059	375	666	50	50
105	Bột xử lý gián và rệp giường Diathor Flowable 500g của Ensystex	2026-07-04 14:58:04.065+07	2026-07-04 14:58:04.065+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/diathor-flowable-500g?_a=BAMAAARk0	\N	diathor-flowable-500g.jpg	image/jpeg	948064	1280	1280	50	50
106	Bộ dụng cụ phun bột Diathor Flowable vào khe hở và vị trí khó tiếp cận	2026-07-04 14:58:07.373+07	2026-07-04 14:58:07.373+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/dung-cu-phun-bot-diathor-flowable?_a=BAMAAARk0	\N	dung-cu-phun-bot-diathor-flowable.jpg	image/jpeg	299651	1165	1139	50	50
107	Thuốc diệt côn trùng Bithor Dual Action Insecticide 1 lít của Ensystex	2026-07-04 14:58:08.455+07	2026-07-04 14:58:08.455+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/bithor-dual-action-insecticide-1-lit?_a=BAMAAARk0	\N	bithor-dual-action-insecticide-1-lit.jpg	image/jpeg	149860	600	856	50	50
108	Thuốc diệt côn trùng Permethor Shield Liquid Insecticide 1 lít của Ensystex	2026-07-04 14:58:09.555+07	2026-07-04 14:58:09.555+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/permethor-shield-liquid-insecticide-1-lit-1?_a=BAMAAARk0	\N	permethor-shield-liquid-insecticide-1-lit-1.jpg	image/jpeg	351059	500	952	50	50
109	Bả gel diệt gián Zenithor Gel Cockroach Bait 120g của Ensystex	2026-07-04 14:58:10.763+07	2026-07-04 14:58:10.763+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/zenithor-gel-cockroach-bait-120g?_a=BAMAAARk0	\N	zenithor-gel-cockroach-bait-120g.jpg	image/jpeg	162430	600	427	50	50
110	Chế phẩm diệt côn trùng Maxxthor 100 1 lít của Ensystex	2026-07-04 14:58:11.933+07	2026-07-04 14:58:11.933+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/maxxthor-100-insecticide-1-lit?_a=BAMAAARk0	\N	maxxthor-100-insecticide-1-lit.jpg	image/jpeg	269522	465	1024	50	50
111	Thuốc diệt côn trùng dạng khói Fumithor Delta Smoke Generator 40g của Ensystex	2026-07-04 14:58:13.065+07	2026-07-04 14:58:13.065+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/fumithor-delta-smoke-generator-40g?_a=BAMAAARk0	\N	fumithor-delta-smoke-generator-40g.jpg	image/jpeg	270851	600	726	50	50
112	Dung dịch Ecothor Active Nature xua đuổi rắn và bò sát 1 lít của Ensystex	2026-07-04 14:58:14.358+07	2026-07-04 14:58:14.358+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ecothor-active-nature-xua-duoi-ran-1-lit?_a=BAMAAARk0	\N	ecothor-active-nature-xua-duoi-ran-1-lit.jpg	image/jpeg	105604	600	800	50	50
113	Hạt xua đuổi rắn và bò sát Ecothor Nature-Cide Granular X2 thùng 9kg	2026-07-04 14:58:15.857+07	2026-07-04 14:58:15.856+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ecothor-nature-cide-granular-x2-9kg?_a=BAMAAARk0	\N	ecothor-nature-cide-granular-x2-9kg.png	image/png	385517	638	752	50	50
114	Mặt sau chai Ecothor Nature-Cide X2 Plus xua đuổi rắn và thằn lằn 1,89 lít	2026-07-04 14:58:16.925+07	2026-07-04 14:58:16.925+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ecothor-nature-cide-x2-plus-1-89-lit-mat-sau?_a=BAMAAARk0	\N	ecothor-nature-cide-x2-plus-1-89-lit-mat-sau.png	image/png	387276	592	884	50	50
115	Dung dịch Ecothor Nature-Cide X2 Plus xua đuổi rắn và thằn lằn 1,89 lít	2026-07-04 14:58:18.339+07	2026-07-04 14:58:18.338+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/ecothor-nature-cide-x2-plus-1-89-lit?_a=BAMAAARk0	\N	ecothor-nature-cide-x2-plus-1-89-lit.png	image/png	382017	592	884	50	50
116	Bả diệt mối Requiem 1RB của Ensystex kèm hộp và gói mồi	2026-07-04 14:58:20.24+07	2026-07-04 14:58:20.24+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/requiem-1rb-ba-diet-moi?_a=BAMAAARk0	\N	requiem-1rb-ba-diet-moi.jpg	image/jpeg	160495	768	406	50	50
117	Gói chế phẩm diệt ruồi Topfly 10WG	2026-07-04 14:58:21.253+07	2026-07-04 14:58:21.253+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/topfly-10wg-ba-diet-ruoi-goi?_a=BAMAAARk0	\N	topfly-10wg-ba-diet-ruoi-goi.jpg	image/jpeg	1053735	2554	2062	50	50
118	Hộp và tuýp gel diệt gián Blattanex Cockroach Gel 12g của Envu	2026-07-04 14:58:23.299+07	2026-07-04 14:58:23.299+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/blattanex-cockroach-gel-12g-hop-san-pham?_a=BAMAAARk0	\N	blattanex-cockroach-gel-12g-hop-san-pham.jpg	image/jpeg	653390	1920	2560	50	50
119	Bả gel diệt gián Advion Cockroach Gel Bait của Syngenta	2026-07-04 14:58:25.349+07	2026-07-04 14:58:25.349+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/advion-cockroach-gel-bait?_a=BAMAAARk0	\N	advion-cockroach-gel-bait.jpg	image/jpeg	83758	549	454	50	50
120	Bả gel diệt gián Advion Cockroach Gel Bait của Syngenta	2026-07-04 14:58:26.563+07	2026-07-04 14:58:26.563+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/advion-cockroach-gel-bait-2?_a=BAMAAARk0	\N	advion-cockroach-gel-bait-2.jpg	image/jpeg	83758	549	454	50	50
121	Thuốc diệt côn trùng Arilon Insecticide 200g của Syngenta	2026-07-04 14:58:27.795+07	2026-07-04 14:58:27.794+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/arilon-insecticide-200g?_a=BAMAAARk0	\N	arilon-insecticide-200g.jpg	image/jpeg	54287	433	577	50	50
122	Tổng hợp các sản phẩm kiểm soát côn trùng và diệt chuột của Syngenta	2026-07-04 14:58:29.778+07	2026-07-04 14:58:29.777+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/san-pham-diet-con-trung-syngenta-tong-hop?_a=BAMAAARk0	\N	san-pham-diet-con-trung-syngenta-tong-hop.jpg	image/jpeg	487784	1833	995	50	50
123	Chế phẩm Abate 1SG diệt bọ gậy và lăng quăng muỗi trong gia dụng và y tế	2026-07-04 15:00:06.646+07	2026-07-04 15:00:06.646+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/abate-1sg-diet-bo-gay-muoi?_a=BAMAAARk0	\N	abate-1sg-diet-bo-gay-muoi.png	image/png	1085618	1047	1503	50	50
124	Gói chế phẩm diệt côn trùng Fendona 10SC 5ml của BASF	2026-07-04 15:00:10.173+07	2026-07-04 15:00:10.173+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/fendona-10sc-goi-5ml?_a=BAMAAARk0	\N	fendona-10sc-goi-5ml.png	image/png	3468026	1500	2000	50	50
125	Chai chế phẩm diệt muỗi, gián, kiến, ruồi và bọ chét Fendona 10SC của BASF	2026-07-04 15:00:12.139+07	2026-07-04 15:00:12.139+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/fendona-10sc-chai?_a=BAMAAARk0	\N	fendona-10sc-chai.png	image/png	1720864	1500	2000	50	50
126	Gel diệt kiến Maxforce Quantum 0.03% 12g của Envu	2026-07-04 15:00:13.764+07	2026-07-04 15:00:13.764+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/maxforce-quantum-0-03-gel-diet-kien?_a=BAMAAARk0	\N	maxforce-quantum-0-03-gel-diet-kien.jpg	image/jpeg	103080	1280	720	50	50
127	Thuốc diệt chuột Storm 0.005% Block Bait gói 20 viên của BASF	2026-07-04 15:00:14.976+07	2026-07-04 15:00:14.976+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/storm-0-005-block-bait-20-vien?_a=BAMAAARk0	\N	storm-0-005-block-bait-20-vien.png	image/png	1433190	869	1159	50	50
128	Tenopa 100ml	2026-07-04 15:01:18.268+07	2026-07-04 15:01:18.268+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/Tenopa100ml?_a=BAMAAARk0	\N	Tenopa100ml.png	image/png	1121912	1500	2000	50	50
129	Mythic1L	2026-07-04 15:01:22.428+07	2026-07-04 15:01:22.428+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/Mythic1L?_a=BAMAAARk0	\N	Mythic1L.png	image/png	2764617	1228	2646	50	50
130	SecliraGel	2026-07-04 15:01:27.488+07	2026-07-04 15:01:27.488+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/SecliraGel?_a=BAMAAARk0	\N	SecliraGel.png	image/png	390454	1683	1339	50	50
131	Tenopa 1L	2026-07-04 15:01:29.681+07	2026-07-04 15:01:29.681+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/Tenopa1L?_a=BAMAAARk0	\N	Tenopa1L.png	image/png	448327	725	1424	50	50
132	Mythic100ml 	2026-07-04 15:01:32.843+07	2026-07-04 15:01:32.843+07	https://res.cloudinary.com/gaklspua/image/upload/v1/greenoli/Mythic100ml?_a=BAMAAARk0	\N	Mythic100ml.png	image/png	894276	1500	2000	50	50
\.


--
-- TOC entry 5313 (class 0 OID 26186)
-- Dependencies: 251
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partners (id, name, logo_id, url, updated_at, created_at) FROM stdin;
1	Sumitomo Chemical	47	\N	2026-07-03 16:04:19.901+07	2026-07-03 16:04:19.901+07
2	Bayer CropScience	48	\N	2026-07-03 16:04:21.298+07	2026-07-03 16:04:21.298+07
3	Syngenta	49	\N	2026-07-03 16:04:22.81+07	2026-07-03 16:04:22.81+07
4	BASF	50	\N	2026-07-03 16:04:24.39+07	2026-07-03 16:04:24.39+07
5	Dow AgroSciences	51	\N	2026-07-03 16:04:25.93+07	2026-07-03 16:04:25.93+07
6	FMC	52	\N	2026-07-03 16:04:27.228+07	2026-07-03 16:04:27.228+07
7	Corteva	53	\N	2026-07-03 16:04:28.758+07	2026-07-03 16:04:28.758+07
8	Nufarm	54	\N	2026-07-03 16:04:30.494+07	2026-07-03 16:04:30.494+07
\.


--
-- TOC entry 5285 (class 0 OID 25893)
-- Dependencies: 223
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- TOC entry 5287 (class 0 OID 25905)
-- Dependencies: 225
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- TOC entry 5289 (class 0 OID 25919)
-- Dependencies: 227
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, categories_id, products_id, articles_id, services_id, partners_id, gallery_id, leads_id) FROM stdin;
\.


--
-- TOC entry 5295 (class 0 OID 25957)
-- Dependencies: 233
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	20260703_035613_initial	1	2026-07-03 11:38:00.361+07	2026-07-03 11:38:00.361+07
3	20260703_080826_phase02_collections	2	2026-07-03 15:11:09.324+07	2026-07-03 15:11:09.324+07
2	dev	-1	2026-07-04 15:38:07.781+07	2026-07-03 11:49:27.35+07
\.


--
-- TOC entry 5291 (class 0 OID 25931)
-- Dependencies: 229
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
4	collection-partners	{}	2026-07-03 20:23:41.66+07	2026-07-03 20:23:41.66+07
5	collection-gallery	{}	2026-07-03 20:23:42.997+07	2026-07-03 20:23:42.997+07
1	collection-users	{"limit": 10}	2026-07-03 20:26:14.357+07	2026-07-03 20:23:04.107+07
9	collection-articles	{"limit": 10}	2026-07-03 20:37:41.967+07	2026-07-03 20:37:41.967+07
10	collection-services	{}	2026-07-04 12:46:27.379+07	2026-07-04 12:46:27.379+07
8	collection-articles	{"limit": 10, "editViewType": "default"}	2026-07-04 12:47:27.625+07	2026-07-03 20:29:10.661+07
3	collection-products	{"sort": "-slug", "limit": 10, "editViewType": "default"}	2026-07-04 12:48:14.344+07	2026-07-03 20:23:27.282+07
6	collection-leads	{"limit": 10, "editViewType": "default"}	2026-07-04 12:48:55.493+07	2026-07-03 20:23:51.896+07
2	collection-media	{"limit": 10, "editViewType": "default"}	2026-07-04 13:03:08.954+07	2026-07-03 20:23:09.322+07
7	collection-categories	{"limit": 10, "editViewType": "default"}	2026-07-04 15:02:48.48+07	2026-07-03 20:29:05.391+07
\.


--
-- TOC entry 5293 (class 0 OID 25945)
-- Dependencies: 231
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
6	\N	4	user	1
7	\N	5	user	1
10	\N	1	user	1
14	\N	9	user	1
15	\N	10	user	1
16	\N	8	user	1
17	\N	3	user	1
18	\N	6	user	1
19	\N	2	user	1
21	\N	7	user	1
\.


--
-- TOC entry 5304 (class 0 OID 26096)
-- Dependencies: 242
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, slug, name, category_id, short_description, long_description, hero_image_id, composition, usage, warning, packaging, updated_at, created_at) FROM stdin;
1	sumipro-ew	Sumipro EW	8	Hóa chất diệt côn trùng gốc Pyrethroid dạng nhũ dầu trong nước, hiệu lực mạnh và lưu dẫn dài.	Sumipro EW là chế phẩm hóa chất diệt côn trùng tiên tiến, sử dụng công nghệ nhũ tương trong nước (Emulsion in Water) để bảo đảm hiệu quả tối đa, an toàn cho người sử dụng và thân thiện với môi trường. Sản phẩm đặc trị muỗi, ruồi, gián, kiến và các loại côn trùng gây hại trong khu dân cư, bệnh viện, kho hàng và cơ sở chế biến thực phẩm.	10	Permethrin 10% w/w, Sumithrin 1% w/w, dung môi dầu nhẹ và phụ gia an toàn theo tiêu chuẩn WHO.	Pha 50ml/8L nước phun đều lên các bề mặt côn trùng thường trú đậu (tường, gầm tủ, kẽ cửa). Liều cao hơn (80ml/8L) áp dụng cho khu vực có mật độ côn trùng cao.	Đeo khẩu trang, kính bảo hộ và găng tay khi pha và phun. Không cho người, vật nuôi vào khu vực vừa phun trong 2 giờ. Bảo quản nơi khô ráo, tránh xa thực phẩm và trẻ em.	Chai 1L, can 5L, can 20L (HDPE chống tia UV)	2026-07-03 16:03:30.976+07	2026-07-03 16:03:30.974+07
2	sumithrin-10sec	Sumithrin 10SEC	8	Hoạt chất Sumithrin 10% dạng SEC, dùng phun ULV và phun tồn lưu chuyên nghiệp.	Sumithrin 10SEC là sản phẩm chuyên dụng cho dịch vụ kiểm soát côn trùng, hiệu lực nhanh trên muỗi truyền sốt xuất huyết, ruồi nhà và gián Đức. Công thức SEC bám tốt trên bề mặt xốp.	15	Sumithrin (d-Phenothrin) 10% w/w + chất nhũ hóa.	Pha 30–50ml/L nước cho phun ULV không gian; 100ml/8L cho phun tồn lưu. Phun lúc sáng sớm hoặc chiều mát.	Tránh phun trực tiếp lên người, thực phẩm và bể cá. Đậy kín thùng nước và thực phẩm trước khi phun.	Chai 1L, can 5L	2026-07-03 16:03:36.181+07	2026-07-03 16:03:36.181+07
3	pesguard-fg-161	Pesguard FG 161	8	Hỗn hợp permethrin và d-tetramethrin dạng FG, đặc trị gián và kiến.	Pesguard FG 161 phối hợp 2 hoạt chất Pyrethroid mang lại hiệu quả knock-down nhanh và lưu dẫn lâu, được khuyến nghị bởi WHO cho chương trình kiểm soát côn trùng đô thị.	19	Permethrin 13% + d-Tetramethrin 3.3% trong nền nước.	Pha loãng theo hướng dẫn nhà sản xuất (thường 1:50–1:100), phun tồn lưu lên bề mặt côn trùng đậu.	Đeo PPE đầy đủ. Không phun gần nguồn nước sinh hoạt.	Chai 1L (PE)	2026-07-03 16:03:40.07+07	2026-07-03 16:03:40.07+07
4	map-permethrin-50ec	Map Permethrin 50EC	8	Permethrin 50% EC nồng độ cao cho dịch vụ phun tồn lưu chuyên nghiệp.	Map Permethrin 50EC là dung dịch nhũ dầu nồng độ Permethrin 50%, lý tưởng cho ứng dụng phun tồn lưu trên bề mặt khô (tường, sàn, vách kho) trong các chương trình kiểm soát véc-tơ truyền bệnh.	22	Permethrin 50% w/v trong dầu khoáng tinh chế.	Pha 25ml/8L nước phun tồn lưu định kỳ 3 tháng. Diện tích 1L pha sử dụng cho ~200m².	Sản phẩm dễ cháy. Tránh xa nguồn lửa, không phun trên bề mặt nóng.	Can HDPE 5L, 20L	2026-07-03 16:03:44.117+07	2026-07-03 16:03:44.117+07
5	sumipro-solution	Sumipro Solution	8	Dung dịch sẵn sàng dùng cho hộ gia đình, không cần pha loãng.	Sumipro Solution là phiên bản pha sẵn của dòng Sumipro, đóng chai xịt tay tiện lợi cho hộ gia đình, văn phòng và quán cà phê. An toàn cho trẻ em và thú cưng sau khi phun 30 phút.	25	Hoạt chất pha loãng sẵn trong nước cất + phụ gia thơm nhẹ.	Lắc đều, xịt trực tiếp lên côn trùng hoặc bề mặt côn trùng đậu.	Không xịt vào mắt, thực phẩm, bể cá.	Bình xịt PET 500ml, 1L	2026-07-03 16:03:48.234+07	2026-07-03 16:03:48.234+07
6	sumithrin-extra	Sumithrin Extra	8	Phiên bản tăng cường của Sumithrin với chất hiệp đồng PBO.	Sumithrin Extra bổ sung Piperonyl Butoxide (PBO) – chất hiệp đồng giúp ngăn cản chuyển hóa của côn trùng, qua đó tăng hiệu lực của hoạt chất Sumithrin lên gấp 2–3 lần.	28	Sumithrin 10% + Piperonyl Butoxide 10% trong dầu khoáng.	Pha 30ml/8L nước cho phun tồn lưu hoặc 5ml/L cho ULV không gian.	Sản phẩm dạng EC, dễ cháy. Bảo quản nơi thoáng mát.	Can HDPE 5L	2026-07-03 16:03:51.87+07	2026-07-03 16:03:51.87+07
7	xterm-system	Hệ Thống Xterm	8	Trạm bả chống mối ngầm Xterm – hệ thống bảo vệ công trình toàn diện.	Xterm là hệ thống trạm bả mối thế hệ mới sử dụng hoạt chất Hexaflumuron, có khả năng tiêu diệt cả tổ mối thay vì chỉ những con riêng lẻ. Lý tưởng cho công trình mới, biệt thự, kho hàng và di tích lịch sử.	31	Bả gỗ tẩm Hexaflumuron 0.5% trong vỏ trạm HDPE.	Lắp đặt trạm bả cách công trình 2–3m, kiểm tra định kỳ 1–3 tháng/lần.	Chỉ kỹ thuật viên đã được đào tạo mới được lắp đặt và bảo trì.	Bộ trạm 10–30 trạm/công trình	2026-07-03 16:03:59.198+07	2026-07-03 16:03:59.197+07
8	aqua-resigen-10-4ew-1-lit	Aqua Resigen 10.4EW - 1 lít	8	Chế phẩm hỗ trợ kiểm soát muỗi, ruồi, gián và kiến; phù hợp xử lý côn trùng bay.	Aqua Resigen 10.4EW là chế phẩm diệt côn trùng dùng cho muỗi, ruồi, gián và kiến. Sản phẩm phù hợp cho xử lý không gian, có mùi nhẹ/không mùi theo thông tin mô tả và khả năng tồn lưu trên bề mặt.	2	Permethrin và S-bioallethrin.	Pha loãng và phun không gian hoặc phun tồn lưu theo đúng liều lượng trên nhãn; xử lý nơi muỗi, ruồi và côn trùng xuất hiện.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
9	cislin-2-5ec-1-lit	Cislin 2.5EC - 1 lít	5	Chế phẩm xử lý mối, mọt với hoạt chất Deltamethrin 2,5%.	Cislin 2.5EC là chế phẩm dùng để phòng trừ và xử lý mối, mọt. Theo thông tin sản phẩm, thuốc có hiệu lực tồn lưu và phù hợp cho các nhu cầu xử lý mối/mọt tại công trình, nhà ở và khu vực cần bảo vệ.	2	Deltamethrin 2,5% (25 g/L).	Pha và xử lý tại khu vực có mối/mọt theo đúng định mức, quy trình kỹ thuật và hướng dẫn trên nhãn.	Thi công theo hướng dẫn kỹ thuật và quy định an toàn; khuyến nghị do đơn vị chuyên môn thực hiện. Không để sản phẩm tiếp xúc thực phẩm, trẻ em và vật nuôi.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
10	fludora-co-max-insecticide-1-lit	Fludora Co-Max Insecticide - 1 lít	8	Giải pháp đặc trị muỗi kháng pyrethroid với cơ chế kép.	Fludora Co-Max Insecticide kết hợp Flupyradifurone và Transfluthrin, tạo cơ chế tác động kép. Sản phẩm được mô tả hỗ trợ xử lý muỗi kháng, đặc biệt là muỗi kháng pyrethroid, đồng thời góp phần hạn chế sự phát triển tính kháng.	2	Transfluthrin 4,87% w/w và Flupyradifurone 2,44% w/w.	Sử dụng theo đúng hướng dẫn kỹ thuật, liều lượng và khu vực áp dụng ghi trên nhãn sản phẩm.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
11	suspend-flexx-insecticide-500ml	Suspend Flexx Insecticide - 500ml	8	Thuốc phun tồn lưu đa bề mặt với công nghệ Partix.	Suspend Flexx Insecticide sử dụng hoạt chất Deltamethrin và công nghệ Partix, hỗ trợ xử lý côn trùng trên nhiều bề mặt vật liệu. Theo mô tả, sản phẩm phun tồn lưu, không mùi và ít gây kích ứng khi sử dụng đúng hướng dẫn.	2	Deltamethrin 2,45%.	Pha và phun tồn lưu trên bề mặt theo đúng hướng dẫn trên nhãn; tập trung vào khu vực côn trùng thường di chuyển hoặc trú ẩn.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 500 ml.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
12	racumin-0-75-tp-goi	Racumin 0.75 TP Bayer - gói	4	Thuốc diệt chuột dạng bột chứa Coumatetralyl.	Racumin 0.75 TP là sản phẩm diệt chuột dạng bột. Có thể dùng tại đường đi của chuột hoặc trộn với thức ăn theo hướng dẫn; phù hợp cho khu vực nhà ở, trại chăn nuôi, khuôn viên và ngoài vườn khi được sử dụng đúng cách.	2	Coumatetralyl 7,5 g/kg.	Đặt hoặc trộn mồi theo đúng hướng dẫn trên nhãn, ưu tiên đặt trong hộp bả hoặc vị trí chuột thường xuất hiện.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Gói lẻ.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
13	racumin-0-75-tp-kg	Racumin 0.75 TP Bayer - 1 kg	4	Racumin dạng bột quy cách 1 kg, dùng kiểm soát chuột theo hướng dẫn.	Racumin 0.75 TP là sản phẩm diệt chuột dạng bột chứa Coumatetralyl. Phiên bản quy cách 1 kg phù hợp nhu cầu xử lý diện tích lớn hơn, sử dụng tại đường đi hoặc trong mồi theo hướng dẫn ghi trên nhãn.	2	Coumatetralyl 7,5 g/kg.	Đặt hoặc trộn mồi theo đúng hướng dẫn trên nhãn, ưu tiên đặt trong hộp bả hoặc vị trí chuột thường xuất hiện.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Túi/hộp 1 kg.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
14	gel-diet-gian-blattanex	Gel Diệt Gián Blattanex	7	Bả gel chứa Imidacloprid, hỗ trợ xử lý gián Đức và gián Mỹ.	Blattanex là bả diệt gián dạng gel với hoạt chất Imidacloprid. Sản phẩm được phát triển cho việc kiểm soát các loài gián phổ biến, trong đó có gián Đức và gián Mỹ, phù hợp đặt tại vị trí gián kiếm ăn, trú ẩn và đường đi.	2	Imidacloprid 2,15%.	Chấm/đặt bả tại khe kẽ, góc tủ, đường đi và nơi gián hoạt động theo hướng dẫn trên nhãn; kiểm tra và bổ sung khi cần.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp bả gel.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
15	maxforce-quantum-0-03	Maxforce Quantum 0.03%	6	Gel diệt kiến dạng tuýp 12g với hoạt chất Imidacloprid.	Maxforce Quantum là gel diệt kiến dạng tuýp 12g, sử dụng hoạt chất Imidacloprid 0,03%. Đầu tuýp nhỏ hỗ trợ đặt bả ở góc hẹp; sản phẩm hướng tới xử lý kiến thông qua mồi bả đặt đúng vị trí.	2	Imidacloprid 0,03% w/w.	Chấm bả tại đường đi, vị trí kiến kiếm ăn và khu vực kín, khô ráo theo hướng dẫn trên nhãn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp 12 g.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
16	pesguard-fg161-1-lit	Pesguard FG161 - 1 lít	8	Chế phẩm kiểm soát muỗi, ruồi, kiến và gián trong gia dụng, y tế.	Pesguard FG161 là chế phẩm dùng để kiểm soát muỗi, ruồi, kiến và gián trong môi trường gia dụng và y tế. Sản phẩm chứa d-tetramethrin và Cyphenothrin; thông tin mô tả nêu hoạt chất Cyphenothrin được WHO khuyên dùng.	2	d-Tetramethrin 4,43% w/w và Cyphenothrin 13,30% w/w.	Pha và phun theo liều lượng, phương pháp và khu vực áp dụng ghi trên nhãn sản phẩm.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
17	sumipro-ew-1-lit	Sumipro EW - 1 lít	8	Chế phẩm diệt muỗi, ruồi dùng phun không gian hoặc phun mù nóng.	Sumipro EW là chế phẩm kiểm soát muỗi và ruồi trong gia dụng, y tế. Sản phẩm được mô tả dùng cho phun không gian hoặc phun mù nóng, hỗ trợ phòng ngừa các bệnh do muỗi, ruồi truyền khi áp dụng đúng hướng dẫn.	2	Metofluthrin 0,1%; d,d,t-Cyphenothrin 6%; Piperonyl butoxide 10%.	Pha và phun không gian hoặc phun mù nóng theo đúng hướng dẫn kỹ thuật và liều lượng ghi trên nhãn.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
18	sumithrin-10sec-1-lit	Sumithrin 10SEC - 1 lít	8	Chế phẩm diệt muỗi và côn trùng, có khả năng tồn lưu trên bề mặt.	Sumithrin 10SEC là chế phẩm hỗ trợ kiểm soát muỗi và một số côn trùng. Theo thông tin mô tả, sản phẩm không màu, có mùi nhẹ khi pha nước, có khả năng tồn lưu và hạn chế để lại vết ố trên bề mặt khi sử dụng đúng hướng dẫn.	2	D-phenothrin 10% và chất phụ gia vừa đủ.	Pha và phun theo hướng dẫn trên nhãn; lựa chọn phương pháp xử lý phù hợp với khu vực và đối tượng cần kiểm soát.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
19	nyguard-140ml	NyGuard - 140ml	3	Giải pháp kiểm soát vòng đời côn trùng với hoạt chất Pyriproxyfen.	NyGuard được mô tả là giải pháp kiểm soát dịch hại bằng cách ngăn ấu trùng phát triển thành trưởng thành. Sản phẩm có thể hỗ trợ kiểm soát gián, muỗi, bọ chét và có thể phối hợp với sản phẩm xử lý côn trùng trưởng thành theo hướng dẫn kỹ thuật.	2	Pyriproxyfen.	Pha theo hướng dẫn trên nhãn; có thể phối hợp với sản phẩm xử lý côn trùng trưởng thành khi được tư vấn bởi kỹ thuật viên.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 140 ml; theo mô tả có thể pha 520 lít nước.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
20	wazary-10sc-1-lit	Wazary 10SC - 1 lít	5	Thuốc phòng trừ mối cho công trình với hoạt chất Fenvalerate.	Wazary 10SC là sản phẩm phòng trừ mối cho công trình xây dựng của Sumitomo. Hoạt chất Fenvalerate được mô tả có tác động mạnh với côn trùng; sản phẩm phù hợp triển khai theo quy trình xử lý mối cho công trình.	2	Fenvalerate 10% w/w (100 g/L).	Pha và xử lý khu vực cần phòng trừ mối theo đúng định mức, quy trình kỹ thuật và hướng dẫn trên nhãn.	Thi công theo hướng dẫn kỹ thuật và quy định an toàn; khuyến nghị do đơn vị chuyên môn thực hiện. Không để sản phẩm tiếp xúc thực phẩm, trẻ em và vật nuôi.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
21	he-thong-xterm	Hệ Thống Xterm	5	Hệ thống trạm bả mối ngầm, hỗ trợ bảo vệ công trình toàn diện.	Hệ thống Xterm là giải pháp trạm bả mối thế hệ mới, sử dụng bả gỗ tẩm Hexaflumuron. Hệ thống phù hợp triển khai bảo vệ công trình, biệt thự, kho hàng và khu vực có nguy cơ mối; cần được kiểm tra, bảo trì theo lịch kỹ thuật.	2	Bả gỗ tẩm Hexaflumuron 0,5% trong vỏ trạm HDPE.	Lắp đặt trạm bả cách công trình khoảng 2-3 m; kiểm tra định kỳ 1-3 tháng/lần theo kế hoạch kỹ thuật.	Chỉ kỹ thuật viên đã được đào tạo mới được lắp đặt và bảo trì. Đặt trạm tại vị trí an toàn, tránh ảnh hưởng đến công trình và khu vực sinh hoạt.	Bộ trạm 10-30 trạm/công trình.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
22	icon-10cs-goi-62-5ml	Icon 10CS - gói 62,5ml	8	Thuốc diệt côn trùng hỗ trợ kiểm soát muỗi, ruồi, gián và côn trùng khác.	Icon 10CS quy cách gói 62,5 ml là chế phẩm dùng để kiểm soát muỗi, ruồi, gián và côn trùng. Theo mô tả, sản phẩm có mùi nhẹ và được giới thiệu có mức độ an toàn, chất lượng được WHO và FAO ghi nhận.	2	Lambda-cyhalothrin 10% (100 g/L).	Pha và phun theo liều lượng, phương pháp áp dụng và hướng dẫn trên nhãn sản phẩm.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Gói 62,5 ml.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
23	icon-2-5ew-250ml	Icon 2.5EW - 250ml	8	Thuốc diệt côn trùng hỗ trợ xử lý muỗi, kiến, gián, ruồi, bọ chét và ve.	Icon 2.5EW là chế phẩm kiểm soát côn trùng có thể sử dụng trên nhiều bề mặt như tường, vách và các bề mặt tiếp xúc. Theo mô tả, sản phẩm hỗ trợ xử lý muỗi, kiến, gián, ruồi, bọ chét, bọ ve và nhện, đồng thời hạn chế ảnh hưởng màu bề mặt khi sử dụng đúng hướng dẫn.	2	Lambda-cyhalothrin (dạng 2,5EW).	Pha và phun tồn lưu lên bề mặt theo hướng dẫn trên nhãn; không phun trực tiếp lên thực phẩm, người hoặc vật nuôi.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 250 ml.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
24	icon-10cs-1-lit	Icon 10CS - 1 lít	8	Chế phẩm kiểm soát muỗi, ruồi, gián dạng 10CS.	Icon 10CS là chế phẩm hỗ trợ kiểm soát muỗi, ruồi và gián. Theo mô tả, sản phẩm có mùi nhẹ hơn một số sản phẩm cùng loại; được giới thiệu phù hợp cho nhu cầu xử lý côn trùng khi sử dụng đúng hướng dẫn.	2	Lambda-cyhalothrin (dạng 10CS).	Pha và phun theo hướng dẫn trên nhãn; lựa chọn khu vực xử lý phù hợp với đối tượng côn trùng.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
25	icon-2-5cs-1-lit	Icon 2.5CS - 1 lít	8	Thuốc phun kiểm soát côn trùng bay và bò trong nhà.	Icon 2.5CS là thuốc phun hỗ trợ kiểm soát phần lớn các loài côn trùng bay và bò xuất hiện trong nhà. Theo mô tả, sản phẩm không mùi và ít gây kích ứng da khi sử dụng đúng hướng dẫn.	2	Lambda-cyhalothrin (dạng 2,5CS).	Pha và phun lên khu vực côn trùng hoạt động hoặc trú ẩn theo đúng hướng dẫn trên nhãn.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
26	imperator-50ec-1-lit	Imperator 50EC - 1 lít	8	Giải pháp kiểm soát muỗi và côn trùng với Permethrin 50%.	Imperator 50EC là sản phẩm chứa Permethrin 50%, được Syngenta phát triển từ dòng sản phẩm tiền thân của Zeneca. Sản phẩm được mô tả phù hợp nhu cầu kiểm soát muỗi và côn trùng khi sử dụng đúng hướng dẫn.	2	Permethrin 50% (500 g/L).	Pha và phun theo đúng liều lượng, phương pháp xử lý và hướng dẫn trên nhãn.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Thùng 12 chai x 1 lít; bán lẻ chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
27	imperator-50ec-100ml	Imperator 50EC - 100ml	8	Imperator 50EC quy cách 100ml, chứa Permethrin 50%.	Imperator 50EC quy cách 100 ml là sản phẩm chứa Permethrin 50%, được mô tả như giải pháp kiểm soát muỗi và côn trùng. Phiên bản dung tích nhỏ phù hợp nhu cầu sử dụng theo quy mô xử lý.	2	Permethrin 50% (500 g/L).	Pha và phun theo đúng liều lượng, phương pháp xử lý và hướng dẫn trên nhãn.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Thùng 100 chai x 100 ml; bán lẻ chai 100 ml.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
28	optigard-ab-100	Optigard AB 100	6	Bả diệt kiến chứa Thiamethoxam, có cơ chế lan truyền trong đàn.	Optigard AB 100 là bả diệt kiến với hoạt chất Thiamethoxam. Theo thông tin mô tả, bả có tác động chậm để kiến thợ có thể mang mồi về tổ và truyền trong đàn; mật độ kiến có thể giảm sau vài ngày nếu đặt bả đúng vị trí.	2	Thiamethoxam.	Đặt bả tại đường đi, điểm kiến kiếm ăn và khu vực kiến hoạt động; không để bả bị nước hoặc bụi bẩn làm giảm hấp dẫn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp bả gel.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
29	optigard-cockroach	Bả Diệt Gián Optigard Cockroach	7	Bả gel cô đặc cho gián Mỹ, gián Đức và gián Phương Đông.	Optigard Cockroach là sản phẩm bả gel cô đặc đóng gói dạng bơm tiêm. Sản phẩm được mô tả là giải pháp xử lý các loài gián phổ biến trong nhà như gián Mỹ, gián Đức và gián Phương Đông.	2	Emamectin benzoate.	Chấm/đặt bả tại khe kẽ, góc tủ, khu vực gián kiếm ăn và nơi trú ẩn theo hướng dẫn trên nhãn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp/bơm tiêm bả gel.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
30	advion-cockroach	Bả Diệt Gián Advion Cockroach	7	Bả gel diệt gián với hoạt chất Indoxacarb, hỗ trợ hiệu ứng lan truyền.	Advion Cockroach là bả diệt gián dạng gel. Theo mô tả, sản phẩm có mồi hấp dẫn gián ăn và hỗ trợ hiệu ứng lan truyền tại nơi gián trú ẩn; phù hợp đặt tại khu vực gián hoạt động trong nhà.	2	Indoxacarb.	Chấm/đặt bả gel tại nơi gián kiếm ăn, đường đi và khe kẽ theo đúng hướng dẫn trên nhãn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp bả gel.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
31	arilon-insecticide-200g	Arilon Insecticide - 200g	7	Chế phẩm diệt côn trùng chứa Indoxacarb 20% w/w.	Arilon Insecticide là chế phẩm kiểm soát côn trùng chứa Indoxacarb 20% w/w. Theo mô tả, sản phẩm phù hợp cho môi trường sinh hoạt và sản xuất, với mục tiêu kiểm soát một số côn trùng gây hại khi sử dụng theo hướng dẫn.	2	Indoxacarb 20% w/w.	Sử dụng theo đúng hướng dẫn trên nhãn, phương pháp và khu vực áp dụng do nhà sản xuất khuyến nghị.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Hộp 200 g.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
32	klerat-goi-50g	Bả Chuột Klerat - gói 50g	4	Bả chuột dạng viên nén chứa Brodifacoum 0,005%.	Klerat 0.005% Wax Block Bait là bả trừ chuột đơn liều dạng viên nén. Theo mô tả, hoạt chất Brodifacoum có cơ chế chống đông máu; sản phẩm có mùi vị hấp dẫn với chuột và phù hợp đặt tại khu vực chuột hoạt động.	2	Brodifacoum 0,005%.	Đặt bả tại đường đi hoặc điểm chuột xuất hiện theo hướng dẫn; ưu tiên dùng hộp bả ở vị trí an toàn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Gói 50 g.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
33	klerat-1kg	Bả Chuột Klerat - 1 kg	4	Bả chuột dạng viên nén quy cách 1 kg, chứa Brodifacoum.	Klerat 0.005% Wax Block Bait là bả trừ chuột đơn liều dạng viên nén. Phiên bản quy cách 1 kg phù hợp cho nhu cầu xử lý khu vực rộng hơn, sử dụng theo hướng dẫn để đảm bảo an toàn.	2	Brodifacoum 0,005%.	Đặt bả tại đường đi hoặc điểm chuột xuất hiện theo hướng dẫn; ưu tiên dùng hộp bả ở vị trí an toàn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Túi 1 kg.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
34	bithor-dual-action-1-lit	Bithor Dual Action Insecticide - 1 lít	3	Chế phẩm hai hoạt chất hỗ trợ xử lý muỗi, gián, kiến, rệp giường và bọ chét.	Bithor Dual Action chứa Bifenthrin và Imidacloprid, được mô tả dùng cho các loài côn trùng trong nhà như muỗi, gián, kiến, rệp giường và bọ chét. Theo thông tin sản phẩm, chế phẩm có thể cho hiệu quả tồn lưu kéo dài khi sử dụng đúng hướng dẫn.	2	Bifenthrin 4,5% và Imidacloprid 5,5%.	Pha và phun tồn lưu theo hướng dẫn trên nhãn; xử lý khe kẽ, chân tường và nơi côn trùng hoạt động.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
35	permethor-shield-1-lit	Permethor Shield Liquid Insecticide - 1 lít	8	Chế phẩm Permethrin 50% hỗ trợ kiểm soát muỗi, gián, kiến và ruồi.	Permethor Shield là chế phẩm chứa Permethrin 50%, được mô tả dùng để kiểm soát muỗi, gián, kiến và ruồi trong nhà. Sản phẩm thuộc dòng EC, có mùi nhẹ và cần pha theo tỷ lệ nhà sản xuất quy định.	2	Permethrin 50% w/v (500 g/L).	Pha theo tỷ lệ ghi trên nhãn và phun tại khu vực côn trùng hoạt động; không tự ý tăng nồng độ.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
36	maxxthor-100-1-lit	Maxxthor 100 - 1 lít	3	Chế phẩm Bifenthrin 100 g/L hỗ trợ kiểm soát nhiều loại côn trùng.	Maxxthor 100 là chế phẩm kiểm soát côn trùng của Ensystex, được mô tả có khả năng xử lý ruồi, muỗi, kiến, gián, rệp và bọ chét trong gia dụng/y tế. Sản phẩm không mùi và có hiệu lực tồn lưu khi áp dụng đúng hướng dẫn.	2	Bifenthrin 100 g/L.	Pha và phun theo đúng hướng dẫn trên nhãn; xử lý khu vực côn trùng hoạt động, trú ẩn và đường di chuyển.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
37	ecothor-xua-duoi-ran	Ecothor Xua Đuổi Rắn	2	Dung dịch xua đuổi rắn và thằn lằn từ tinh dầu thực vật.	Ecothor là dung dịch xua đuổi rắn chuyên dụng, được mô tả có tác dụng hỗ trợ xua đuổi rắn và thằn lằn. Sản phẩm sử dụng chiết xuất tinh dầu thực vật và phù hợp tạo vùng xua đuổi quanh khu vực cần bảo vệ.	2	Tinh dầu thực vật thiên nhiên.	Phun quanh chu vi khu vực cần bảo vệ theo hướng dẫn trên nhãn; duy trì lại vùng xử lý khi điều kiện thời tiết hoặc môi trường làm giảm tác dụng.	Dùng theo hướng dẫn trên nhãn; không để sản phẩm tiếp xúc thực phẩm, trẻ em và vật nuôi. Bảo quản nơi khô ráo, tránh ánh nắng.	Chai dung dịch.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
38	requiem-1rb	Bả Diệt Mối Requiem 1RB	5	Bả diệt mối chứa Chlorfluazuron, hỗ trợ dẫn dụ và xử lý đàn mối.	Requiem 1RB là bả diệt mối và phòng chống mối cho công trình. Theo mô tả, sản phẩm có khả năng dẫn dụ mối ăn bả và hỗ trợ cơ chế lây truyền trong đàn, phù hợp triển khai trong quy trình kiểm soát mối chuyên nghiệp.	2	Chlorfluazuron.	Đặt bả trong quy trình xử lý mối theo hướng dẫn kỹ thuật; kiểm tra, thay bả và theo dõi hoạt động mối theo kế hoạch.	Thi công theo hướng dẫn kỹ thuật và quy định an toàn; khuyến nghị do đơn vị chuyên môn thực hiện. Không để sản phẩm tiếp xúc thực phẩm, trẻ em và vật nuôi.	Bán theo kg.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
39	fumithor-delta-40g	Fumithor Delta Insecticide Smoke Generator - 40g	3	Thiết bị tạo khói hỗ trợ xử lý côn trùng tại khe hở và khu vực khó tiếp cận.	Fumithor Delta sử dụng khói với hạt nhỏ để đi vào vết nứt, khe hở và những nơi côn trùng ẩn náu. Theo mô tả, hoạt chất Deltamethrin có thể bám trên bề mặt để hỗ trợ xử lý khu vực khó tiếp cận bằng phun thông thường.	2	Deltamethrin.	Kích hoạt theo hướng dẫn của nhà sản xuất, đóng kín khu vực xử lý trong thời gian yêu cầu và thông khí kỹ trước khi sử dụng lại.	Chỉ sử dụng tại khu vực có thể cô lập. Rời khỏi khu vực khi kích hoạt, ngắt nguồn lửa/điện theo hướng dẫn và thông khí kỹ trước khi quay lại.	Lon 40 g.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
40	diathor-flowable	Diathor Flowable	3	Bột xử lý gián và rệp giường với Amorphous Silicon Dioxide.	Diathor Flowable là giải pháp dạng bột cho gián và rệp giường, sử dụng silica vô định hình. Theo mô tả, sản phẩm tác động bằng cách làm tổn hại lớp bảo vệ bên ngoài và khiến côn trùng mất nước; lớp bột có thể tồn lưu khi không bị xáo trộn.	2	100% Amorphous Silicon Dioxide.	Dùng dụng cụ phù hợp để phủ lớp bột mỏng tại khe hở, vị trí gián/rệp trú ẩn; tránh rải dày hoặc nơi ẩm ướt.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Hộp bột.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
41	dung-cu-phun-diathor	Dụng Cụ Phun Diathor Flowable	1	Thiết bị bóp bóng cao su hỗ trợ phun bột Diathor vào khe hở.	Dụng cụ phun Diathor Flowable sử dụng cơ chế bóp bóng cao su để tạo áp suất và đẩy bột từ bình chứa qua vòi. Bộ sản phẩm có các ống vòi với đường kính khác nhau, hỗ trợ đưa bột vào khe hở và vị trí khó tiếp cận.	2	Không áp dụng.	Lắp đúng vòi phù hợp, cho lượng bột vừa đủ và bóp bóng để phun lớp mỏng vào vị trí cần xử lý; làm sạch đầu vòi sau khi dùng.	Sử dụng đúng loại bột/thiết bị, đeo khẩu trang và kính bảo hộ khi thao tác. Làm sạch thiết bị sau khi dùng và bảo quản nơi khô ráo.	Bộ dụng cụ/hộp.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
42	zenithor-gel-cockroach-bait	Bả Diệt Gián Zenithor Gel Cockroach Bait	7	Bả gel diệt gián chứa Indoxacarb của Ensystex.	Zenithor Gel Cockroach Bait là sản phẩm bả gel chứa Indoxacarb, hướng tới kiểm soát gián ngay trong môi trường sống và nơi chúng trú ẩn. Nên đặt bả tại vị trí gián kiếm ăn, di chuyển hoặc ẩn náu theo hướng dẫn.	2	Indoxacarb.	Chấm/đặt bả gel tại khu vực gián kiếm ăn, trú ẩn và đường đi; kiểm tra, thay mới theo hướng dẫn khi cần.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp bả gel.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
43	mythic-240cs-1-lit	Mythic 240CS - 1 lít	5	Chế phẩm trừ mối chứa Chlorfenapyr 240 g/L cho công trình.	Mythic 240CS là chế phẩm trừ mối của BASF dùng cho nhà ở và công trình xây dựng. Theo mô tả, sản phẩm hỗ trợ xử lý và phòng ngừa mối tấn công khi thi công đúng quy trình kỹ thuật.	2	Chlorfenapyr 240 g/L.	Pha và xử lý theo quy trình phòng trừ mối, định mức và hướng dẫn kỹ thuật trên nhãn sản phẩm.	Thi công theo hướng dẫn kỹ thuật và quy định an toàn; khuyến nghị do đơn vị chuyên môn thực hiện. Không để sản phẩm tiếp xúc thực phẩm, trẻ em và vật nuôi.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
44	stmed-permethrin-50ec-1-lit	STMED Permethrin 50EC - 1 lít	8	Chế phẩm trừ muỗi và côn trùng chứa Permethrin 50%.	STMED Permethrin 50EC là chế phẩm trừ muỗi và côn trùng do Agropharm (Anh Quốc) sản xuất theo thông tin mô tả. Sản phẩm được giới thiệu dùng trong công tác phòng ngừa các bệnh do muỗi truyền, sử dụng theo đúng hướng dẫn và quy định an toàn.	2	Permethrin 50% và chất nhũ dầu.	Pha và phun theo hướng dẫn trên nhãn, phù hợp với mục tiêu kiểm soát muỗi/côn trùng tại khu vực xử lý.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
45	cypado-25ec-1-lit	Cypado 25EC - 1 lít	8	Chế phẩm dạng EC hỗ trợ kiểm soát muỗi, ruồi, gián và kiến.	Cypado 25EC là chế phẩm dạng nhũ dầu do Ea Chem (Việt Nam) sản xuất theo công nghệ Nhật Bản, theo thông tin mô tả. Sản phẩm hỗ trợ phòng trừ muỗi, ruồi, gián, kiến và các côn trùng gây hại khác trong nhà.	2	Cypermethrin 10% w/w.	Pha và phun theo đúng tỷ lệ trên nhãn; xử lý khu vực côn trùng xuất hiện và tuân thủ hướng dẫn an toàn.	Đọc kỹ nhãn và sử dụng đúng hướng dẫn. Mang bảo hộ phù hợp; để xa trẻ em, thực phẩm, nguồn nước và vật nuôi. Không dùng cho mục đích khác.	Chai 1 lít.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
46	ecothor-nature-cide-granular-9kg	Ecothor Nature-Cide Granular - thùng 9kg	2	Sản phẩm dạng hạt từ tinh dầu tuyết tùng và quế, hỗ trợ xua đuổi rắn và thằn lằn.	EcoThor Nature-Cide Granular là dòng sản phẩm dạng hạt chuyên dụng xua đuổi rắn và thằn lằn. Theo mô tả, sản phẩm dùng tinh dầu tuyết tùng và tinh dầu quế để tạo hàng rào mùi xua đuổi quanh khu vực sinh sống, sân vườn, biệt thự hoặc khu nghỉ dưỡng.	2	Cedarwood oil 2,92% w/w và Cinnamon oil 1,47% w/w.	Rải đều hạt quanh chu vi hoặc khu vực cần bảo vệ theo hướng dẫn trên nhãn; bổ sung lại khi điều kiện môi trường làm suy giảm lớp hạt.	Dùng theo hướng dẫn trên nhãn; không để sản phẩm tiếp xúc thực phẩm, trẻ em và vật nuôi. Bảo quản nơi khô ráo, tránh ánh nắng.	Thùng 9 kg.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
47	seclira-gel	Seclira Gel	7	Bả gel diệt gián chứa Dinotefuran 0,5% w/v.	Seclira là bả gel kiểm soát gián Đức và gián Mỹ cho nhà ở, căn hộ, khách sạn, trường học, bệnh viện, siêu thị và cơ sở sản xuất. Theo mô tả, sản phẩm có cơ chế lan truyền và có thể hỗ trợ xử lý gián non lẫn gián trưởng thành.	2	Dinotefuran 0,5% w/v.	Chấm/đặt bả tại vị trí gián kiếm ăn, đường đi, khe kẽ và khu vực trú ẩn theo hướng dẫn trên nhãn.	Đặt bả ngoài tầm với của trẻ em và vật nuôi. Không để bả tiếp xúc thực phẩm; thu gom bao bì, bả thừa và xác côn trùng/chuột theo hướng dẫn.	Tuýp bả gel.	2026-07-04 15:27:49.426+07	2026-07-04 15:27:49.426+07
\.


--
-- TOC entry 5301 (class 0 OID 26073)
-- Dependencies: 239
-- Data for Name: products_certifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_certifications (_order, _parent_id, id, value) FROM stdin;
1	1	6a477ae2a0b2bd58a0cfd844	Đăng ký lưu hành Bộ Y Tế Việt Nam
2	1	6a477ae2a0b2bd58a0cfd845	Chứng nhận ISO 9001:2015
3	1	6a477ae2a0b2bd58a0cfd846	Tuân thủ WHO Pesticide Evaluation Scheme
1	2	6a477ae8a0b2bd58a0cfd84f	Đăng ký Bộ Y Tế Việt Nam
2	2	6a477ae8a0b2bd58a0cfd850	WHOPES recommended
1	3	6a477aeca0b2bd58a0cfd857	WHO BCPC accepted
2	3	6a477aeca0b2bd58a0cfd858	Đăng ký Bộ Y Tế VN
1	4	6a477af0a0b2bd58a0cfd85f	Đăng ký Bộ Y Tế VN
2	4	6a477af0a0b2bd58a0cfd860	ISO 9001:2015
1	5	6a477af4a0b2bd58a0cfd867	Đăng ký Bộ Y Tế VN
1	6	6a477af7a0b2bd58a0cfd86d	WHO PES
2	6	6a477af7a0b2bd58a0cfd86e	Đăng ký Bộ Y Tế VN
1	7	6a477affa0b2bd58a0cfd875	EPA US Registered
2	7	6a477affa0b2bd58a0cfd876	WHO Approved
1	16	9864fc765f5a48a9ae010985	WHO khuyến nghị hoạt chất Cyphenothrin (theo mô tả sản phẩm)
1	21	8de095a9ce2544809b3e0720	EPA US Registered
2	21	b7227e5f20c443eca9e3dcb0	WHO Approved
1	22	38cef716db91495b93a3ee0c	WHO và FAO ghi nhận theo mô tả sản phẩm
1	24	4da11f0984be4aae9042edd8	WHO và FAO ghi nhận theo mô tả sản phẩm
\.


--
-- TOC entry 5306 (class 0 OID 26120)
-- Dependencies: 244
-- Data for Name: products_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_rels (id, "order", parent_id, path, media_id) FROM stdin;
1	1	1	galleryImages	11
2	2	1	galleryImages	12
3	3	1	galleryImages	13
4	4	1	galleryImages	14
5	1	2	galleryImages	16
6	2	2	galleryImages	17
7	3	2	galleryImages	18
8	1	3	galleryImages	20
9	2	3	galleryImages	21
10	1	4	galleryImages	23
11	2	4	galleryImages	24
12	1	5	galleryImages	26
13	2	5	galleryImages	27
14	1	6	galleryImages	29
15	2	6	galleryImages	30
16	1	7	galleryImages	32
17	2	7	galleryImages	33
18	3	7	galleryImages	34
\.


--
-- TOC entry 5300 (class 0 OID 26061)
-- Dependencies: 238
-- Data for Name: products_specs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_specs (_order, _parent_id, id, label, value) FROM stdin;
1	1	6a477ae2a0b2bd58a0cfd83f	Hoạt chất	Permethrin 10% + Sumithrin 1%
2	1	6a477ae2a0b2bd58a0cfd840	Dạng pha chế	EW – Nhũ dầu trong nước
3	1	6a477ae2a0b2bd58a0cfd841	Quy cách	Chai 1L, can 5L, can 20L
4	1	6a477ae2a0b2bd58a0cfd842	Hạn sử dụng	36 tháng
5	1	6a477ae2a0b2bd58a0cfd843	Đăng ký	VN-1234-2024 (Bộ Y Tế)
1	2	6a477ae8a0b2bd58a0cfd84b	Hoạt chất	Sumithrin (d-Phenothrin) 10%
2	2	6a477ae8a0b2bd58a0cfd84c	Dạng pha chế	SEC – Suspo-emulsion concentrate
3	2	6a477ae8a0b2bd58a0cfd84d	Quy cách	Chai 1L, can 5L
4	2	6a477ae8a0b2bd58a0cfd84e	Hạn sử dụng	24 tháng
1	3	6a477aeca0b2bd58a0cfd854	Hoạt chất	Permethrin 13% + d-Tetramethrin 3.3%
2	3	6a477aeca0b2bd58a0cfd855	Dạng pha chế	FG – Flowable concentrate
3	3	6a477aeca0b2bd58a0cfd856	Quy cách	Chai 1L
1	4	6a477af0a0b2bd58a0cfd85c	Hoạt chất	Permethrin 50%
2	4	6a477af0a0b2bd58a0cfd85d	Dạng pha chế	EC – Emulsifiable concentrate
3	4	6a477af0a0b2bd58a0cfd85e	Quy cách	Can 5L, 20L
1	5	6a477af4a0b2bd58a0cfd864	Hoạt chất	Permethrin 0.25% + Sumithrin 0.05%
2	5	6a477af4a0b2bd58a0cfd865	Dạng pha chế	AL – Aqueous solution (RTU)
3	5	6a477af4a0b2bd58a0cfd866	Quy cách	Bình xịt 500ml, 1L
1	6	6a477af7a0b2bd58a0cfd86a	Hoạt chất	Sumithrin 10% + PBO 10%
2	6	6a477af7a0b2bd58a0cfd86b	Dạng pha chế	EC
3	6	6a477af7a0b2bd58a0cfd86c	Quy cách	Can 5L
1	7	6a477affa0b2bd58a0cfd872	Hoạt chất bả	Hexaflumuron 0.5%
2	7	6a477affa0b2bd58a0cfd873	Dạng	Trạm bả ngầm + bả gỗ
3	7	6a477affa0b2bd58a0cfd874	Vòng đời trạm	5 năm
1	8	4804992216d24302aa0c35a9	Hoạt chất	Permethrin và S-bioallethrin
2	8	be2d9ebbcb554961b7c25df3	Dạng	Dung dịch 10.4EW
3	8	c822c1454a8f432994eda546	Đối tượng xử lý	Muỗi, ruồi, gián, kiến
4	8	9d2acc9619604bc9be3d8165	Hãng sản xuất	Envu
1	9	6869591f1d724a5d8ebfb31c	Hoạt chất	Deltamethrin 2,5% (25 g/L)
2	9	0f1966113c764253b40d1101	Dạng	Dung dịch EC
3	9	390495dac51643f8aaadd3be	Đối tượng xử lý	Mối, mọt
4	9	dd1795a2c47543c0aac072a5	Hãng sản xuất	Bayer/Envu
1	10	29a93c1d0345493b8a966256	Hoạt chất	Transfluthrin 4,87% w/w; Flupyradifurone 2,44% w/w
2	10	c9c677d289134f10a49cf7ad	Dạng	Dung dịch insecticide
3	10	78639dce1b394c03b904de8c	Đối tượng xử lý	Muỗi, đặc biệt muỗi kháng pyrethroid
4	10	d1911426808649289709bac5	Hãng sản xuất	Envu
1	11	4aa18ea9af7845809610b006	Hoạt chất	Deltamethrin 2,45%
2	11	8d50df9b1e82431493b6b1e0	Dạng	Dung dịch phun tồn lưu
3	11	889497fec75949d7ab9c92a2	Đặc điểm	Công nghệ Partix
4	11	d348aaf9f22e496d954ede6b	Hãng sản xuất	Envu
1	12	5a22401cb10844feb4a6ff39	Hoạt chất	Coumatetralyl 7,5 g/kg
2	12	a320ff72060449f8b517f9a3	Dạng	Bột
3	12	5fa149128f58447b8320ce9f	Đối tượng xử lý	Chuột
4	12	2476d82aca4d4881829f7f03	Hãng sản xuất	Envu
1	13	4bd266e58d63471582ec284f	Hoạt chất	Coumatetralyl 7,5 g/kg
2	13	848fa74e6f9c4b1db2dfe6bd	Dạng	Bột
3	13	a304b7e3fdb64b16808ca3e3	Đối tượng xử lý	Chuột
4	13	e112a8f65ac24d33a99551a7	Hãng sản xuất	Envu
1	14	3fabf94bb321444ab5952aab	Hoạt chất	Imidacloprid 2,15%
2	14	72772e37b478439fab1d3d23	Dạng	Bả gel
3	14	f8996e3720a14f8b804c7735	Đối tượng xử lý	Gián Đức, gián Mỹ
4	14	b68add6c908b4295891078f9	Hãng sản xuất	Envu
1	15	c960fbc6a4f2420b84c609e2	Hoạt chất	Imidacloprid 0,03% w/w
2	15	a1a7cdad8a024b69a8462ec0	Dạng	Bả gel
3	15	de6ddc35faf84a1197284990	Đối tượng xử lý	Kiến
4	15	1809a8be5a2e4e80b1044e83	Hãng sản xuất	Envu
1	16	b158c7040cb54354874ef686	Hoạt chất	d-Tetramethrin 4,43% w/w; Cyphenothrin 13,30% w/w
2	16	aadfca8ec850424196bdab7e	Dạng	Dung dịch insecticide
3	16	3f9f1f86d2444fd98883d1bc	Đối tượng xử lý	Muỗi, ruồi, kiến, gián
4	16	685c276e42fd4318be023699	Hãng sản xuất	Sumitomo
1	17	7981f7ce361e41d38bc0b04e	Hoạt chất	Metofluthrin 0,1%; d,d,t-Cyphenothrin 6%; Piperonyl butoxide 10%
2	17	21f24ef3b9d94a06afcfa541	Dạng	EW
3	17	ba1e997b539e4eb7be058c49	Phương pháp	Phun không gian hoặc phun mù nóng
4	17	485c5d34c263443d8568d152	Hãng sản xuất	Sumitomo
1	18	3b35be49de5b45719252f051	Hoạt chất	D-phenothrin 10%
2	18	e2cfe36b35ea4bbd93bc062b	Dạng	SEC
3	18	0c889f61e23b47638fd777de	Đối tượng xử lý	Muỗi và côn trùng
4	18	371fcfd10650495a8c63981b	Hãng sản xuất	Sumitomo
1	19	b2c096036f264e9287076bea	Hoạt chất	Pyriproxyfen
2	19	94c3f7ce9aa54321bc696f21	Dạng	Dung dịch
3	19	2afb00f97c84428abb03fbdc	Đối tượng xử lý	Gián, muỗi, bọ chét; kiểm soát ấu trùng
4	19	61b3665346974f1cbbdecaa8	Quy cách	140 ml; pha 520 lít nước theo mô tả
1	20	689550ddac7a4f908de21f1c	Hoạt chất	Fenvalerate 10% w/w (100 g/L)
2	20	ddce589a338f40679447819f	Dạng	SC
3	20	4eb6383caff54977b71bfd43	Đối tượng xử lý	Mối
4	20	2325689f44ab4adf87367347	Hãng sản xuất	Sumitomo
1	21	b2a648e57f754956b43b4251	Hoạt chất bả	Hexaflumuron 0,5%
2	21	c613916a34ff40a5bf5d9ec0	Dạng	Trạm bả ngầm + bả gỗ
3	21	96db0535d27749a6b3ac6d65	Vòng đời trạm	5 năm
4	21	93b3f5ce456f43c1a2782953	Hãng sản xuất	Sumitomo
1	22	99724dac8168462695e5c03b	Hoạt chất	Lambda-cyhalothrin 10% (100 g/L)
2	22	3a63f26f5ce14b4ea9c5b450	Dạng	CS
3	22	8560b9c657964a2da894daa2	Đối tượng xử lý	Muỗi, ruồi, gián
4	22	05695bd69a9f45189180206f	Hãng sản xuất	Syngenta
1	23	5e51128459ef41cd99564b7f	Hoạt chất	Lambda-cyhalothrin
2	23	511d2b7bfd9d4de8be434a84	Dạng	2,5EW
3	23	01f31f04dfde4b8881de53da	Đối tượng xử lý	Muỗi, kiến, gián, ruồi, bọ chét, bọ ve, nhện
4	23	b671364f696743949924e6ec	Hãng sản xuất	Syngenta
1	24	edc656ffa42b47579c5205d7	Hoạt chất	Lambda-cyhalothrin
2	24	c16df8c0b846455fa8d314e5	Dạng	10CS
3	24	d241e6dbd5d3404184a66b00	Đối tượng xử lý	Muỗi, ruồi, gián
4	24	13ce6096d8024a74a04ca2bd	Hãng sản xuất	Syngenta
1	25	c2198b8810f84708bf381d27	Hoạt chất	Lambda-cyhalothrin
2	25	79eb6bc5c98d4d97b5dddc37	Dạng	2,5CS
3	25	82396bee18574e0c96f4fee0	Đối tượng xử lý	Côn trùng bay và bò trong nhà
4	25	67186f9cb9da4be38928c2db	Hãng sản xuất	Syngenta
1	26	318570f68520463b9c154de7	Hoạt chất	Permethrin 50% (500 g/L)
2	26	678ffe53af8548f3b44ab7f9	Dạng	50EC
3	26	a4476d1b607949e3a5622b45	Đối tượng xử lý	Muỗi và côn trùng
4	26	7e8f89214f65430889494149	Hãng sản xuất	Syngenta
1	27	ba890e12e9184a399be6c3c3	Hoạt chất	Permethrin 50% (500 g/L)
2	27	f62ade1d3e6743b7969cbf66	Dạng	50EC
3	27	ba64989493fb4f819c847275	Đối tượng xử lý	Muỗi và côn trùng
4	27	55acdc4e24a14bf39b966ea2	Hãng sản xuất	Syngenta
1	28	72fe6fb7cb874ef7b966760a	Hoạt chất	Thiamethoxam
2	28	edc9644306ac4fb38bbf38f2	Dạng	Bả gel
3	28	de19213b9f5e4c2391df64c2	Đối tượng xử lý	Kiến
4	28	b7c29cf4bb1d42f7b22b9276	Cơ chế	Bả có tác động chậm, hỗ trợ lan truyền trong đàn
1	29	61f91508492d405da22d3c30	Hoạt chất	Emamectin benzoate
2	29	9055214aab504e2da8a77574	Dạng	Bả gel/bơm tiêm
3	29	5202a2431cab4a48a98b7dc8	Đối tượng xử lý	Gián Mỹ, gián Đức, gián Phương Đông
4	29	a0d591e385ed45bbba6b76e9	Hãng sản xuất	Syngenta
1	30	b995f548d0724a49bcc1493f	Hoạt chất	Indoxacarb
2	30	8c8e42bc55804f48a9a492da	Dạng	Bả gel
3	30	f9cf8cabab104c9fbe971cab	Đối tượng xử lý	Gián
4	30	099ea53b62ce449bbe9cfef0	Hãng sản xuất	Syngenta
1	31	402c86c8fa864c85ba3e6409	Hoạt chất	Indoxacarb 20% w/w
2	31	7e881b7e24a84704b5ac21a3	Dạng	Chế phẩm insecticide
3	31	f001ea01ad7e4c4d9e42034d	Đối tượng xử lý	Côn trùng gây hại
4	31	7f86628a86f441779147ec3c	Hãng sản xuất	Syngenta
1	32	4c7e1abd05b345dba143672a	Hoạt chất	Brodifacoum 0,005%
2	32	1ca96088c9d0498b90bdaad8	Dạng	Bả viên nén/Wax Block Bait
3	32	68ad64c7ffa54b38a109da31	Đối tượng xử lý	Chuột
4	32	28dc588e31c1436b93e69744	Hãng sản xuất	Syngenta
1	33	ffb19779e89d44ce9dc9d864	Hoạt chất	Brodifacoum 0,005%
2	33	0f12ce7571914525b9721894	Dạng	Bả viên nén/Wax Block Bait
3	33	2012feb681d94effaa337517	Đối tượng xử lý	Chuột
4	33	ea78aef796b54207bdc46f16	Hãng sản xuất	Syngenta
1	34	f91d052edeba4a94b54ff304	Hoạt chất	Bifenthrin 4,5%; Imidacloprid 5,5%
2	34	49da08edf2ee4fd9acaf1ed2	Dạng	Dung dịch insecticide
3	34	cb4d12808cf3475fb0c5a362	Đối tượng xử lý	Muỗi, gián, kiến, rệp giường, bọ chét, bọ ve
4	34	d873a6a0df3c4fb1a792fb33	Tồn lưu	Theo mô tả: đến 6 tháng
1	35	9eeb3b47856242029a42a9a2	Hoạt chất	Permethrin 50% w/v (500 g/L)
2	35	a1c55b0c88a34cb49289aeca	Dạng	EC
3	35	896204d1d1ac464783996b02	Đối tượng xử lý	Muỗi, gián, kiến, ruồi
4	35	ea4a42f7e9f444e9b319896e	Xuất xứ	Hoa Kỳ theo mô tả
1	36	c9f70482a9114ff7a354f072	Hoạt chất	Bifenthrin 100 g/L
2	36	d7653162a6cb4d2e822c0b10	Dạng	Dung dịch insecticide
3	36	fa4960cd61894f14a4ee57d4	Đối tượng xử lý	Ruồi, muỗi, kiến, gián, rệp, bọ chét
4	36	a979b95c53ba4a48ae3a9695	Hãng sản xuất	Ensystex
1	37	03c5a18ef7c84640867f97c2	Hoạt chất	Tinh dầu thực vật thiên nhiên
2	37	632c5305be3b43ce91a1108b	Dạng	Dung dịch
3	37	b104993d94cd4598b038f5f2	Đối tượng	Rắn, thằn lằn
4	37	54541a5b458d40b090f9c5ee	Hãng sản xuất	Ensystex
1	38	4498ca231e064e5386323447	Hoạt chất	Chlorfluazuron
2	38	590c148c78614e9f9c8f3d01	Dạng	Bả diệt mối
3	38	cb84c7e1e02f42bab21d9bcc	Đối tượng xử lý	Mối
4	38	9ce5be44bdc04791a344472f	Hãng sản xuất	Ensystex
1	39	7bd3d9cbdb4d4cf79840c6aa	Hoạt chất	Deltamethrin
2	39	cfcccd64f64e49a38ae6d6c5	Dạng	Smoke generator/lon tạo khói
3	39	8a628f5ad1f34401ae19a7f7	Cỡ hạt	Theo mô tả: 1 micron
4	39	6ea36782bb104a75858ce732	Hãng sản xuất	Ensystex
1	40	60eb19ffc2ee41089044dca2	Hoạt chất	100% Amorphous Silicon Dioxide
2	40	8eef7a2168104b8cb34c71f1	Dạng	Bột siêu mịn
3	40	6ae6fa1967a14dd18c4450ff	Đối tượng xử lý	Gián, rệp giường
4	40	832e7d2f835b44d4a9c9ee0c	Tồn lưu	Theo mô tả: 3 tháng đến 1 năm nếu không bị xáo trộn
1	41	b2380f77581d45ff86075fd4	Cơ chế hoạt động	Bóp bóng cao su tạo áp suất
2	41	5a39c3b03d8942a48f0fbf9e	Vòi phun	Các cỡ 2,0 mm; 2,45 mm; 3,0 mm theo mô tả
3	41	1901a4cc783e49269bedc4be	Ứng dụng	Phun bột Diathor vào khe hở
4	41	85932509135c435383b5fda5	Hãng sản xuất	Ensystex
1	42	7303f0f4533b4fd3ae2abff0	Hoạt chất	Indoxacarb
2	42	88c59403ea9f4cd1bde59d57	Dạng	Bả gel
3	42	31205f365dce4ef497b75e95	Đối tượng xử lý	Gián
4	42	48dfbe7b1f484548af4a781f	Hãng sản xuất	Ensystex
1	43	3a8e2193086447b2a52e0780	Hoạt chất	Chlorfenapyr 240 g/L
2	43	9452f05a6950414c88bc672e	Dạng	240CS
3	43	b6496388c9764b97a37be6d3	Đối tượng xử lý	Mối
4	43	c5672684eb3f4526884c151f	Hãng sản xuất	BASF
1	44	af2f3903be0148bda66e63c4	Hoạt chất	Permethrin 50%
2	44	e796e0fafbf449129bb47a47	Dạng	50EC
3	44	90b1d45224824e56beaac1f8	Đối tượng xử lý	Muỗi và côn trùng
4	44	b8e2f3b05b8f4a6c8083c655	Hãng sản xuất	Agropharm/Pelga
1	45	44fba72feaa1420dac08f66e	Hoạt chất	Cypermethrin 10% w/w
2	45	1b6d1161f494466a92fcebb1	Dạng	25EC
3	45	b4ca23d641f54a0f91e65fca	Đối tượng xử lý	Muỗi, ruồi, gián, kiến
4	45	98fc4808706242be9939edda	Hãng sản xuất	Ea Chem (Việt Nam)
1	46	d0dab789fe2e4833900c2b16	Hoạt chất	Cedarwood oil 2,92% w/w; Cinnamon oil 1,47% w/w
2	46	b58b371193714e3f9d934e64	Dạng	Hạt/Granular
3	46	d60b5a7aa22f4ae58aa59054	Đối tượng	Rắn, thằn lằn
4	46	31b240e3d3424696895614b1	Quy cách	Thùng 9 kg
1	47	147707dd633d4dc4be2da1ba	Hoạt chất	Dinotefuran 0,5% w/v
2	47	e1671395ff8a47fcacee8b22	Dạng	Bả gel
3	47	03d16a581cb649c98bc2ad7d	Đối tượng xử lý	Gián Đức, gián Mỹ
4	47	b99d2a0bb4bb4655a496363d	Hãng sản xuất	BASF
\.


--
-- TOC entry 5302 (class 0 OID 26084)
-- Dependencies: 240
-- Data for Name: products_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_tags (_order, _parent_id, id, value) FROM stdin;
1	1	6a477ae2a0b2bd58a0cfd847	Diệt muỗi
2	1	6a477ae2a0b2bd58a0cfd848	Diệt côn trùng
3	1	6a477ae2a0b2bd58a0cfd849	Pyrethroid
4	1	6a477ae2a0b2bd58a0cfd84a	EW
1	2	6a477ae8a0b2bd58a0cfd851	ULV
2	2	6a477ae8a0b2bd58a0cfd852	Phun tồn lưu
3	2	6a477ae8a0b2bd58a0cfd853	Diệt muỗi
1	3	6a477aeca0b2bd58a0cfd859	Gián
2	3	6a477aeca0b2bd58a0cfd85a	Kiến
3	3	6a477aeca0b2bd58a0cfd85b	Pyrethroid
1	4	6a477af0a0b2bd58a0cfd861	Permethrin
2	4	6a477af0a0b2bd58a0cfd862	EC
3	4	6a477af0a0b2bd58a0cfd863	Dịch vụ chuyên nghiệp
1	5	6a477af4a0b2bd58a0cfd868	Hộ gia đình
2	5	6a477af4a0b2bd58a0cfd869	Ready-to-use
1	6	6a477af7a0b2bd58a0cfd86f	PBO
2	6	6a477af7a0b2bd58a0cfd870	Hiệp đồng
3	6	6a477af7a0b2bd58a0cfd871	ULV
1	7	6a477affa0b2bd58a0cfd877	Mối
2	7	6a477affa0b2bd58a0cfd878	Trạm bả
3	7	6a477affa0b2bd58a0cfd879	Hexaflumuron
1	8	7f282bc6153d44ebb0bc90a8	Muỗi
2	8	f878453f83a34ae0bb30384e	Ruồi
3	8	8d774c87dabe49a399cb9772	Gián
4	8	940f36567ec44f70a3f797ef	Kiến
5	8	ff006777b7354a159d93dbcf	Phun không gian
6	8	b55490cd9fd0459791665c5b	Tồn lưu
7	8	c05c83e2a2e94de1b33e8bea	Envu
1	9	9e9d7bb0ce024625bbcdb8f8	Mối
2	9	ce5e7f086ddf4faebf143656	Mọt
3	9	1097c75bed474942baa6862e	Deltamethrin
4	9	de4fe1aa00704ca8a66c99dc	Xử lý công trình
5	9	41989b05b6a5403ba70c5027	Bayer
6	9	80f239000b3c46e8b853914c	Envu
1	10	874a73a0a9664a69ac12429a	Muỗi kháng
2	10	59e10eb98de0494582ae4964	Cơ chế kép
3	10	e87f031cf0ab448bad0fe7f1	Flupyradifurone
4	10	adef4b2136e34422a7991fa4	Transfluthrin
5	10	ef1f6e94de41461aa352ff68	Envu
1	11	4893ba00c51540e08939305f	Deltamethrin
2	11	96b7474f70044bf999744921	Phun tồn lưu
3	11	3eae1a63bc9842369904fd9b	Công nghệ Partix
4	11	a88c99c6956a4a9eac3fb3e5	Đa bề mặt
5	11	6b2e3a3ac6d1425b8d7781aa	Envu
1	12	82b61cecd466496b98530936	Chuột
2	12	2a0167976abb401db96b939f	Coumatetralyl
3	12	62c8f70ff2b74d578f68d854	Dạng bột
4	12	0de32b5bc3f8426d9ce749d3	Bả chuột
5	12	4f2cd853be6c4e38a26393fd	Envu
1	13	002cda02e5604b82a62af0b4	Chuột
2	13	931b27e5b58d4c6f8ae4af8c	Coumatetralyl
3	13	dec502b8637341399ac14ae4	Dạng bột
4	13	ed0fd5b1f0094a1e9432ba57	Bả chuột
5	13	d46261ab53dc497a810f77e8	Quy cách 1kg
6	13	d173573e75584787899e699b	Envu
1	14	137a6495b36c43e5ad6da7a5	Gián Đức
2	14	2b2990bb2f9048079e0139d8	Gián Mỹ
3	14	bec75adc6c45447996748af8	Bả gel
4	14	7bd35b809510488798cbae61	Imidacloprid
5	14	d483edb8fc45491aa4f69c50	Envu
1	15	676a1da105814803a2722a26	Kiến
2	15	b4ba535de31e47baa81b38f8	Bả gel
3	15	fe17cea40506472c9018f441	Imidacloprid
4	15	40fa942ca10a49d4921de0df	Tuýp 12g
5	15	b7fef701f50f4bb59e2ccd3c	Envu
1	16	df33e918d0da4041976f6233	Muỗi
2	16	19fc8ca184a7478bb82472d2	Ruồi
3	16	227c0696eb934a4e93282088	Kiến
4	16	c09cee571d304e1cbbfdd651	Gián
5	16	30bdbfbe86f5491988d0b427	Cyphenothrin
6	16	3c02fa5889f34074b9fe4bab	Gia dụng
7	16	6720c631da7d470c8f299cb7	Y tế
8	16	6fa54170aa8d4bae8bd18a75	Sumitomo
1	17	9087f8eef3194adc99311de4	Muỗi
2	17	ecae4bf817944aabb9a0c778	Ruồi
3	17	6c4906dc8f60465cbf94fbb4	Phun không gian
4	17	3c1872574e3e4e6db4cc83be	Phun mù nóng
5	17	fe7fa36adbce4ce59187a57f	Sumitomo
1	18	9a68970621b04f33bc6173f3	Muỗi
2	18	383dccc49375492ca5152c9a	Côn trùng
3	18	f4a9c9cacae746cca7fb8a02	D-phenothrin
4	18	f9bbdc349a87431db5f0005a	Tồn lưu
5	18	693870a97bf1404690c2918e	Sumitomo
1	19	e5c0e0483c964fe7b917fe27	Pyriproxyfen
2	19	f54e678aff4c4acf841482f4	Kiểm soát vòng đời
3	19	9025443ac5e94de8831ca24c	Gián
4	19	f511b40756cd4ee8ad5f18d1	Muỗi
5	19	42074b98dd9241af8907c6c9	Bọ chét
6	19	e1fb6a7093584f8c8fc729eb	Sumitomo
1	20	b5bca98d8f9e4917b315ffa8	Mối
2	20	dfcb613b101c42d9862543f5	Fenvalerate
3	20	3cd8b0ba5881471c88a0cc21	Phòng trừ mối
4	20	5e0328aa68b84db6bb20a4e4	Công trình
5	20	31f6c28870b8484ea90e7e3c	Sumitomo
1	21	46e3f3561c6d41d594c3246a	Mối
2	21	352db2a718f84255a047c2a8	Trạm bả
3	21	9c023e9e1a4342d9b504651c	Hexaflumuron
4	21	44180967108143c4af5f1666	Xterm
5	21	c2aaa10232dd41289707eddb	Bảo vệ công trình
6	21	8bedf1e419224dbaa9cf4664	Sumitomo
1	22	a4946d38bfba4e4f93a8edf7	Muỗi
2	22	b6132d72e2184b08a1d9878a	Ruồi
3	22	ea454e08d0a942878e015e7c	Gián
4	22	7638105e35f740b1a612b3de	Lambda-cyhalothrin
5	22	cdaecd34aac446afbd85eba2	Icon
6	22	29301b0e0211403e83ffe616	Syngenta
1	23	6915b69ff906465cb5e71f4e	Muỗi
2	23	6f0a8fae13e64ccf9da975f9	Kiến
3	23	553049605a284a9d8c6dea51	Gián
4	23	d6c00731c0e643f3afe1e51a	Ruồi
5	23	d4bbd0f1cd3841d4b8051c15	Bọ chét
6	23	e5cb65aabf884b7cabc9f70e	Bọ ve
7	23	25b6c59b22b3427ba986bbbb	Lambda-cyhalothrin
8	23	01af44f0eebd4973ad7603da	Syngenta
1	24	3bd300f53988497290dab637	Muỗi
2	24	b12ac4062db6495b8378cd75	Ruồi
3	24	4d06507f733e405d8b73d52c	Gián
4	24	d58c7ee1b983455ca34d010e	Icon
5	24	9a0a5b44054c42a19bf04bdd	Lambda-cyhalothrin
6	24	98ce07b6173c428b92edb301	Syngenta
1	25	1137b7b4a14c4c71ba98ed05	Côn trùng bay
2	25	cb21582340e14a14a3a23be4	Côn trùng bò
3	25	cad72f670c2e4f80baf2d36c	Icon
4	25	7c998fee96e04dcd9fe66bd5	Lambda-cyhalothrin
5	25	772c42d41dbe4e34ae89f0ca	Syngenta
1	26	d488885aaf3743c6ae634872	Muỗi
2	26	fa2a5bca545d425392586369	Côn trùng
3	26	72d11062b0e54bc9b111ce3f	Permethrin
4	26	05da51986a784ab6be689ff9	50EC
5	26	08051e136c584f54b9cca1df	Syngenta
1	27	3911bfe09c1d452cb03a218e	Muỗi
2	27	23773fff26644440afb79105	Côn trùng
3	27	9749f93c42e042278e78608c	Permethrin
4	27	98e4bcc64c314381bafef704	50EC
5	27	d17bea12ec33482c803749f3	Syngenta
6	27	a31880868be94b6fa3cc173b	100ml
1	28	a529d9cbe9d64175958ad7fb	Kiến
2	28	6b951e4a6c234fd5a70d7506	Thiamethoxam
3	28	cee9f3ab55094e6183b5cf35	Bả kiến
4	28	7c1de66b9a274184929a15d2	Lan truyền trong đàn
5	28	6a5c03636d9c4198b71621fb	Syngenta
1	29	315b957afd24470c8bb14554	Gián Mỹ
2	29	6ead47d108844edbb5e2b507	Gián Đức
3	29	268715d320ae486aae147e6e	Gián Phương Đông
4	29	13071d17a07945ef884ae0e7	Bả gel
5	29	15c0945acea1477d81160e34	Emamectin benzoate
6	29	03faabd4c2b348658f208073	Syngenta
1	30	c0d5a296bfbc46728e7e4843	Gián
2	30	c8d5487cba6747e9849094b1	Bả gel
3	30	63b3c72e31d64d4bbe29daf0	Indoxacarb
4	30	9f386f0f0f3a4f4c812a550f	Lan truyền
5	30	5e6efd1bdeaf46309c447f26	Syngenta
1	31	6f9cdad9e8464d9fad174971	Gián
2	31	aa28943899ef42f0a5edca2b	Côn trùng
3	31	b70bffb6364546b98272a51f	Indoxacarb
4	31	e428c39b6731406f8f217bfc	Syngenta
5	31	633c511c2f2f4df69741bf07	200g
1	32	f5f97e2ff48745f2a9233ae7	Chuột
2	32	c43ecf4893364957a71a08d6	Bả viên
3	32	3600b9aad11843a988d3abe6	Brodifacoum
4	32	74d8048cb2af47cea385d3e6	Wax Block Bait
5	32	ff492326a1d84643a271f227	Syngenta
1	33	b26e25737441407b86a4751d	Chuột
2	33	bd83bdfd458c46dd9c623eb9	Bả viên
3	33	1c7ace7ab23e45d598c8ae26	Brodifacoum
4	33	3d99d4ac18e6463ea12badb6	Wax Block Bait
5	33	079a53fe8c94470aabdfc79f	Syngenta
6	33	639ad765dab44ed897417e31	1kg
1	34	d6876352e0e842e788970d8b	Rệp giường
2	34	dc0d5f2f1a2f4033aba6cc86	Bọ chét
3	34	6f620fe2b1324f8787b5cb56	Bọ ve
4	34	92c659c55be24df181e74d8c	Muỗi
5	34	1f33a56926264207be1a6e27	Gián
6	34	965f531985ec477f87f0a785	Kiến
7	34	ee5345dca48c4c27894f79d1	Bifenthrin
8	34	9ba210b82c754374b9473972	Imidacloprid
9	34	6a95d9370ad74f8381b924d4	Ensystex
1	35	2fbd59d4569947a7902cb0d1	Muỗi
2	35	5923b53d91bc45dd8a7062fc	Gián
3	35	4e83b4de53294ff398f89066	Kiến
4	35	c262b08e0ae8437fa0928971	Ruồi
5	35	ccd7c2115670428bbb3353ee	Permethrin
6	35	0490cc591648452596bfda7d	50%
7	35	2f53b1ad4d7a4f46bf609f9f	Ensystex
1	36	97bbba79371b498b8afd7e2f	Ruồi
2	36	7f5cec19bcd64e988a44f796	Muỗi
3	36	455e55727ea04f47b0893d6e	Kiến
4	36	8203e818f1ed4808b37e6ea6	Gián
5	36	05873db74db240dca733e050	Rệp
6	36	228503bc0e374e2ea5a85582	Bọ chét
7	36	6f22f540e7af437896fa06cc	Bifenthrin
8	36	9dfa33cada464585990e0339	Ensystex
1	37	3dff867f5ffc454dac3cb246	Xua rắn
2	37	8786fe4331874958992bb9ed	Xua thằn lằn
3	37	fa5dd419433048e48aff1050	Tinh dầu thực vật
4	37	606e4d5074d64339b567d4e5	Ensystex
5	37	8703801d62da45d991a25367	Sân vườn
1	38	39b4a775ed8542f0bfdeb1aa	Mối
2	38	d080774d7e3d43fab191a420	Bả mối
3	38	f7fd5c0685bb41cba72ac78b	Chlorfluazuron
4	38	043076c6a45042639c5a9d12	Dẫn dụ
5	38	8c0502a3a791422ab6d10659	Ensystex
1	39	e8e18f83e663410eaabf9e4d	Khói diệt côn trùng
2	39	7df24afe56e5403cb2e8d0b3	Deltamethrin
3	39	218ff3053c9f4c059f4177f2	Khe hở
4	39	a939f389039d4d9d9178b571	Khu vực khó tiếp cận
5	39	c78a2c2c32094ca198994c5c	Ensystex
1	40	47feca04930a4468aa11e370	Gián
2	40	2cf293f98dad477291b64d3c	Rệp giường
3	40	8972b76584294b8f89def0c4	Silica vô định hình
4	40	9da755fad5a046769dba3698	Dạng bột
5	40	1fba391e95114c32aa464054	Ensystex
1	41	e6df99e92883414abd925e84	Dụng cụ phun bột
2	41	bec33ad5db77469889c39f11	Diathor
3	41	c104ab71bb4643dda1ce6483	Xử lý khe hở
4	41	0a104a4046ee4009b1d00a4d	Ensystex
1	42	7bfeb983c22c4308a51db963	Gián
2	42	51a3c0d69da04ce6bf7065ee	Bả gel
3	42	306c60b3a80c4596916dde4c	Indoxacarb
4	42	cba2d63dd17d4dcdbda26195	Ensystex
1	43	c98cae70f2ae46cab80ea699	Mối
2	43	1a705391468a4d2da4ded6c4	Chlorfenapyr
3	43	0276d306658f43c89a9db185	240CS
4	43	8ffeff624ef14a5faa769c2d	BASF
5	43	fbc2883b255b4e8481fdeb6f	Công trình
1	44	6309a8c85c574fc8845feefc	Muỗi
2	44	d456219805a64849802ea0a9	Côn trùng
3	44	2cd3f712cd364483b887a2e0	Permethrin
4	44	579e985816164dbc8646715a	50EC
5	44	d25ba9d600924e098fc493ac	Agropharm
6	44	3311af2e651a47edbb7051ef	Anh Quốc
1	45	e699db6535754568854dbb99	Muỗi
2	45	66354222c373430c93a9b913	Ruồi
3	45	66b1fc0e35b246c3a572779c	Gián
4	45	09705e8c2cf044fbbedb5902	Kiến
5	45	474a50f7b115413684701255	Cypermethrin
6	45	21a693c714264d799e8f6050	25EC
7	45	65fa961dc144416aa5de915f	Việt Nam
1	46	760f53a6255340aa9309d7ea	Xua rắn
2	46	85c482db7be746aaaa850e61	Xua thằn lằn
3	46	0310d46d7fc44368848c2ef3	Dạng hạt
4	46	6ac04053eeb94f8a9d8adf32	Tinh dầu tuyết tùng
5	46	350a6f54181141e7ad5d15e5	Tinh dầu quế
6	46	0e8014b4e1cc4260bd7d021b	Ensystex
1	47	82c0eb25378f4e479e39b3ed	Gián Đức
2	47	62f90e79af074c7d86e50024	Gián Mỹ
3	47	425b159714e442f1b0e112d1	Bả gel
4	47	174408f3b6254df3aeabd839	Dinotefuran
5	47	98cd72a1b95840d593553698	BASF
6	47	8a5d6fd87bda4bf69dfdd74e	Lan truyền
\.


--
-- TOC entry 5311 (class 0 OID 26166)
-- Dependencies: 249
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, slug, name, tagline, description, icon_key, image_id, updated_at, created_at) FROM stdin;
1	diet-moi-tan-goc	Diệt Mối Tận Gốc	Bảo vệ công trình bền vững	Hệ thống bả mối Xterm và phun phòng chống mối cho công trình mới, công trình hiện hữu, kho hàng và đồ gỗ nội thất.	Hammer	42	2026-07-03 16:04:09.711+07	2026-07-03 16:04:09.71+07
2	diet-chuot	Diệt Chuột	Kiểm soát loài gặm nhấm	Giải pháp đặt bả, đặt bẫy và niêm phong điểm xâm nhập theo chuẩn IPM, an toàn cho người và thú nuôi.	Mouse	43	2026-07-03 16:04:11.939+07	2026-07-03 16:04:11.939+07
3	diet-muoi	Diệt Muỗi	Phun ULV – tồn lưu chuyên nghiệp	Phun không gian, phun tồn lưu và xử lý nguồn nước tù đọng, áp dụng cho khu dân cư, trường học, bệnh viện và resort.	Sparkles	44	2026-07-03 16:04:13.89+07	2026-07-03 16:04:13.89+07
4	ve-sinh-cong-nghiep	Vệ Sinh Công Nghiệp	Sạch sâu cho nhà máy & cao ốc	Tổng vệ sinh sau xây dựng, lau kính nhà cao tầng, giặt ghế sofa thảm và bảo dưỡng định kỳ tòa nhà.	SprayCan	45	2026-07-03 16:04:15.813+07	2026-07-03 16:04:15.813+07
5	diet-gian-con-trung	Diệt Gián & Côn Trùng	Kiểm soát côn trùng tổng thể	Đặt gel, phun tồn lưu và xử lý ổ cho gián, kiến, ruồi, bọ chét trong nhà hàng, khách sạn và hộ gia đình.	Bug	46	2026-07-03 16:04:17.933+07	2026-07-03 16:04:17.933+07
\.


--
-- TOC entry 5283 (class 0 OID 25877)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	abc	2026-07-03 11:51:20.238+07	2026-07-03 11:51:20.235+07	admin@greenoli.vn	\N	\N	d2aca8daa9046f822293c9fedb0e167d2ca048252c9b061d1d7b0063c738956f	8b06e5b69f44cfc10ffc879f4da40a2ea35f9da3cb44285b5e6903c4a36df396a39b54d7374b7d65a9275d58045c0642a04c96c22e211f2d796e9418e77c39d0a550e8ff0303008cabd3ebe0839e608c16b7bb0876cc0a2644f8be443c3a191e55087b7de27d4beb5171c8bb2e69ff7d73434ed349f96717457b5404c902ef02ddd95a5d3ba1fa66dd67000c2dea2133c79ddabaceec4a8d30a7d713af54765c224a43081ca89a5744a51048456bd8cf96c71135bcf0a2ee8e45c05ffab7b2cd0bca24c59feee4650f055aabbf0f80e91e01ed2559e539ee00bff2dad263619e8258042a039b2c5384e8cc64a88841b6e7609ad977d33575490e47cbf92864ecbdc6a3cf6e2a5e21e7d20b1520dbf1e2c9dba3ed37f9a43d3194718773445846dfb266b65b444c5a331ec3e53d4f1aaff1095b3e953e97994f2bba0a4a3fa34059cf508c840fc7bd3ce0dafbea5557dc79b04242f09e20d5baf029631cb1f0ff3c92325a80c7cac71bf78ea3ffb09b068f15526f9bb21f200ee3288fb8a2c0ef04718874346216c3bc4c7884c3edc433da9c47be612a3abcaa021b00db08730ddd195e183e64970e9f00ee4a1ea2df086e88a34f40d2de975761928c1e6679cc7bf40a217913e04e0c2e6a6fb65029db6d41b31cdb866235c76062433bd97b9f2ec439430e3a012c9d2f734ebd0caa4796f7c767312196efb0302274f2ae91c0	0	\N
\.


--
-- TOC entry 5281 (class 0 OID 25865)
-- Dependencies: 219
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	93ff3b0a-ceeb-4d54-97a4-ce98f42e4524	2026-07-04 14:52:47.363+07	2026-07-04 16:52:47.363+07
\.


--
-- TOC entry 5339 (class 0 OID 0)
-- Dependencies: 246
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 7, true);


--
-- TOC entry 5340 (class 0 OID 0)
-- Dependencies: 236
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- TOC entry 5341 (class 0 OID 0)
-- Dependencies: 252
-- Name: gallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gallery_id_seq', 6, true);


--
-- TOC entry 5342 (class 0 OID 0)
-- Dependencies: 254
-- Name: leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leads_id_seq', 2, true);


--
-- TOC entry 5343 (class 0 OID 0)
-- Dependencies: 234
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 132, true);


--
-- TOC entry 5344 (class 0 OID 0)
-- Dependencies: 250
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partners_id_seq', 8, true);


--
-- TOC entry 5345 (class 0 OID 0)
-- Dependencies: 222
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- TOC entry 5346 (class 0 OID 0)
-- Dependencies: 224
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 10, true);


--
-- TOC entry 5347 (class 0 OID 0)
-- Dependencies: 226
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 20, true);


--
-- TOC entry 5348 (class 0 OID 0)
-- Dependencies: 232
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 3, true);


--
-- TOC entry 5349 (class 0 OID 0)
-- Dependencies: 228
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 10, true);


--
-- TOC entry 5350 (class 0 OID 0)
-- Dependencies: 230
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 21, true);


--
-- TOC entry 5351 (class 0 OID 0)
-- Dependencies: 241
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 47, true);


--
-- TOC entry 5352 (class 0 OID 0)
-- Dependencies: 243
-- Name: products_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_rels_id_seq', 18, true);


--
-- TOC entry 5353 (class 0 OID 0)
-- Dependencies: 248
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 5, true);


--
-- TOC entry 5354 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 5085 (class 2606 OID 26164)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- TOC entry 5081 (class 2606 OID 26141)
-- Name: articles_tags articles_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles_tags
    ADD CONSTRAINT articles_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 5050 (class 2606 OID 26060)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 5102 (class 2606 OID 26215)
-- Name: gallery gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery
    ADD CONSTRAINT gallery_pkey PRIMARY KEY (id);


--
-- TOC entry 5106 (class 2606 OID 26235)
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- TOC entry 5045 (class 2606 OID 26039)
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- TOC entry 5097 (class 2606 OID 26200)
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);


--
-- TOC entry 5007 (class 2606 OID 25903)
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- TOC entry 5011 (class 2606 OID 25917)
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- TOC entry 5023 (class 2606 OID 25929)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- TOC entry 5040 (class 2606 OID 25969)
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 5030 (class 2606 OID 25943)
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- TOC entry 5036 (class 2606 OID 25955)
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- TOC entry 5060 (class 2606 OID 26083)
-- Name: products_certifications products_certifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_certifications
    ADD CONSTRAINT products_certifications_pkey PRIMARY KEY (id);


--
-- TOC entry 5069 (class 2606 OID 26118)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 5077 (class 2606 OID 26130)
-- Name: products_rels products_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_pkey PRIMARY KEY (id);


--
-- TOC entry 5056 (class 2606 OID 26072)
-- Name: products_specs products_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_specs
    ADD CONSTRAINT products_specs_pkey PRIMARY KEY (id);


--
-- TOC entry 5064 (class 2606 OID 26094)
-- Name: products_tags products_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_tags
    ADD CONSTRAINT products_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 5091 (class 2606 OID 26184)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- TOC entry 5003 (class 2606 OID 25891)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4999 (class 2606 OID 25875)
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 5082 (class 1259 OID 26326)
-- Name: articles_cover_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_cover_image_idx ON public.articles USING btree (cover_image_id);


--
-- TOC entry 5083 (class 1259 OID 26328)
-- Name: articles_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_created_at_idx ON public.articles USING btree (created_at);


--
-- TOC entry 5086 (class 1259 OID 26325)
-- Name: articles_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX articles_slug_idx ON public.articles USING btree (slug);


--
-- TOC entry 5078 (class 1259 OID 26323)
-- Name: articles_tags_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_tags_order_idx ON public.articles_tags USING btree (_order);


--
-- TOC entry 5079 (class 1259 OID 26324)
-- Name: articles_tags_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_tags_parent_id_idx ON public.articles_tags USING btree (_parent_id);


--
-- TOC entry 5087 (class 1259 OID 26327)
-- Name: articles_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_updated_at_idx ON public.articles USING btree (updated_at);


--
-- TOC entry 5047 (class 1259 OID 26307)
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- TOC entry 5048 (class 1259 OID 26305)
-- Name: categories_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_hero_image_idx ON public.categories USING btree (hero_image_id);


--
-- TOC entry 5051 (class 1259 OID 26304)
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- TOC entry 5052 (class 1259 OID 26306)
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- TOC entry 5099 (class 1259 OID 26338)
-- Name: gallery_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_created_at_idx ON public.gallery USING btree (created_at);


--
-- TOC entry 5100 (class 1259 OID 26336)
-- Name: gallery_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_image_idx ON public.gallery USING btree (image_id);


--
-- TOC entry 5103 (class 1259 OID 26337)
-- Name: gallery_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_updated_at_idx ON public.gallery USING btree (updated_at);


--
-- TOC entry 5104 (class 1259 OID 26340)
-- Name: leads_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leads_created_at_idx ON public.leads USING btree (created_at);


--
-- TOC entry 5107 (class 1259 OID 26339)
-- Name: leads_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leads_updated_at_idx ON public.leads USING btree (updated_at);


--
-- TOC entry 5042 (class 1259 OID 26302)
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- TOC entry 5043 (class 1259 OID 26303)
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- TOC entry 5046 (class 1259 OID 26301)
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- TOC entry 5094 (class 1259 OID 26335)
-- Name: partners_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partners_created_at_idx ON public.partners USING btree (created_at);


--
-- TOC entry 5095 (class 1259 OID 26333)
-- Name: partners_logo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partners_logo_idx ON public.partners USING btree (logo_id);


--
-- TOC entry 5098 (class 1259 OID 26334)
-- Name: partners_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partners_updated_at_idx ON public.partners USING btree (updated_at);


--
-- TOC entry 5005 (class 1259 OID 26000)
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- TOC entry 5008 (class 1259 OID 26003)
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- TOC entry 5009 (class 1259 OID 26001)
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- TOC entry 5013 (class 1259 OID 26384)
-- Name: payload_locked_documents_rels_articles_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_articles_id_idx ON public.payload_locked_documents_rels USING btree (articles_id);


--
-- TOC entry 5014 (class 1259 OID 26382)
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- TOC entry 5015 (class 1259 OID 26387)
-- Name: payload_locked_documents_rels_gallery_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_gallery_id_idx ON public.payload_locked_documents_rels USING btree (gallery_id);


--
-- TOC entry 5016 (class 1259 OID 26388)
-- Name: payload_locked_documents_rels_leads_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_leads_id_idx ON public.payload_locked_documents_rels USING btree (leads_id);


--
-- TOC entry 5017 (class 1259 OID 26381)
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- TOC entry 5018 (class 1259 OID 26004)
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- TOC entry 5019 (class 1259 OID 26005)
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- TOC entry 5020 (class 1259 OID 26386)
-- Name: payload_locked_documents_rels_partners_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_partners_id_idx ON public.payload_locked_documents_rels USING btree (partners_id);


--
-- TOC entry 5021 (class 1259 OID 26006)
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- TOC entry 5024 (class 1259 OID 26383)
-- Name: payload_locked_documents_rels_products_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_products_id_idx ON public.payload_locked_documents_rels USING btree (products_id);


--
-- TOC entry 5025 (class 1259 OID 26385)
-- Name: payload_locked_documents_rels_services_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_services_id_idx ON public.payload_locked_documents_rels USING btree (services_id);


--
-- TOC entry 5026 (class 1259 OID 26007)
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- TOC entry 5012 (class 1259 OID 26002)
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- TOC entry 5038 (class 1259 OID 26016)
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- TOC entry 5041 (class 1259 OID 26015)
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- TOC entry 5027 (class 1259 OID 26010)
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- TOC entry 5028 (class 1259 OID 26008)
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- TOC entry 5032 (class 1259 OID 26011)
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- TOC entry 5033 (class 1259 OID 26012)
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- TOC entry 5034 (class 1259 OID 26013)
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- TOC entry 5037 (class 1259 OID 26014)
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- TOC entry 5031 (class 1259 OID 26009)
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- TOC entry 5065 (class 1259 OID 26315)
-- Name: products_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_category_idx ON public.products USING btree (category_id);


--
-- TOC entry 5057 (class 1259 OID 26310)
-- Name: products_certifications_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_certifications_order_idx ON public.products_certifications USING btree (_order);


--
-- TOC entry 5058 (class 1259 OID 26311)
-- Name: products_certifications_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_certifications_parent_id_idx ON public.products_certifications USING btree (_parent_id);


--
-- TOC entry 5066 (class 1259 OID 26318)
-- Name: products_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_created_at_idx ON public.products USING btree (created_at);


--
-- TOC entry 5067 (class 1259 OID 26316)
-- Name: products_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_hero_image_idx ON public.products USING btree (hero_image_id);


--
-- TOC entry 5072 (class 1259 OID 26322)
-- Name: products_rels_media_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_media_id_idx ON public.products_rels USING btree (media_id);


--
-- TOC entry 5073 (class 1259 OID 26319)
-- Name: products_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_order_idx ON public.products_rels USING btree ("order");


--
-- TOC entry 5074 (class 1259 OID 26320)
-- Name: products_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_parent_idx ON public.products_rels USING btree (parent_id);


--
-- TOC entry 5075 (class 1259 OID 26321)
-- Name: products_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_path_idx ON public.products_rels USING btree (path);


--
-- TOC entry 5070 (class 1259 OID 26314)
-- Name: products_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_slug_idx ON public.products USING btree (slug);


--
-- TOC entry 5053 (class 1259 OID 26308)
-- Name: products_specs_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_specs_order_idx ON public.products_specs USING btree (_order);


--
-- TOC entry 5054 (class 1259 OID 26309)
-- Name: products_specs_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_specs_parent_id_idx ON public.products_specs USING btree (_parent_id);


--
-- TOC entry 5061 (class 1259 OID 26312)
-- Name: products_tags_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_tags_order_idx ON public.products_tags USING btree (_order);


--
-- TOC entry 5062 (class 1259 OID 26313)
-- Name: products_tags_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_tags_parent_id_idx ON public.products_tags USING btree (_parent_id);


--
-- TOC entry 5071 (class 1259 OID 26317)
-- Name: products_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_updated_at_idx ON public.products USING btree (updated_at);


--
-- TOC entry 5088 (class 1259 OID 26332)
-- Name: services_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_created_at_idx ON public.services USING btree (created_at);


--
-- TOC entry 5089 (class 1259 OID 26330)
-- Name: services_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_image_idx ON public.services USING btree (image_id);


--
-- TOC entry 5092 (class 1259 OID 26329)
-- Name: services_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX services_slug_idx ON public.services USING btree (slug);


--
-- TOC entry 5093 (class 1259 OID 26331)
-- Name: services_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_updated_at_idx ON public.services USING btree (updated_at);


--
-- TOC entry 5000 (class 1259 OID 25998)
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- TOC entry 5001 (class 1259 OID 25999)
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- TOC entry 4996 (class 1259 OID 25995)
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- TOC entry 4997 (class 1259 OID 25996)
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- TOC entry 5004 (class 1259 OID 25997)
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- TOC entry 5130 (class 2606 OID 26281)
-- Name: articles articles_cover_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_cover_image_id_media_id_fk FOREIGN KEY (cover_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- TOC entry 5129 (class 2606 OID 26276)
-- Name: articles_tags articles_tags_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles_tags
    ADD CONSTRAINT articles_tags_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- TOC entry 5121 (class 2606 OID 26236)
-- Name: categories categories_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_hero_image_id_media_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- TOC entry 5133 (class 2606 OID 26296)
-- Name: gallery gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery
    ADD CONSTRAINT gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- TOC entry 5132 (class 2606 OID 26291)
-- Name: partners partners_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- TOC entry 5109 (class 2606 OID 26356)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_articles_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_articles_fk FOREIGN KEY (articles_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- TOC entry 5110 (class 2606 OID 26346)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 5111 (class 2606 OID 26371)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_gallery_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_gallery_fk FOREIGN KEY (gallery_id) REFERENCES public.gallery(id) ON DELETE CASCADE;


--
-- TOC entry 5112 (class 2606 OID 26376)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_leads_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_leads_fk FOREIGN KEY (leads_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- TOC entry 5113 (class 2606 OID 26341)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- TOC entry 5114 (class 2606 OID 25975)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- TOC entry 5115 (class 2606 OID 26366)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_partners_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_partners_fk FOREIGN KEY (partners_id) REFERENCES public.partners(id) ON DELETE CASCADE;


--
-- TOC entry 5116 (class 2606 OID 26351)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 5117 (class 2606 OID 26361)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_services_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_services_fk FOREIGN KEY (services_id) REFERENCES public.services(id) ON DELETE CASCADE;


--
-- TOC entry 5118 (class 2606 OID 25980)
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 5119 (class 2606 OID 25985)
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- TOC entry 5120 (class 2606 OID 25990)
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 5125 (class 2606 OID 26256)
-- Name: products products_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- TOC entry 5123 (class 2606 OID 26246)
-- Name: products_certifications products_certifications_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_certifications
    ADD CONSTRAINT products_certifications_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 5126 (class 2606 OID 26261)
-- Name: products products_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_hero_image_id_media_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- TOC entry 5127 (class 2606 OID 26271)
-- Name: products_rels products_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- TOC entry 5128 (class 2606 OID 26266)
-- Name: products_rels products_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 5122 (class 2606 OID 26241)
-- Name: products_specs products_specs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_specs
    ADD CONSTRAINT products_specs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 5124 (class 2606 OID 26251)
-- Name: products_tags products_tags_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_tags
    ADD CONSTRAINT products_tags_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 5131 (class 2606 OID 26286)
-- Name: services services_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- TOC entry 5108 (class 2606 OID 25970)
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-07-04 16:07:11

--
-- PostgreSQL database dump complete
--

\unrestrict kHrZUA7K122loB2QaYpfqEN1X36ZNih7Z7yC6wEIDnvHfgxk7kWXQB9rWylOeDY

