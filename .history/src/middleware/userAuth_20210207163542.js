const jwt = require('jsonwebtoken')
const Users = require('../models/users')

const usersAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret')
        const users = await Users.findOne({_id: decoded._id, 'tokens.token': token})

        if(!users) {
            throw new Error('User not found')
        }

        req.token = token
        req.users = users

        next()

    } catch (error) {
         res.status(401).send({error: 'please authenticate'});
    }
}

module.exports = usersAuth
