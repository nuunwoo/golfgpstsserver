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
exports.mapData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield asyncPromise(sql.mapData(Object.assign({}, req.query)));
        const mapData = {
            success: true,
            mapData: result[0],
            courseData: result[1],
        };
        for (let i = 0; i < result[1].length; i++) {
            const par_cnt = [];
            //   mapData.courseData.push(result[1][i]);
            for (let j = 0; j < Object.keys(result[1][i]).length; j++) {
                if (Object.keys(result[1][i])[j].includes('par_cnt_')) {
                    par_cnt.push(Number(Object.values(result[1][i])[j]));
                }
            }
            mapData.courseData[i].par_cnt = par_cnt;
        }
        res.send(mapData);
    }
    catch (err) {
        console.log(err);
    }
});
