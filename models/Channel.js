var Redis = require('ioredis');
var uuid = require('uuid');
var redis = new Redis();

module.exports = {
    Channel : (passed)=>{
        this.id = uuid(),
        this.name = passed.name;
        this.users = passed.users ? passed.users : [];
        this.messages = passed.messages ? passed.messages : [];
        this.time = Date.now();
        return this;
    },
    
    getChannels : (callback)=>{
        redis.get('channels', (err,res) =>{
            if(!err){
                let channels = JSON.parse(res);
                callback(channels);
            }else{

                callback(error = err);
            }

        })
    },

    getMessages: (channel_id, user_id, callback) =>{
        redis.get('channels', (err,res) =>{
            if(!err){
                let channels = JSON.parse(res);
                let channel = channels.find((item)=>{
                    return item.id === channel_id;
                });
                
                // channel.users.push({
                //     id:"872b1a5b-3b89-43c1-89c3-88702def649a"
                // })
                // channel.messages.push({
                //     message:'selam selam es greeetingg hiii',
                //     time:Date.now(),
                //     user_id : "872b1a5b-3b89-43c1-89c3-88702def649a",
                //     user_name:"Faruk"
                // });

                // channel.messages.push({
                //     message:'aaaaaaaaaaa aaaaaaaaaaaaaaa',
                //     time:Date.now(),
                //     user_id : "872b1a5b-3b89-43c1-89c3-88702def649a",
                //     user_name:"Ahmet"
                // });

                // channel.messages.push({
                //     message:'bbbbbbbbb bbbbbbbbbbbbbbbb',
                //     time:Date.now(),
                //     user_id : "872b1a5b-3b89-43c1-89c3-88702def649a",
                //     user_name:"Nurgül"
                // });

                if(channel){
                    console.log(channel);
                    if(channel.users && channel.users.find((item)=> {return item.id === user_id})){
                        callback(channel.messages.sort((a,b)=> {return a.time > b.time}));
                    }
                }
            }else{
                callback(err);
            }
        })
    }
}