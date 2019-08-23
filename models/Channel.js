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
}