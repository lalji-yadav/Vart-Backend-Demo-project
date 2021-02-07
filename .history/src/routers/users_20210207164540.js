const express = require('express')
const Users = require('../models/users')
const router = new express.Router()
const usersAuth = require('../middleware/userAuth')

router.post('/users', async (req, res)=> {
    const users = new Users(req.body)

    try {
        await users.save()
        const token = await users.generateAuthToken()
        res.status(201).send({ users, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/users/login', async (req, res)=> {
   
    try {
        const users = await Users.login(req.body.email, req.body.password)
        const token = await users.generateAuthToken()
        res.send({ users, token })

    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router
