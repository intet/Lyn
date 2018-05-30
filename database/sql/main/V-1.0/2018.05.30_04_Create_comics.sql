--liquibase formatted sql
--changeset Sivodedov Dmitry:create_table_comic
CREATE TABLE COMIC
(
  ID         BIGINT PRIMARY KEY NOT NULL IDENTITY,
  NAME       VARCHAR(255),
  URL        VARCHAR(255),
  PAGE_COUNT INT
);
--rollback drop table comic;

--changeset Sivodedov Dmitry:create_table_comic_page
CREATE TABLE COMIC_PAGE
(
  ID    BIGINT PRIMARY KEY NOT NULL IDENTITY,
  COMIC BIGINT,
  INDEX INT,
  USER  BIGINT,
  URL   VARCHAR(255),
  CONSTRAINT FK_PAGE_COMIC FOREIGN KEY (COMIC) REFERENCES COMIC (ID)
);
--rollback drop table comic_page;