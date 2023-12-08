-- Table: public.book

-- DROP TABLE IF EXISTS public.book;

CREATE TABLE IF NOT EXISTS public.book
(
    isbn character varying(13) COLLATE pg_catalog."default" NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    publishername character varying(255) COLLATE pg_catalog."default",
    suggestedretailprice integer NOT NULL,
    authorname character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT book_pkey PRIMARY KEY (isbn)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.book
    OWNER to postgres;
-- Index: isbn_idx

-- DROP INDEX IF EXISTS public.isbn_idx;

CREATE INDEX IF NOT EXISTS isbn_idx
    ON public.book USING btree
    (isbn COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    commentid bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    usedbookid bigint NOT NULL,
    commenterid character varying(9) COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    commenttimestamp timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT comments_pkey PRIMARY KEY (commentid),
    CONSTRAINT fk_commenter FOREIGN KEY (commenterid)
        REFERENCES public.users (studentid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_usedbookid FOREIGN KEY (usedbookid)
        REFERENCES public.usedbook (usedbookid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;

-- Table: public.course

-- DROP TABLE IF EXISTS public.course;

CREATE TABLE IF NOT EXISTS public.course
(
    serialnumber character varying(6) COLLATE pg_catalog."default" NOT NULL,
    coursename character varying(255) COLLATE pg_catalog."default" NOT NULL,
    semester character varying(15) COLLATE pg_catalog."default" NOT NULL,
    instructorname character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT course_pkey PRIMARY KEY (serialnumber, semester),
    CONSTRAINT unique_pk_pairs UNIQUE (serialnumber, semester)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.course
    OWNER to postgres;

-- Table: public.coursedept

-- DROP TABLE IF EXISTS public.coursedept;

CREATE TABLE IF NOT EXISTS public.coursedept
(
    serialnumber character varying(6) COLLATE pg_catalog."default" NOT NULL,
    semester character varying(15) COLLATE pg_catalog."default" NOT NULL,
    departmentcode character varying(4) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT coursedept_pkey PRIMARY KEY (serialnumber, semester),
    CONSTRAINT fk_serial_semester FOREIGN KEY (serialnumber, semester)
        REFERENCES public.course (serialnumber, semester) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coursedept
    OWNER to postgres;

-- Table: public.genre

-- DROP TABLE IF EXISTS public.genre;

CREATE TABLE IF NOT EXISTS public.genre
(
    bookid character varying(255) COLLATE pg_catalog."default" NOT NULL,
    genre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fk_bookid FOREIGN KEY (bookid)
        REFERENCES public.book (isbn) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.genre
    OWNER to postgres;

-- Table: public.purchase

-- DROP TABLE IF EXISTS public.purchase;

CREATE TABLE IF NOT EXISTS public.purchase
(
    usedbookid bigint NOT NULL,
    buyerid character varying(9) COLLATE pg_catalog."default" NOT NULL,
    purchasetimestamp timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT purchase_pkey PRIMARY KEY (usedbookid),
    CONSTRAINT fk_buyer FOREIGN KEY (buyerid)
        REFERENCES public.users (studentid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT fk_usedbookid FOREIGN KEY (usedbookid)
        REFERENCES public.usedbook (usedbookid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.purchase
    OWNER to postgres;

-- Table: public.purchaserequest

-- DROP TABLE IF EXISTS public.purchaserequest;

CREATE TABLE IF NOT EXISTS public.purchaserequest
(
    buyerid character varying(9) COLLATE pg_catalog."default" NOT NULL,
    usedbookid bigint NOT NULL,
    requesttimestamp timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT purchaserequest_pkey PRIMARY KEY (buyerid, usedbookid),
    CONSTRAINT fk_buyer FOREIGN KEY (buyerid)
        REFERENCES public.users (studentid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_usedbookid FOREIGN KEY (usedbookid)
        REFERENCES public.usedbook (usedbookid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.purchaserequest
    OWNER to postgres;
-- Index: index_name

-- DROP INDEX IF EXISTS public.index_name;

CREATE INDEX IF NOT EXISTS index_name
    ON public.purchaserequest USING btree
    (requesttimestamp ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: ubid_idx

-- DROP INDEX IF EXISTS public.ubid_idx;

CREATE INDEX IF NOT EXISTS ubid_idx
    ON public.purchaserequest USING btree
    (usedbookid ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.rating

-- DROP TABLE IF EXISTS public.rating;

CREATE TABLE IF NOT EXISTS public.rating
(
    usedbookid bigint NOT NULL,
    starscount integer NOT NULL,
    review text COLLATE pg_catalog."default",
    CONSTRAINT rating_pkey PRIMARY KEY (usedbookid),
    CONSTRAINT fk_usedbookid FOREIGN KEY (usedbookid)
        REFERENCES public.purchase (usedbookid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT check_stars CHECK (starscount >= 1 AND starscount <= 5)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rating
    OWNER to postgres;

-- Table: public.textbook

-- DROP TABLE IF EXISTS public.textbook;

CREATE TABLE IF NOT EXISTS public.textbook
(
    serialnumber character varying(6) COLLATE pg_catalog."default" NOT NULL,
    bookid character varying(13) COLLATE pg_catalog."default" NOT NULL,
    semester character varying(15) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT textbook_pkey PRIMARY KEY (serialnumber, bookid, semester),
    CONSTRAINT fk_bookid FOREIGN KEY (bookid)
        REFERENCES public.book (isbn) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_course FOREIGN KEY (serialnumber, semester)
        REFERENCES public.course (serialnumber, semester) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.textbook
    OWNER to postgres;
-- Table: public.usedbook

-- DROP TABLE IF EXISTS public.usedbook;

CREATE TABLE IF NOT EXISTS public.usedbook
(
    usedbookid bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    additionaldetails text COLLATE pg_catalog."default",
    bookpicture character varying(255) COLLATE pg_catalog."default" NOT NULL,
    bookcondition integer NOT NULL,
    sellerid character varying(9) COLLATE pg_catalog."default" NOT NULL,
    listtimestamp timestamp without time zone NOT NULL DEFAULT now(),
    askingprice integer NOT NULL,
    bookid character varying(13) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usedbook_pkey PRIMARY KEY (usedbookid),
    CONSTRAINT fk_book FOREIGN KEY (bookid)
        REFERENCES public.book (isbn) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_seller FOREIGN KEY (sellerid)
        REFERENCES public.users (studentid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT check_condition CHECK (bookcondition >= 1 AND bookcondition <= 10)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usedbook
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    studentid character varying(9) COLLATE pg_catalog."default" NOT NULL,
    schoolemail character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    username character varying(30) COLLATE pg_catalog."default" NOT NULL,
    fname character varying(30) COLLATE pg_catalog."default" NOT NULL,
    lname character varying(16) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (studentid),
    CONSTRAINT unique_email UNIQUE (schoolemail)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;