const express = require('express');
const router = express.Router();
const Gymcontroller =require('../Controllers/gym')
const auth = require('../Auth/auth');




router.post('/register', Gymcontroller.register);
router.post('/login', Gymcontroller.login);
router.post('/reset-password/sendOtp', Gymcontroller.sendOtp)
router.post("/reset-password/checkOtp",Gymcontroller.checkOtp);
router.post("/reset-password",Gymcontroller.resetPassword);
router.post('/logout', auth, Gymcontroller.logout);




module.exports = router;

