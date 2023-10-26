const express = require('express');
const router = express.Router();
const controller = require('../../middleware/score');

/* GET users listing. */
router.get('/getScore', controller.getScore);

module.exports = router;
export default {};
