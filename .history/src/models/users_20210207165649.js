const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const usersSchema = new Schema({
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] 
})

// generate user token 

usersSchema.method.generateAuthToken = async function () {
    const users = this
    const token = jwt.sign({_id: users._id.toString()}, 'thisissecret')
    users.tokens = users.tokens.concat({token})
    await users.save()
    return token

}

// userSchema.methods.generateAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({_id: user._id.toString() }, 'thisismynewcourse')
//     user.tokens = user.tokens.concat({ token })
//     await user.save()
    
//     return token
// }

// Login User

usersSchema.statics.login = async (email, password) => {
    const users = await Users.findOne({ email })

    if(!users) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, users.password) 
     if(!isMatch) {
         throw new Error('Unable to login')
     }

    return users
}
// bcrypt users password 

usersSchema.pre('save', async function(next) {
    const users = this
    if(users.isModified('password')) {
        users.password = await bcrypt.hash(users.password, 8)
    }
    next()
})

const Users = mongoose.model('Users', usersSchema);
module.exports = Users
