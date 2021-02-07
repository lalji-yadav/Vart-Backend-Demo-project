const mongoose = require('mongoose')

const { Schema } = mongoose

const adminSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin

