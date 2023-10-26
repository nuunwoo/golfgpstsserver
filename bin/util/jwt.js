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
const { promisify } = require('util');
const jwtUtil = require('jsonwebtoken');
const SERCRETKEY = process.env.SERCRETKEY;
module.exports = {
    sign: (co_div, name, user_div, login_id) => {
        const payload = {
            co_div: co_div,
            name: name,
            user_div: user_div,
            login_id: login_id,
        };
        return jwtUtil.sign(payload, SERCRETKEY, {
            expiresIn: '1d',
            algorithm: 'HS256',
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwtUtil.verify(token, SERCRETKEY);
            return {
                type: true,
                co_div: decoded.co_div,
                name: decoded.name,
                user_div: decoded.user_div,
                login_id: decoded.login_id,
            };
        }
        catch (err) {
            return {
                type: false,
                message: err,
            };
        }
    },
    decode: (token) => {
        let decoded = null;
        try {
            decoded = jwtUtil.decode(token, SERCRETKEY);
            return {
                type: true,
                key: decoded.key,
            };
        }
        catch (err) {
            return {
                type: false,
                message: err,
            };
        }
    },
    refresh: () => {
        return jwtUtil.sign({}, SERCRETKEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
    },
    refreshVerify: (token, key) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(yield jwtUtil.verify(token, SERCRETKEY));
            try {
                jwtUtil.verify(token, SERCRETKEY);
                return true;
            }
            catch (err) {
                return err;
            }
        }
        catch (err) {
            return false;
        }
    }),
};
