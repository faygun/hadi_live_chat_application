const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.get('/', auth, (req, res)=>{
    User.getAllUsers((users)=>{
        res.json(users);
    })
})

router.get('/getUserByEmail', (req, res)=>{
    let {email} = req.query;
    User.getUser(email,(user)=>{
        res.json(user);
    })
})


router.post('/', (req, res)=>{
    const {name, email, password} = req.body;
    
    if(!name || !email || !password) 
        return res.status(400).json('Please enter all fields');
        
    User.getUser(email, (user)=>{
        if(user) return res.status(400).json('User already exists');

        const newUser = User.User({
            name : name,
            email : email,
            password : password
        });

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                User.register(newUser, (user)=>{
                    jwt.sign({id:user.id}, config.get('jwtSecret'), {expiresIn:3600}, (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                name:user.name,
                                email:user.email,
                                id: user.id
                            }
                        });
                    })
                })
            })
        })
    })
        
} );


module.exports = router;
