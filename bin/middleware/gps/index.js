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
const jwt = require('../../util/jwt');
let cartData = [];
let intervalCartGpsData;
let _isInterval = false;
const getCartGpsData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield asyncPromise(sql.cartData);
        cartData = result;
        if (result.length === 0) {
            clearInterval(intervalCartGpsData);
            _isInterval = false;
        }
    }
    catch (err) {
        console.log(err);
    }
});
const filterData = (arr, co_div) => {
    return arr.filter(el => el.co_div === co_div);
};
exports.cartGps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.token) {
        const co_div = jwt.verify(req.cookies.token).co_div;
        if (cartData.length === 0) {
            const result = yield asyncPromise(sql.cartData);
            if (result) {
                if (!_isInterval && result.length > 0) {
                    intervalCartGpsData = setInterval(getCartGpsData, 1000);
                    _isInterval = true;
                }
                res.send({
                    success: true,
                    cartData: filterData(result, co_div),
                });
            }
        }
        else {
            res.send({
                success: true,
                cartData: filterData(cartData, co_div),
            });
        }
    }
    else
        res.send({
            success: false,
        });
});
