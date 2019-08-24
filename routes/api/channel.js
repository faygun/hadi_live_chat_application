const express = require('express');
const router = express.Router();
const Channel = require('../../models/Channel');

router.get('/', (req, res)=>{
    Channel.getChannels((channels, error)=>{
        if(error)return res.status(500).json({error:error});
        res.json(channels);
    })
});

router.post('/message', (req, res) =>{
    let {channel_id, user_id} = req.body;
    Channel.getMessages(channel_id, user_id, (messages, err)=>{
        console.log(messages);
        if(err)return res.status(500).json({error:err});
        res.json(messages);
    })
})

module.exports = router;