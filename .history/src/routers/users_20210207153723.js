const express = require('express')
const Users = require('../models/users')
const router = new express.Router()

router.post('/users', async (req, res)=> {
    const users = new Users(req.body)

    try {
        await users.save()
            res.status(201).send(users)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/users/login', async (req, res)=> {
   
    try {
        const admin = await Admin.login(req.body.email, req.body.password)
            res.send(admin)
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router
