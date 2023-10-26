"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const controller = require('../../middleware/message');
/* GET users listing. */
router.post('/send', controller.send);
router.post('/receive', controller.receive);
module.exports = router;
exports.default = {};
