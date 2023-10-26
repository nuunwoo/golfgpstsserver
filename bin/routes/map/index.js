"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const controller = require('../../middleware/map');
router.get('/mapData', controller.mapData);
module.exports = router;
exports.default = {};
