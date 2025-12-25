const express = require('express');
const router = express.Router();
const Membershipcontroller = require('../Controllers/membership');
const auth = require('../Auth/auth');

router.post('/add-membership',auth, Membershipcontroller.addMembership);
router.get('/get-memberships',auth, Membershipcontroller.getMemberships);






module.exports = router;