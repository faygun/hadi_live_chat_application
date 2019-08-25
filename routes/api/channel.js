const express = require('express');
const router = express.Router();
const Channel = require('../../models/Channel');
const auth = require('../../middleware/auth');

router.post('/send', auth, (req,res)=>{
        
    let {channel_id,message, name} = req.body;
    Channel.send({channel_id, message, name, user_id:req.user.id},(response, err)=>{
        if(err)return res.status(500).json({error:err});
        return res.json(response);
    });
    
});

router.get('/', auth, (req, res)=>{
    Channel.getChannels((channels, error)=>{
        if(error)return res.status(500).json({error:error});
        res.json(channels);
    })
});

router.post('/message', auth, (req, res) =>{
    let {channel_id} = req.body;
    Channel.getMessages(channel_id, req.user.id, (messages, err)=>{
        if(err)return res.status(500).json({error:err});
        return res.json(messages.slice(messages.length > 0 ? messages.length-6 : 0));
    })
})

module.exports =router;