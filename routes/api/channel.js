const express = require('express');
const router = express.Router();
const Channel = require('../../models/Channel');

router.get('/', (req, res)=>{
    Channel.getChannels((channels, error)=>{
        if(error)return res.status(500).json({error:error});
        res.json(channels);
    })
});

module.exports = router;