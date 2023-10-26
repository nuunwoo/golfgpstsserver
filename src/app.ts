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
const timer = require('./module/timer').timer;

const { PORT } = process.env;

const corsOptions = require('./config/cors');
app.use(cors({ ...corsOptions }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/', routes);

const server = http.listen(PORT, () => {
  console.log(`${timer.getCurrentTime()}] http://${server_ip}:${PORT}`);
});

const webSocketServer = new wsModule.Server({
  server: server,
});

const wepSocket = require('./socket').wepSocket;
wepSocket(webSocketServer);
