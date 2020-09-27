const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
 
//User model
const User = require('../models/User')

//Pagina Login
router.get('/login', (req, res) => res.render('Login'));

//Register pag
router.get('/register', (req, res) => res.render('Registro'));

//Register Handle
router.post('/register', (req, res)=> {
    const { name, email, password, password2 }= req.body; 
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    //check password match
    if (password !== password2) {
        errors.push({msg:'Password do not match'})
    }

    //Check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //Valid passed
        //res.send('pass')
        User.findOne({ email: email})
        .then( user => {
            if (user) {
                //User exits
                errors.push({ msg: 'Email is already registered' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser= new User ({
                    name,
                    email,
                    password
                });
                //Hash Password
                //console.log(newUser)
                //res.send('Hello')
                newUser.password = hash;
                //Save user
                newUser.save()
                .then( user => {
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err))
            }
        });
    }

});

//module.exports = router

module.exports = router;