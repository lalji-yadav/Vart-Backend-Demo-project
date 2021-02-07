const jwt = require('jsonwebtoken')
const Users = require('../models/users')

const usersAuth = (req, res, auth) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
    } catch (error) {
        
    }
}
