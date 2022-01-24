const express = require('express');
const router = express.Router();
const UserCred = require('../models/UserCredSchema')
const UserBio = require('../models/UserBiodataSchema')
const UserHistory = require('../models/UserHistorySchema')

router.get('/dashboard', async (req, res) => {
    const status = req.query.status;
    const credential = await UserCred.find();
    const biodata = await UserBio.find();
    const history = await UserHistory.find();

    res.render('dashboard', {credential, biodata, history, status})
})

module.exports = router;