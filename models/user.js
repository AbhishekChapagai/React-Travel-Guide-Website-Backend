const mongoose = require('mongoose')
const Users = mongoose.model('Users', {
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true
    },
    // phoneNumber: {
    //     type: Number,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true

    // }
    // uimage:{
    //     type: String
    // }

})

module.exports = Users;