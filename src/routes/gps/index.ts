const express = require('express');
const router = express.Router();
const controller = require('../../middleware/gps');

router.get('/cartGps', controller.cartGps);

module.exports = router;
export default {};
