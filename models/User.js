var Redis = require('ioredis');
var uuid = require('uuid');
var redis = new Redis();

module.exports = {
    User : (passed)=>{
        this.id = uuid();
        this.name = passed.name;
        this.email = passed.email;
        this.password = passed.password;
        this.messages = passed.messages ? passed.messages : [];
        this.time = Date.now();
        return this;
    },
    
    getAllUsers : (callback)=>{
        redis.get('users', (err,res) =>{
            if(!err){
                let users = JSON.parse(res);
                callback(users);
            }
        })
    },
    
    getUserById : (id, callback) =>{
        redis.get('users', (err, res)=>{
            if(!err){
                let users = JSON.parse(res);
                let user = users.find((item)=>{
                    return item.id === id;
                })
    
                callback(user);
            }
            else{
                callback(err);
            }
        })
    },
    
    getUser : (email, callback) =>{
        redis.get('users', (err, res) =>{
            if(!err){
                let users = JSON.parse(res);
                let user;
                if(users){
                    user = users.find((item)=>{
                        console.log(item.email, email, typeof(item.email), typeof(email))
                        return item.email == email;
                    });
                    console.log(user);
                }
                
                callback(user);
            }
            else{
                callback(err);
            }
        })
    },
    
    register : (user, callback)=>{
        redis.get('users', (err, res)=>{
            if(!err){
                let users = [];
                if(res)users = JSON.parse(res);
                users.push(user);
                redis.set('users', JSON.stringify(users));
                callback(user);
    
            }
            else{
                callback(err);
            }
        })
    }
}

