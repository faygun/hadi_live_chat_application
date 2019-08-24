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
        if(err)return res.status(500).json({error:err});
        return res.json(messages);
    })
})

router.post('/send',(req,res)=>{
    let {channel_id, user_id, message, name} = req.body;
    Channel.send({channel_id, user_id, message, name},(response, err)=>{
        if(err)return res.status(500).json({error:err});
        return res.json("OK");
    });
    
})

module.exports = router;