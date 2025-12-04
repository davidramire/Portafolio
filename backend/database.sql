--
-- PostgreSQL database dump
--

\restrict WQcJZVtu4aqEXY6XwPIAIkr3yxbvjI6S4soNCAzrWaZ3KRtowtvNWTyzC8WnilD

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-12-03 19:50:21

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
-- TOC entry 225 (class 1255 OID 41232)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 41110)
-- Name: certifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certifications (
    id text NOT NULL,
    name text NOT NULL,
    issuer text NOT NULL,
    "issueDate" text NOT NULL,
    "expiryDate" text,
    "credentialId" text,
    "credentialUrl" text,
    "order" integer DEFAULT 0 NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.certifications OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41041)
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_messages (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    budget text,
    message text NOT NULL,
    status text DEFAULT 'new'::text NOT NULL,
    "ipAddress" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.contact_messages OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 41079)
-- Name: education; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.education (
    id text NOT NULL,
    degree text NOT NULL,
    institution text NOT NULL,
    location text,
    "startDate" text NOT NULL,
    "endDate" text,
    "isCurrent" boolean DEFAULT false NOT NULL,
    description text,
    gpa text,
    "order" integer DEFAULT 0 NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.education OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41068)
-- Name: experiences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiences (
    id text NOT NULL,
    "position" text NOT NULL,
    company text NOT NULL,
    location text,
    "startDate" text NOT NULL,
    "endDate" text,
    "isCurrent" boolean DEFAULT false NOT NULL,
    description text NOT NULL,
    achievements text[],
    technologies text[],
    "order" integer DEFAULT 0 NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.experiences OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41060)
-- Name: personal_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_info (
    id text NOT NULL,
    "fullName" text NOT NULL,
    title text NOT NULL,
    email text NOT NULL,
    phone text,
    location text,
    website text,
    linkedin text,
    github text,
    summary text,
    "profileImg" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.personal_info OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41100)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    technologies text[],
    link text,
    github text,
    image text,
    highlights text[],
    "order" integer DEFAULT 0 NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41050)
-- Name: resume_sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resume_sections (
    id text NOT NULL,
    "sectionType" text NOT NULL,
    title text NOT NULL,
    content jsonb NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.resume_sections OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41090)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    id text NOT NULL,
    category text NOT NULL,
    name text NOT NULL,
    level integer NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 4961 (class 0 OID 41110)
