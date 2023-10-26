const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRouter = require('../routes/index');
// const timer = require('./modules/timer').timer();
// const server_ip = require('ip').address();

const modules = {
  express: express,
  app: app,
  http: http,
  cors: cors,
  cookieParser: cookieParser,
  indexRouter: indexRouter,
  // timer: timer,
  // server_ip: server_ip,
};
module.exports = modules;
export default {};
