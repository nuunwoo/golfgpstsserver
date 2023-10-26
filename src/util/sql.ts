const login = ({ id, pwd }: { id: string; pwd: string }) => {
  return `SELECT 
  CO_DIV as co_div, USER_DIV as user_div, NAME as name, LOGIN_ID as login_id
  FROM gu0100 WHERE login_id = '${id}' AND pwd = SHA2(CONCAT('${pwd}'), 256) AND use_yn = 'Y';
  UPDATE gu0100 SET last_login_dtm = date_format(NOW(), '%Y%m%d%H%i%s') WHERE login_id = '${id}' AND pwd = SHA2(CONCAT('${pwd}'), 256) AND use_yn = 'Y';`;
};

const mapData = ({ co_div }: { co_div: string }) => `SELECT * FROM ga0100 WHERE CO_DIV = '${co_div}' AND hidden = 'N';
SELECT * FROM ga0200 WHERE CO_DIV = '${co_div}';`;
const cartData = `SELECT 
CO_DIV as co_div,
CART_NO as cart_no,
GAME_SID as game_sid,
GAME_DT as game_dt,
GAME_TI as game_ti,
CADDY_NAME as caddy_name,
PLAYERS_NAME as players_name,
CourseP as courseP,
CourseN as courseN,
CourseA as courseA,
IngCourseP as ingCourseP,
IngCourseN as ingCourseN,
IngCourseA as ingCourseA,
StartTiP as startTip,
EndTiP as endTip,
StartTiN as startTin,
EndTiN as endTin,
StartTiA as startTia,
EndTiA as endTia,
CurrentLat as currentLat,
CurrentLon as currentLon,
CurrentCourse as currentCourse,
CurrentHole as currentHole,
CurrentPar as currentPar,
CurrentGameNo as currentGameNo,
TcpState as tcpState,
BoardIdx as boardIdx,
GAMESTOP_STATE as gameStop_state,
CartIdx as cartIdx
FROM gb0100;`;

const send_seq = (co_div: string) => `SELECT CASE WHEN MAX(SEND_SEQ) IS NULL THEN 1 ELSE MAX(SEND_SEQ) + 1 END seq
FROM GG0100 WHERE CO_DIV = '${co_div}' AND SEND_DT = DATE_FORMAT(NOW(),'%Y%m%d');`;
const message_insert = ({ co_div, seq, to_no, msg }: { co_div: string; seq: number; to_no: number; msg: string }) =>
  `INSERT INTO GG0100 (CO_DIV, SEND_DT, SEND_SEQ, FROM_TYPE, FROM_NO, TO_TYPE, TO_NO, SEND_TIME, MESSAGE)
  VALUES ('${co_div}', DATE_FORMAT(NOW(),'%Y%m%d'), '${seq}', 'M', 1 , 'C', '${to_no}', NOW(), '${msg}');`;
const message_select = (co_div: string) =>
  `SELECT * FROM GG0100 WHERE CO_DIV = '${co_div}' AND SEND_DT = DATE_FORMAT(NOW(),'%Y%m%d') ORDER BY SEND_SEQ ASC;`;

