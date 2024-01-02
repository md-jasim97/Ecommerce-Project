// ============== applications configures ==============
const express = require('express');
const router = require('./src/Routes/api');
const app = new express;
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const monogoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');


app.use (bodyParser.urlencoded({ extended: true }));
app.use (cookieParser());



app.use (cors());
app.use (hpp());
app.use (helmet());
app.use (monogoSanitize());
app.use (rateLimit());
app.use (express.json());
app.use (express.urlencoded({ extended: true }));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use (limiter);


//connection database
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const database = process.env.DATABASE;


mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connected Successfully");
}).catch((err)=>{
    console.log("database not connected"+err.toString());
})


app.use('/api/v2', router)

app.get("*", (req, res)=>{
    res.send("404 page not found");
})




app.use(express.static('client/dist'));
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
})

module.exports = app