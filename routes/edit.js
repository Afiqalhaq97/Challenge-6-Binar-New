const express = require('express');
const router = express.Router();
const UserCred = require('../models/UserCredSchema')
const UserBio = require('../models/UserBiodataSchema')
const UserHistory = require('../models/UserHistorySchema')

router.get('/edit-data', async (req, res) => {
    const status = req.query.status;
    const error = req.query.err;
    const id = req.query.id;
    // Check Data IF User Exist
    await UserCred.findById(id.trim(), async (err, userCred) => {
        if (err) {
            res.send(err)
        } else {
            const userBio = await UserBio.findOne({user_id: id.trim()});
            const userHistory = await UserHistory.findOne({user_id: id.trim()});
            if (userBio && userHistory) {
                res.render('edit-data.ejs', {userCred, userBio, userHistory, status, error})
            } else {
                res.send("FAILED TO SHOW DATA")
            }
        }
    })
})

router.post('/edit-data', async (req, res) => {
    const {email, password, name, age, wins, losses, id} = req.body

    try {
        const credEdit = await new UserCred ({
            email: email,
            password: password
        })

        const user_id = credEdit._id
        
        const bioEdit = await new UserBio ({
            name: name,
            age: age,
            user_id: user_id
        })

        const historyEdit = await new UserHistory ({
            wins: wins,
            losses: losses,
            user_id: user_id
        })
        //validasi dulu sblm edit
        await credEdit.validate();
        await bioEdit.validate();
        await historyEdit.validate();
        //edit jika validasi telah dilewati
        await UserCred.findByIdAndUpdate(id.trim(), {email: email, password: password})
        await UserBio.findOneAndUpdate({user_id: id.trim()}, {name: name, age: age})
        await UserHistory.findOneAndUpdate({user_id: id.trim()}, {wins: wins, losses: losses})
        

        res.redirect('/admin/dashboard?status=edited')
        
    } catch (error){
        res.redirect('/admin/edit-data?status=fail&err=' + error.message + '&id=' + id)
    }
})

module.exports = router