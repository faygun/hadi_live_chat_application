var uuid = require('uuid');
var Redis = require('ioredis');
var redis = new Redis();

redis.del("users");

redis.del("channels");

let channels = [{id:uuid(),name:"General",users:[],messages:[],time:Date.now()},{id:uuid(),name:"Zurna",users:[],messages:[],time:Date.now()},{id:uuid(),name:"Goygoy",users:[],messages:[],time:Date.now()},{id:uuid(),name:"Resmi",users:[],messages:[],time:Date.now()}]

redis.set("channels", JSON.stringify(channels));

redis.get("users",(err, res)=>{
    console.log(JSON.parse(res));
})

redis.get("channels",(err, res)=>{
    console.log(JSON.parse(res));

    console.log("You are ready");
})

