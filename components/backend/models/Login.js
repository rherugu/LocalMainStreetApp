const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    bname: {
        type: String,
        required: true
    },
    bdesc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ccardnum: {
        type: String,
        required: true
    },
    phonenum: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Login', LoginSchema)