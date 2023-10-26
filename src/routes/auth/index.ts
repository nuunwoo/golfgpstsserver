const express = require('express');
const router = express.Router();
const controller = require('../../middleware/auth');

/* GET users listing. */
router.get('/login', controller.login);
router.get('/autologin', controller.autologin);
router.get('/logout', controller.logout);

module.exports = router;
export default {};
