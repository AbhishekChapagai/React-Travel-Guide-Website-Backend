const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { verifyUser } = require('../middleware/auth')


// Sign up router
router.post('/signup',
    function (req, res) {
        const { firstName, lastName, email, password } = req.body;

        bcrypt.hash(password, 10, function (err, hash) {
            const userdata = new User({ firstName, lastName, email, password: hash });
            userdata.save()
                .then(function (result) {
                    // success insert
                    res.status(201).json({
                        message: "Registered success !!",
                        success: true
                    });
                })
                .catch(function (error) {
                    res.status(500).json({
                        message: res.error,
                        success: false
                    })
                })
        })
    })

// login users
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((userWithEmail) => {
        if (userWithEmail == null) {
            return res.status(403).json({ message: "Email or password does not match", success: false })
        }
        bcrypt.compare(password, userWithEmail.password).then((result) => {
            if (result === false) {
                return res.status(403).json({
                    message: 'Email or password incorrect',
                    success: false
                })
            }
            const token = jwt.sign({
                userID: userWithEmail._id, firstName: userWithEmail.firstName,
                lastName: userWithEmail.lastName, email: userWithEmail.email
            }, process.env.JWT_TOKEN)
            res.json({
                message: "Welcome back", token: token, userID: userWithEmail._id, firstName: userWithEmail.firstName,
                lastName: userWithEmail.lastName, email: userWithEmail.email
            })
        })
    })

})

// User verification
router.get('/auth', verifyUser, (req, res) => {
    try {
        if (req.user) {
            res.json(req.user);
            console.log(req.user)
        } else {
            req.json({ error: "Error" })
        }
    } catch (error) {
        console.log(error);
    }



})
module.exports = router;