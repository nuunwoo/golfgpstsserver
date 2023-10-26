const express = require('express');
const router = express.Router();

const auth = require('./auth/index');
const map = require('./map/index');
const gps = require('./gps/index');
const message = require('./message/index');
const score = require('./score/index');

router.use('/auth', auth);
router.use('/map', map);
router.use('/gps', gps);
router.use('/message', message);
router.use('/score', score);

module.exports = router;
export default {};
