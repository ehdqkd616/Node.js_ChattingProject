
-- CREATE USER (회원 테이블 생성)
CREATE TABLE USER (
	USERID		VARCHAR(40)		NOT NULL,
    PASSWORD	VARCHAR(255)	NOT NULL,
    JOIN_DATE	DATE			NOT NULL,
    PRIMARY KEY (USERID)
);

-- CREATE FOLLOW (팔로우 테이블 생성)
CREATE TABLE FOLLOW (
	FOLLOW_FROM		VARCHAR(40)		NOT NULL,
    FOLLOW_TO		VARCHAR(40)		NOT NULL,
    STATUS			CHAR(1)			NOT NULL,
    
    PRIMARY KEY(FOLLOW_FROM, FOLLOW_TO),
 	FOREIGN KEY(FOLLOW_FROM) REFERENCES USER(USERID),
    FOREIGN KEY(FOLLOW_TO) REFERENCES USER(USERID)
);

-- CREATE CHATROOM (채팅방 테이블 생성)
CREATE TABLE CHATROOM (
	CHATROOM_NO		INT	UNSIGNED	NOT NULL,
    CHATROOM_TIME	TIMESTAMP		NOT NULL,
    
    PRIMARY KEY AUTO_INCREMENT (CHATROOM_NO)
);

-- CREATE CHATROOM_MANAGEMENT (채팅방 관리 테이블 생성)
CREATE TABLE CHATROOM_MANAGEMENT (
	CHATROOM_NO		INT	UNSIGNED		NOT NULL,
    JOIN_USER		VARCHAR(40)			NOT NULL,
    
    PRIMARY KEY (CHATROOM_NO, JOIN_USER),
 	FOREIGN KEY (CHATROOM_NO) REFERENCES CHATROOM(CHATROOM_NO),
    FOREIGN KEY (JOIN_USER) REFERENCES USER(USERID)
);

-- CREATE MESSAGE (메세지 테이블 생성)
CREATE TABLE MESSAGE (
	MESSAGE_ID			INT UNSIGNED		NOT NULL,
    MESSAGE_CONTENT		VARCHAR(2000)		NOT NULL,
    MESSAGE_SENDTIME	TIMESTAMP			NOT NULL,
    MESSAGE_SENDER		VARCHAR(40)			NOT NULL,
    CHATROOM_NO			INT UNSIGNED		NOT NULL,
    
    PRIMARY KEY AUTO_INCREMENT (MESSAGE_ID),
    FOREIGN KEY (MESSAGE_SENDER) REFERENCES USER(USERID),
    FOREIGN KEY (CHATROOM_NO) REFERENCES CHATROOM(CHATROOM_NO)
);


----------- ISNERT SAMPLE DATA --------------
-- INSERT INTO USERS --
INSERT INTO USER (USERID, PASSWORD, JOIN_DATE) VALUES('user01', 'user01', SYSDATE());
INSERT INTO USER (USERID, PASSWORD, JOIN_DATE) VALUES('user02', 'user02', SYSDATE());
INSERT INTO USER (USERID, PASSWORD, JOIN_DATE) VALUES('user03', 'user03', SYSDATE());
INSERT INTO USER (USERID, PASSWORD, JOIN_DATE) VALUES('user04', 'user04', SYSDATE());
INSERT INTO USER (USERID, PASSWORD, JOIN_DATE) VALUES('user05', 'user05', SYSDATE());

-- INSERT INTO FOLLOW --
INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES('user01', 'user02', 'Y');
INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES('user02', 'user01', 'Y');
INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES('user01', 'user03', 'Y');
INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES('user03', 'user01', 'Y');

-- INSERT INTO CHATROOM --

-- INSERT INTO CHATROOM_MANAGEMENT --

-- INSERT INTO MESSAGE --


-- 전체 유저 목록
SELECT U.USERID, U.JOIN_DATE, (SELECT COUNT(*) FROM FOLLOW F2 WHERE F2.FOLLOW_FROM = U.USERID AND F2.STATUS = "Y") F_CNT, F.STATUS
FROM USER U LEFT OUTER JOIN FOLLOW F ON U.USERID = F.FOLLOW_TO AND F.FOLLOW_FROM = 'user01' WHERE USERID != 'user01';

-- 팔로우 요청 목록
SELECT F.FOLLOW_FROM, U.JOIN_DATE
FROM USER U INNER JOIN FOLLOW F ON U.USERID = F.FOLLOW_FROM
WHERE F.STATUS = 'W' AND F.FOLLOW_FROM != 'user01' AND F.FOLLOW_TO = 'user01';

-- 친구 목록
SELECT F.FOLLOW_FROM, U.JOIN_DATE
FROM USER U INNER JOIN FOLLOW F ON U.USERID = F.FOLLOW_FROM
WHERE F.STATUS = 'Y' AND F.FOLLOW_FROM != 'user01' AND F.FOLLOW_TO = 'user01';

-- 팔로우 요청 수락
INSERT INTO FOLLOW (FOLLOW_FROM, FOLLOW_TO, STATUS) VALUES (?, ?, 'Y');
UPDATE FOLLOW SET STATUS='Y' WHERE FOLLOW_FROM = ? AND FOLLOW_TO = ?;

-- 팔로우 요청 거절
DELETE FROM FOLLOW WHERE FOLLOW_FROM = ? AND FOLLOW_TO = ?;

-- 친구 삭제
DELETE FROM FOLLOW WHERE FOLLOW_FROM = ? AND FOLLOW_TO = ?;
DELETE FROM FOLLOW WHERE FOLLOW_TO = ? AND FOLLOW_FROM = ? ;


DELETE FROM FOLLOW WHERE FOLLOW_FROM = 'user05' AND FOLLOW_TO = 'user01';
DELETE FROM FOLLOW WHERE FOLLOW_FROM = 'user05' AND FOLLOW_TO = 'user02';
DELETE FROM FOLLOW WHERE FOLLOW_FROM = 'user05' AND FOLLOW_TO = 'user03';
DELETE FROM FOLLOW WHERE FOLLOW_FROM = 'user05' AND FOLLOW_TO = 'user04';

commit;