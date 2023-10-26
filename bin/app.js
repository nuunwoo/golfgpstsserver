"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const server_ip = require('ip').address();
const session = require('express-session');
const wsModule = require('ws');
const routes = require('./routes');
const timer = require('./module/timer').timer();
const { PORT } = process.env;
const corsOptions = require('./config/cors');
app.use(cors(Object.assign({}, corsOptions)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
const server = http.listen(PORT, () => {
    console.log(`${timer}] http://${server_ip}:${PORT}`);
});
const wepSocket = require('./socket').wepSocket;
const webSocketServer = new wsModule.Server({
    server: server,
});
wepSocket(webSocketServer);
app.post('/', (req, res) => {
    const option = { expires: new Date(Date.now() + 900000), httpOnly: true };
    let count;
    console.log(req.cookies.count);
    if (req.cookies.count) {
        count = parseInt(req.cookies.count, 10) + 1;
    }
    else {
        count = 0;
    }
    res.cookie('count', count, option);
    res.send(`${timer} : ${count}`);
});
