const express = require('express');
const router = express.Router();
let dataJSON = require('../JSON/data.json')

router.get('/', (req, res) => {
    res.redirect('/admin/login')
})

router.get('/login', (req, res) => {
    const status = req.query.status
    res.render('login', {status})
})

router.post('/login', (req, res) => {
    let loginInput = req.body
    if(dataJSON.find(i => (i.email === loginInput.email && i.password === loginInput.password))) {
        res.redirect('/admin/dashboard')
    } else {
        res.redirect('/admin/login?status=wrong')
    }
})

module.exports = router;