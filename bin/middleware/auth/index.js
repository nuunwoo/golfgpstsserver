"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = require('url');
const timer = require('../../module/timer').timer();
const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;
const cookieOption = require('../../config/cookie').accessOption;
const jwt = require('../../util/jwt');
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield asyncPromise(sql.login(Object.assign({}, req.query)));
        if (result[0].length > 0) {
            const { co_div, name, user_div, login_id } = result[0][0];
            const cookie = jwt.sign(co_div, name, user_div, login_id);
            res.cookie('token', cookie, cookieOption);
            if (user_div === 'A') {
                res.send(result[0]);
            }
            if (user_div === 'U') {
                res.redirect(url.format({
                    pathname: '/map/mapData',
                    query: {
                        co_div: co_div,
                    },
                }));
            }
        }
        else
            res.send({
                success: false,
                message: '계정 정보가 다릅니다.',
            });
    }
    catch (err) {
        console.log(err);
    }
});
exports.autologin = (req, res) => {
    if (req.cookies.token) {
        const { co_div, name, user_div, login_id } = jwt.verify(req.cookies.token);
        try {
            const replace = jwt.sign(co_div, name, user_div, login_id);
            res.cookie('token', replace, cookieOption);
            if (user_div === 'A') {
                // res.send(result[0]);
            }
            else if (user_div === 'U') {
                res.redirect(url.format({
                    pathname: '/map/mapData',
                    query: {
                        co_div: co_div,
                    },
                }));
            }
            else
                res.send({ success: false });
        }
        catch (err) {
            console.log(err);
        }
    }
    else
        res.send({ success: false });
};
exports.logout = (_req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
};
