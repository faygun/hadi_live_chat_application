const express = require("express");
var cors = require('cors');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server,{ origins: '*:*'});

var corsOptions = {
    origin:true,
    credentials : true
}

app.use(cors(corsOptions));

const Channel = require('./models/Channel');
io.on('connection', socket => {
    console.log("socket io connected");
    socket.on('send',(res)=>{
        const {channel_id, message, name, user_id} = res
        
        Channel.send({channel_id, message, name, user_id},(response, err)=>{
            let result = {
                error : err,
                data : response
            }

            io.emit("received", result);
            io.emit("scrollBottom","OK");
        });
    }) 
    // socket.on("disconnect", () => {
    //   console.log("Client disconnected");
    // });
});

app.use(express.json());
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/channel', require('./routes/api/channel'));


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }


server.listen(5000);