-- Dependencies: 224
-- Data for Name: certifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certifications (id, name, issuer, "issueDate", "expiryDate", "credentialId", "credentialUrl", "order", "isVisible", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4954 (class 0 OID 41041)
-- Dependencies: 217
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_messages (id, name, email, subject, budget, message, status, "ipAddress", "createdAt", "updatedAt") FROM stdin;
ee69ebce-237c-4d56-8ce6-d1f9a22979a5	David	david@gmail.com	sssss	\N	sssss	new	::1	2025-12-03 22:15:25.276	2025-12-03 22:15:25.276
735c012c-b825-4d27-b95b-3adccc8d2b67	Juan Agudelo	david@gmail.com	dd	\N	ddd	new	::1	2025-12-03 22:16:51.161	2025-12-03 22:16:51.161
fe211748-2b10-4eb1-a7f8-cddae5216a12	Juan Agudelo	david@gmail.com	eee	\N	eee	new	::1	2025-12-03 22:17:15.338	2025-12-03 22:17:15.338
899b8720-9ce2-4d89-8a0d-3b67910859ed	David	david@gmail.com	ww	\N	ww	new	::1	2025-12-03 22:19:38.171	2025-12-03 22:19:38.171
c1bc901c-c6a5-4a50-8ef4-c045bad53d55	Juan Agudelo	david@gmail.com	ss	\N	ddd	new	::1	2025-12-03 22:22:00.912	2025-12-03 22:22:00.912
4acf0903-2c81-41e2-8f05-5ca1ad58688c	Juan Agudelo	david@gmail.com	ss	\N	a	new	::1	2025-12-03 22:22:27.677	2025-12-03 22:22:27.677
5521a10c-74fb-4aba-a748-c5f4abf4d4d2	Juan Agudelo	david@gmail.com	sss	\N	sss	new	::1	2025-12-03 22:30:40.001	2025-12-03 22:30:40.001
ac9d14fb-ba6d-4dba-9d4d-3af474d915b0	david	david@gmail.com	ddd	\N	ddd	new	::1	2025-12-03 22:32:51.932	2025-12-03 22:32:51.932
d93a1e9f-22f5-4082-a6b5-7d60bfb1cea7	Juan Agudelo	david@gmail.com	dd	\N	dd	new	::1	2025-12-03 22:33:08.77	2025-12-03 22:33:08.77
5f8c70a0-e8a6-498a-8d12-ec8a75d021c3	Juan Agudelo	david@gmail.com	ss	\N	aaaa	new	::1	2025-12-03 22:34:21.871	2025-12-03 22:34:21.871
8c9f7c47-75a0-44db-9d7a-d3d7b59d5e59	David	david@gmail.com	dd	\N	dd	new	::1	2025-12-03 22:40:43.628	2025-12-03 22:40:43.628
e4fd1454-9af0-41b2-b25d-0b8d050592a4	David	david@gmail.com	ee	\N	ee	new	::1	2025-12-03 22:42:13.379	2025-12-03 22:42:13.379
fe61f73e-209a-4260-b54a-58404b4d8033	Juan Agudelo	david@gmail.com	x	\N	xx	new	::1	2025-12-03 22:43:52.762	2025-12-03 22:43:52.762
403440c4-e71f-4a53-aba4-42b0e37471d3	Juan Agudelo	david@gmail.com	dd	\N	dd	new	::1	2025-12-03 22:45:29.201	2025-12-03 22:45:29.201
a064d1a8-0bb9-42e2-a6f9-e1d63ca6ae52	David Esteban	david@gmail.com	qq	\N	qq	new	::1	2025-12-03 22:51:27.62	2025-12-03 22:51:27.62
795969b6-99c0-4cd4-9063-37b771f56e13	Juan Agudelo	david@gmail.com	qq	\N	aa	new	::1	2025-12-03 22:52:48.446	2025-12-03 22:52:48.446
28243b3f-d029-453d-b942-1a37d2a92205	Script Test	script@test.local	Inserción directa	0	Creado por script de prueba para verificar persistencia	new	127.0.0.1	2025-12-03 23:01:41.667	2025-12-03 23:01:41.667
23775296-5f2b-4b1d-b72d-b53bccb1329f	dd	david@gmail.com	dd	\N	dddd	new	::1	2025-12-03 23:04:52.883	2025-12-03 23:04:52.883
92558304-eca5-4abf-bb9d-d8f94bf353ca	Laura	la@gmail.com	edd	\N	ddd	new	::1	2025-12-03 23:06:00.154	2025-12-03 23:06:00.154
bb1a1b28-6776-48ae-abac-46fa50011537	Carmen	carmen@gmail.com	ggggg	\N	gggggggg	new	::1	2025-12-03 23:15:42.84	2025-12-03 23:15:42.84
\.


--
-- TOC entry 4958 (class 0 OID 41079)
-- Dependencies: 221
-- Data for Name: education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.education (id, degree, institution, location, "startDate", "endDate", "isCurrent", description, gpa, "order", "isVisible", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4957 (class 0 OID 41068)
-- Dependencies: 220
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiences (id, "position", company, location, "startDate", "endDate", "isCurrent", description, achievements, technologies, "order", "isVisible", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4956 (class 0 OID 41060)
-- Dependencies: 219
-- Data for Name: personal_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_info (id, "fullName", title, email, phone, location, website, linkedin, github, summary, "profileImg", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4960 (class 0 OID 41100)
-- Dependencies: 223
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, description, technologies, link, github, image, highlights, "order", "isVisible", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4955 (class 0 OID 41050)
-- Dependencies: 218
-- Data for Name: resume_sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resume_sections (id, "sectionType", title, content, "order", "isVisible", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4959 (class 0 OID 41090)
-- Dependencies: 222
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (id, category, name, level, "order", "isVisible", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4808 (class 2606 OID 41119)
-- Name: certifications certifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 41049)
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4802 (class 2606 OID 41089)
-- Name: education education_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (id);


--
-- TOC entry 4800 (class 2606 OID 41078)
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- TOC entry 4798 (class 2606 OID 41067)
-- Name: personal_info personal_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_info
    ADD CONSTRAINT personal_info_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 41109)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 41059)
-- Name: resume_sections resume_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resume_sections
    ADD CONSTRAINT resume_sections_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 41099)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


-- Completed on 2025-12-03 19:50:21

--
-- PostgreSQL database dump complete
--

\unrestrict WQcJZVtu4aqEXY6XwPIAIkr3yxbvjI6S4soNCAzrWaZ3KRtowtvNWTyzC8WnilD

