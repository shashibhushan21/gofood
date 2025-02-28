
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

const User = require("../models/User")

const { body, validationResult } = require('express-validator');

router.post("/createuser", [
    body('email', 'Invalid Email please enter Correct email').isEmail(),
    body('name', 'Enter first name & last Name').isLength({ min: 4 }),
    body('password', 'Password should Min 5 Characters').isLength({ min: 5 }),
]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await User.create({
                // name: "Shashi Bhushan",
                // password: "123456",
                // email:"shashi.bkumar21@gmail.com",
                // location:"bhubneswar"
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location,

            })
            res.json({ success: true, message: 'User created successfully' })
        } catch {
            res.status(500).json({ message: "Error creating user" })
        }
    })



// router.post("/loginuser", [
//     body('email', 'Invalid Email please enter Correct email').isEmail(),
//     body('password', 'Password should Min 5 Characters').isLength({ min: 5 }),
// ],
//     async (req, res) => {

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         // let email = req.body.email;
        
//         const { email, password } = req.body;

//         try {
//             let userData = await User.findOne({email: email});
//             if (!userData) {
//                 res.status(400).json({ message: "User not found" })
//             }
//             let isPasswordValid = await User.findOne({password: password});
//             if (!isPasswordValid) {
//                 res.status(400).json({ message: "Invalid Password" })
//             }

//             return res.json({ success: true, message: "User Logged in successfully" })


//         } catch {
//             res.status(500).json({ message: "Error creating user" })
//         }
//     })

router.post("/loginuser", [
    body('email', 'Invalid Email. Please enter a valid email address.').isEmail(),
    body('password', 'Password must be at least 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({ message: "User not found. Please check your email." });
        }

        // Compare the provided password with the hashed password in the database
        // const isPasswordValid = await bcrypt.compare(password, userData.password);
        const isPasswordValid  = await User.findOne({ password: password });
        if (!isPasswordValid) {
            return res.status(400).json( alert,{ message: "Invalid password. Please try again." });
        }

        // If everything is correct, return a success response
        return res.json({ success: true, message: "User logged in successfully." });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "An error occurred during login. Please try again later." });
    }
});


module.exports = router;

