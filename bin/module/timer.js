"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const millisecond = date.getMilliseconds();
const timer = () => {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}:${String(millisecond).slice(0, 2)}`;
};
module.exports.timer = () => timer();
module.exports.redisSession = () => { };
exports.default = {};
