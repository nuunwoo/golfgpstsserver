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
const sql = require('../../util/sql');
const asyncPromise = require('../../util/db').asyncPromise;
exports.send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSeq = yield asyncPromise(sql.send_seq(req.body.co_div));
        try {
            const isert = yield asyncPromise(sql.message_insert(Object.assign(Object.assign({}, req.body), getSeq[0])));
            if (isert.warningCount === 0) {
                // res.redirect(307, '/message/receive');
                res.send({ success: true });
            }
        }
        catch (err) {
            console.log(err);
            res.send({ success: false });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ success: false });
    }
});
exports.receive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { co_div } = req.body;
    try {
        const select = yield asyncPromise(sql.message_select(co_div));
        res.send({ success: true, message: select });
    }
    catch (err) {
        console.log(err);
        res.send({ success: false });
    }
});
