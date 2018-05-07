--liquibase formatted sql
--changeset Sivodedov Dmitry:create_table_principal
CREATE TABLE PRINCIPAL
(
  ID        BIGINT PRIMARY KEY NOT NULL IDENTITY,
  FIRSTNAME VARCHAR(255),
  LASTNAME  VARCHAR(255),
  PASSWORD  VARCHAR(255),
  USERNAME  VARCHAR(255)
);
--rollback drop table principal;

--changeset Sivodedov Dmitry:create_table_authority
CREATE TABLE AUTHORITY
(
  ID   BIGINT PRIMARY KEY NOT NULL IDENTITY,
  NAME VARCHAR(255)
);
--rollback drop table authority;