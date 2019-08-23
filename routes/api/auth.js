const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.post('/',(req, res)=>{
    var {email, password} = req.body;
    
    if(!email || !password) 
        return res.status(400).json('Please enter all fields');

    User.getUser(email, (user)=>{
        if(!user) return res.status(400).json('User Does not exist');

        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json('Invalid credentials')

            jwt.sign({id:user.id}, config.get('jwtSecret'), {expiresIn:3600},(err, token) => {
                if(err) throw err;
            
                res.json({
                    token,
                    user:{
                        name:user.name,
                        email:user.email,
                        id: user.id,
                        date : user.time    
                    }
                });
            })
        })
    })
});

module.exports = router;
