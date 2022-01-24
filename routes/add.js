const express = require('express');
const router = express.Router();
const UserCred = require('../models/UserCredSchema')
const UserBio = require('../models/UserBiodataSchema')
const UserHistory = require('../models/UserHistorySchema')

router.get('/add-data', async (req, res) => {
    const status = req.query.status;
    const error = req.query.err;
    res.render('add-data', {status, error})
})

router.post('/add-data', async (req, res) => {
    const {email, password, name, age, wins, losses} = req.body

    try {
        const credAdd = await new UserCred ({
            email: email,
            password: password
        })

        const user_id = credAdd._id
        
        const bioAdd = await new UserBio ({
            name: name,
            age: age,
            user_id: user_id
        })

        const historyAdd = await new UserHistory ({
            wins: wins,
            losses: losses,
            user_id: user_id
        })

        // Validation after save
        await credAdd.validate();
        await bioAdd.validate();
        await historyAdd.validate();

        // Save after validation passed
        await credAdd.save()
        await bioAdd.save()
        await historyAdd.save()

        res.redirect('/admin/dashboard?status=added')
        
    } catch (error){
        res.redirect('/admin/add-data?status=fail&err=' + error.message)
    }
})
module.exports = router