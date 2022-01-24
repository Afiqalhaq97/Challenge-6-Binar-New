const express = require('express');
const router = express.Router();
const UserCred = require('../models/UserCredSchema')
const UserBio = require('../models/UserBiodataSchema')
const UserHistory = require('../models/UserHistorySchema')

router.post('/delete-data', async (req, res) => {
    const id = req.body.id;
    // Check Data IF User Exist
    await UserCred.findById(id, async (err, docs) => {
        if (err) {
            res.send(err)
        } else {
            const userBio = await UserBio.findOne({user_id: id});
            const userHistory = await UserHistory.findOne({user_id: id});
            if (userBio && userHistory) {
                await UserCred.findByIdAndDelete(id)
                await UserBio.findOneAndDelete({user_id: id})
                await UserHistory.findOneAndDelete({user_id: id})
                res.redirect('/admin/dashboard?status=deleted')
            } else {
                res.send("FAILED TO DELETE DATA")
            }
        }
    })
})

module.exports = router;