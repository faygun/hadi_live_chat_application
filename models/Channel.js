var Redis = require('ioredis');
var uuid = require('uuid');
var redis = new Redis();
var pub = new Redis();

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
    send:(params, callback)=>{
        redis.get('channels',(err, res)=>{
            if(err){
                callback(err)
            }else{
                let channels = JSON.parse(res);
                channels = channels.map((item) =>{
                    if(item.id === params.channel_id){
                        item = item;
                        let users = item.users;
                        let messages = item.messages;

                        users.push(params.user_id);
                        users = [...new Set(users)];

                        messages.push({
                            message_id : uuid(),
                            message:params.message,
                            time:Date.now(),
                            user_id : params.user_id,
                            user_name:params.name
                        });
                        
                        item.users = users;
                        item.messages = messages;
                        
                    }
                    return item;
                });
                redis.set('channels', JSON.stringify(channels));
                callback({response:"OK"});
            }
        })
    },
    getMessages: (channel_id, user_id, callback) =>{
        redis.get('channels', (err, res) =>{
            if(!err){
                let result = [];
                let channels = JSON.parse(res);
                let channel = channels.find((item)=>{
                    return item.id === channel_id;
                });

                if(channel){
                    let hasSubscribe = channel.users.indexOf(user_id) > - 1;
                    if(channel.users && hasSubscribe){
                        result = channel.messages.sort((a,b)=> {return a.time > b.time});
                    }
                }
                callback(result);
            }else{
                callback(err);
            }
        })
    }
}