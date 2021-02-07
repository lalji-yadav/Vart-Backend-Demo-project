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
        trim: true
    },
    addresh: {
        type: String,
        required: true,
        trim: true
    }
})

const Admin = mongoose.model('Admin', adminSchema);
