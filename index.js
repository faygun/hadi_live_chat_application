const express = require("express");
const app = express();

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


app.listen(5000);