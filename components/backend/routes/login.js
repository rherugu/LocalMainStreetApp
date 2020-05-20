const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    password: Joi.string().min(8).required(),
    bname: Joi.string().required(),
    bdesc: Joi.string().min(150).required(),
    email: Joi.string().required().email(),
    ccardnum: Joi.number().required(),
    phonenum: Joi.number().required()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

router.post('/register', async (req,res) => {

    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const emailExists = await Login.findOne({ email: req.body.email });
    if (emailExists) return res.status(404).send("Email already exists.");

    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const login = new Login({
        password: hashPassword,
        bname: req.body.bname,
        bdesc: req.body.bdesc,
        email: req.body.email,
        ccardnum: req.body.ccardnum,
        phonenum: req.body.phonenum
    });
    try {
            const savedLogin = await login.save();
            res.send("Registration was successful!");
    }catch(err){
        res.json({message: err});
    }
});

router.post('/login', async (req,res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const user = await Login.findOne({ email: req.body.email});
    if (!user) return res.status(404).send("Email or password is invalid.");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(404).send("Email or password is invalid.")

    const token = jwt.sign({_id: user._id}, process.env.tokenSecret);
    res.header('auth-token', token);

    res.send("Successfully logged in!")
});

// router.delete('/:loginID', async (req, res) => {
//     try {
//         const removedAccout = await Login.remove({_id: req.params.loginID});
//         res.json(removedAccout);
//     }catch(err){
//         res.json({message: err});
//     }
// });

// router.patch('/:loginID', async (req,res) => {
//     try {
//         const updatedAccout = await Login.updateOne({_id: req.params.loginID},
//         {$set:{username: req.body.username, password: req.body.password}});
//         res.json(updatedAccout);
//     }catch(err){
//         res.json({message: err});
//     }
// });

router.get('/', async (req,res) => {
    try {
        const Users = await Login.find();
        const bnames = Users.map(user => user.bname)
        const bdescs = Users.map(user => user.bdesc)
        res.json(Users);
    }catch (err){
        res.json({message: err});
    }
});
module.exports = router;