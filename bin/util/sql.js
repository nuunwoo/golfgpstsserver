"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message_select = exports.message_insert = exports.send_seq = exports.cartData = exports.mapData = exports.login = void 0;
const login = ({ id, pwd }) => `SELECT 
  CO_DIV as co_div, USER_DIV as user_div, NAME as name, LOGIN_ID as login_id
  FROM gu0100 WHERE login_id = '${id}' AND pwd = SHA2(CONCAT('${pwd}'), 256) AND use_yn = 'Y';
  UPDATE gu0100 SET last_login_dtm = date_format(NOW(), '%Y%m%d%H%i%s') WHERE login_id = '${id}' AND pwd = SHA2(CONCAT('${pwd}'), 256) AND use_yn = 'Y';`;
exports.login = login;
const mapData = ({ co_div }) => `SELECT * FROM ga0100 WHERE CO_DIV = '${co_div}' AND hidden = 'N';
SELECT * FROM ga0200 WHERE CO_DIV = '${co_div}';`;
exports.mapData = mapData;
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
exports.cartData = cartData;
const send_seq = (co_div) => `SELECT CASE WHEN MAX(SEND_SEQ) IS NULL THEN 1 ELSE MAX(SEND_SEQ) + 1 END seq
FROM GG0100 WHERE CO_DIV = '${co_div}' AND SEND_DT = DATE_FORMAT(NOW(),'%Y%m%d');`;
exports.send_seq = send_seq;
const message_insert = ({ co_div, seq, to_no, msg }) => `INSERT INTO GG0100 (CO_DIV, SEND_DT, SEND_SEQ, FROM_TYPE, FROM_NO, TO_TYPE, TO_NO, SEND_TIME, MESSAGE)
  VALUES ('${co_div}', DATE_FORMAT(NOW(),'%Y%m%d'), '${seq}', 'M', 1 , 'C', '${to_no}', NOW(), '${msg}');`;
exports.message_insert = message_insert;
const message_select = (co_div) => `SELECT * FROM GG0100 WHERE CO_DIV = '${co_div}' AND SEND_DT = DATE_FORMAT(NOW(),'%Y%m%d') ORDER BY SEND_SEQ ASC;`;
exports.message_select = message_select;
