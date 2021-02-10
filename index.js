const express = require('express')
const mongoose = require('mongoose')
const app = express()
var dotenv = require('dotenv');
dotenv.config();


// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(err){
    console.log('DB ERROR : ', err);
});


const port = 3000
app.get('/', (req, res) => res.send('Hello World!~~안녕하세요 ~ '))

app.listen(port, () => console.log(`server on! http://localhost:${port}`)) 