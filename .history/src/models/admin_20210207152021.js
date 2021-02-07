const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcrypt')

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
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        trim: true
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
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

// Login 

adminSchema.static.login = async (email, password) => {
    const admin = await Admin.findOne({ email })

    if(!admin) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, admin.password) 
     if(!isMatch) {
         throw new Error('Unable to login')
     }

    return admin
}

// bcrypt password 

adminSchema.pre('save', async function(next) {
    const admin = this
    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin
