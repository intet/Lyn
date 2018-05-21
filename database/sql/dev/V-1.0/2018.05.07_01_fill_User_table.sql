--liquibase formatted sql
--changeset Sivodedov Dmitry:Create_User
INSERT INTO principal (id, username, password, firstname, lastname) VALUES (1, 'user', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Fan', 'Jin');
INSERT INTO principal (id, username, password, firstname, lastname) VALUES (2, 'admin', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Jing', 'Xiao');

INSERT INTO authority (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO authority (id, name) VALUES (2, 'ROLE_ADMIN');

INSERT INTO user_authority (user_id, authority_id) VALUES (1, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (2, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (2, 2);

INSERT INTO DICTIONARY (ID, NAME, FROM_LANGUAGE, TO_LANGUAGE, "USER")
VALUES (1, 'Общий', 1, 2, 1);
INSERT INTO DICTIONARY (ID, NAME, FROM_LANGUAGE, TO_LANGUAGE, "USER")
VALUES (2, 'Общий', 1, 2, 2);

INSERT INTO WORD (ID, COUNT_ATTEMPTS, COUNT_FAIL, COUNT_SUCCESS, CREATED, LAST_ATTEMPT, LAST_SUCCESS, TEXT, LTEXT, LANGUAGE, DICTIONARY)
VALUES (1, 0, 0, 0, '2018-05-18 16:04:03.981000', NULL, NULL, 'world', 'world', 1, 1);
INSERT INTO WORD (ID, COUNT_ATTEMPTS, COUNT_FAIL, COUNT_SUCCESS, CREATED, LAST_ATTEMPT, LAST_SUCCESS, TEXT, LTEXT, LANGUAGE, DICTIONARY)
VALUES (2, 0, 0, 0, '2018-05-18 16:04:03.984000', NULL, NULL, 'мир', 'мир', 2, 1);
INSERT INTO WORD (ID, COUNT_ATTEMPTS, COUNT_FAIL, COUNT_SUCCESS, CREATED, LAST_ATTEMPT, LAST_SUCCESS, TEXT, LTEXT, LANGUAGE, DICTIONARY)
VALUES (3, 0, 0, 0, '2018-05-18 16:04:03.981000', NULL, NULL, 'world', 'world', 1, 2);
INSERT INTO WORD (ID, COUNT_ATTEMPTS, COUNT_FAIL, COUNT_SUCCESS, CREATED, LAST_ATTEMPT, LAST_SUCCESS, TEXT, LTEXT, LANGUAGE, DICTIONARY)
VALUES (4, 0, 0, 0, '2018-05-18 16:04:03.984000', NULL, NULL, 'мир', 'мир', 2, 2);

INSERT INTO WORD_LINK (id, DICTIONARY, TYPE) VALUES (1, 1, 0);
INSERT INTO WORD_LINK (id, DICTIONARY, TYPE) VALUES (2, 2, 0);

INSERT INTO WORD_LINK_FROM (LINK_ID, WORD_ID) VALUES (1, 1);
INSERT INTO WORD_LINK_FROM (LINK_ID, WORD_ID) VALUES (2, 3);

INSERT INTO WORD_LINK_TO (LINK_ID, WORD_ID) VALUES (1, 2);
INSERT INTO WORD_LINK_TO (LINK_ID, WORD_ID) VALUES (2, 4);
--rollback delete from language;
--rollback delete from authority where id in (1,2);
--rollback delete from user_authority where user_id in (1, 2);
--rollback delete from principal where id in (1, 2);
