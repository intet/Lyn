--liquibase formatted sql
--changeset Sivodedov Dmitry:create_table_comic
CREATE TABLE COMIC
(
  ID             BIGINT PRIMARY KEY NOT NULL IDENTITY,
  NAME           VARCHAR(255)       NOT NULL,
  ABOUT          VARCHAR(1024)      NOT NULL,
  URL            VARCHAR(255)       NOT NULL,
  IMG_URL        VARCHAR(255)       NOT NULL,
  EXPECTED_COUNT INT,
  PAGE_COUNT     INT
);
--rollback drop table comic;

--changeset Sivodedov Dmitry:create_table_comic_page
CREATE TABLE COMIC_PAGE
(
  ID    BIGINT PRIMARY KEY NOT NULL IDENTITY,
  COMIC BIGINT,
  INDEX INT,
  URL   VARCHAR(255),
  CONSTRAINT FK_PAGE_COMIC FOREIGN KEY (COMIC) REFERENCES COMIC (ID)
);
--rollback drop table comic_page;