const score_select = ({
  co_div,
  game_dt,
  game_sid,
}: {
  co_div: string;
  game_dt: string;
  game_sid: string;
}) => `SELECT DISTINCT
B.cust_nm
, CASE WHEN A.SCORE_A1      IS NULL THEN 0             ELSE A.SCORE_A1      END as score_a1
, CASE WHEN A.SCORE_A2      IS NULL THEN 0             ELSE A.SCORE_A2      END as score_a2
, CASE WHEN A.SCORE_A3      IS NULL THEN 0             ELSE A.SCORE_A3      END as score_a3
, CASE WHEN A.SCORE_A4      IS NULL THEN 0             ELSE A.SCORE_A4      END as score_a4
, CASE WHEN A.SCORE_A5      IS NULL THEN 0             ELSE A.SCORE_A5      END as score_a5
, CASE WHEN A.SCORE_A6      IS NULL THEN 0             ELSE A.SCORE_A6      END as score_a6
, CASE WHEN A.SCORE_A7      IS NULL THEN 0             ELSE A.SCORE_A7      END as score_a7
, CASE WHEN A.SCORE_A8      IS NULL THEN 0             ELSE A.SCORE_A8      END as score_a8
, CASE WHEN A.SCORE_A9      IS NULL THEN 0             ELSE A.SCORE_A9      END as score_a9
, CASE WHEN A.SCORE_TOTAL_A IS NULL THEN 0             ELSE A.SCORE_TOTAL_A END as score_total_a
, CASE WHEN A.SCORE_B1      IS NULL THEN 0             ELSE A.SCORE_B1      END as score_b1
, CASE WHEN A.SCORE_B2      IS NULL THEN 0             ELSE A.SCORE_B2      END as score_b2
, CASE WHEN A.SCORE_B3      IS NULL THEN 0             ELSE A.SCORE_B3      END as score_b3
, CASE WHEN A.SCORE_B4      IS NULL THEN 0             ELSE A.SCORE_B4      END as score_b4
, CASE WHEN A.SCORE_B5      IS NULL THEN 0             ELSE A.SCORE_B5      END as score_b5
, CASE WHEN A.SCORE_B6      IS NULL THEN 0             ELSE A.SCORE_B6      END as score_b6
, CASE WHEN A.SCORE_B7      IS NULL THEN 0             ELSE A.SCORE_B7      END as score_b7
, CASE WHEN A.SCORE_B8      IS NULL THEN 0             ELSE A.SCORE_B8      END as score_b8
, CASE WHEN A.SCORE_B9      IS NULL THEN 0             ELSE A.SCORE_B9      END as score_b9
, CASE WHEN A.SCORE_TOTAL_B IS NULL THEN 0             ELSE A.SCORE_TOTAL_B END as score_total_b
, CASE WHEN A.SCORE_TOTAL   IS NULL THEN 0             ELSE A.SCORE_TOTAL   END as score_total
, CASE WHEN A.COURSE_A      IS NULL THEN C.CHANGE_CD_P ELSE A.COURSE_A      END as course_a
, CASE WHEN A.COURSE_B      IS NULL THEN C.CHANGE_CD_N ELSE A.COURSE_B      END as course_b
, CASE WHEN A.COURSE_C      IS NULL THEN C.CHANGE_CD_A ELSE A.COURSE_C      END as course_c
, CASE WHEN A.HANDY         IS NULL THEN 0             ELSE A.HANDY         END as handy
, C.game_ti
, C.game_dt
, B.chkin_no
, C.cart_no
, C.team_name
, C.team_no
, CASE WHEN A.SCORE_C1      IS NULL THEN 0 ELSE A.SCORE_C1 END as score_c1
, CASE WHEN A.SCORE_C2      IS NULL THEN 0 ELSE A.SCORE_C2 END as score_c2
, CASE WHEN A.SCORE_C3      IS NULL THEN 0 ELSE A.SCORE_C3 END as score_c3
, CASE WHEN A.SCORE_C4      IS NULL THEN 0 ELSE A.SCORE_C4 END as score_c4
, CASE WHEN A.SCORE_C5      IS NULL THEN 0 ELSE A.SCORE_C5 END as score_c5
, CASE WHEN A.SCORE_C6      IS NULL THEN 0 ELSE A.SCORE_C6 END as score_c6
, CASE WHEN A.SCORE_C7      IS NULL THEN 0 ELSE A.SCORE_C7 END as score_c7
, CASE WHEN A.SCORE_C8      IS NULL THEN 0 ELSE A.SCORE_C8 END as score_c8
, CASE WHEN A.SCORE_C9      IS NULL THEN 0 ELSE A.SCORE_C9 END as score_c9
, CASE WHEN A.SCORE_TOTAL_C IS NULL THEN 0 ELSE A.SCORE_TOTAL_C END as score_total_c
, A.game_cour
, A.score_type
FROM GD0100 C
LEFT JOIN GC0110 B
   ON B.CO_DIV     = C.CO_DIV
   AND B.GAME_DT   = C.GAME_DT
   AND B.GAME_SID  = C.GAME_SID
   AND B.CHECKINYN = 'Y'
LEFT JOIN GD0300 A
   ON A.CO_DIV     = B.CO_DIV
   AND A.GAME_DT   = B.GAME_DT
   AND A.CHKIN_NO  = B.CHKIN_NO
WHERE C.CO_DIV = '${co_div}'
AND C.GAME_DT = '${game_dt}'
AND C.GAME_SID = '${game_sid}'
ORDER BY C.GAME_TI, C.CART_NO, C.CHANGE_CD_P, B.GAME_SID, B.CHKIN_NO ;`;

export { login, mapData, cartData, send_seq, message_insert, message_select, score_select };
