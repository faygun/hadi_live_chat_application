const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const jwt = require('jsonwebtoken');

router.get('/',(req, res)=>{
    res.json({message:"auth api"})
});

module.exports = router;
