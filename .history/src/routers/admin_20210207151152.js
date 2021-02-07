const express = require('express')
const Admin = require('../models/admin')
const router = new express.Router()

router.post('/admin', async (req, res)=> {
    const admin = new Admin(req.body)

    try {
        await admin.save()
            res.status(201).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/admin/login', async (req, res)=> {
   
    try {
        const admin = await Admin.login(req.body.email, req.body.password)
            res.send(admin)
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router
