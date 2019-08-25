var Redis = require('ioredis');
var uuid = require('uuid');
var redis = new Redis();

module.exports = {
    User : (passed)=>{
        this.id = uuid();
        this.name = passed.name;
        this.email = passed.email;
        this.password = passed.password;
        this.channels = passed.channels ? passed.channels : [],
        this.messages = passed.messages ? passed.messages : [];
        this.time = Date.now();
        return this;
    },
    
    getAllUsers : (callback=(users))=>{
        redis.get('users', (err,res) =>{
            if(!err){
                let users = JSON.parse(res);
                callback(users);
            }
        })
    },
    
    getUserById : (id, callback=(user, err)) =>{
        redis.get('users', (err, res)=>{
            if(!err){
                let users = JSON.parse(res);
                let user = users.find((item)=>{
                    return item.id === id;
                })
    
                callback(user, null);
            }
            else{
                callback(null, err);
            }
        })
    },
    getChannels: (id, callback = (channels, err)) =>{
        redis.get('users', (err, res)=>{
            if(!err){
                let users = JSON.parse(res);
                let user = users.find((item)=>{
                    return item.id === id;
                });

                let channels = user.channels ? user.channels : [];

                callback(channels, null);
            }
            else{
                callback(null, err);
            }
        })
    },

    setChannel : (id, channel_id, callback=(channel_id, err)) =>{
        redis.get('users', (err, res)=>{
            if(!err){
                let users = JSON.parse(res);
                users = users.map((item)=>{
                    if(item.id === id){
                        let channels = item.channels ? item.channels : [];
                        channels.push(channel_id);
                        item.channels = [...new Set(channels)];
                    }

                    return item;
                })
                
                redis.set('users', JSON.stringify(users));

                callback(channel_id, null);
            }
            else{
                callback(null, err);
            }
        })
    },
    
    getUser : (email, callback=(user, err)) =>{
        redis.get('users', (err, res) =>{
            if(!err){
                let users = JSON.parse(res);
                let user;
                if(users){
                    user = users.find((item)=>{
                        return item.email == email;
                    });
                }
                
                callback(user, null);
            }
            else{
                callback(null, err);
            }
        })
    },
    
    register : (user, callback=(user, err))=>{
        redis.get('users', (err, res)=>{
            if(!err){
                let users = [];
                if(res)users = JSON.parse(res);
                users.push(user);
                redis.set('users', JSON.stringify(users));
                callback(user, null);
    
            }
            else{
                callback(null,err);
            }
        })
    }
}

