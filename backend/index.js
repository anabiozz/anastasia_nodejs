import express from 'express';
import ServerRenderingMiddleware from './middleware/serverSideRendering'
import config from '../config';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import db from 'mongoose';
import { mainData } from './controllers'

let app = new express()
const host =  config.server.develop;
const port = config.server.port;

app.use(morgan("short"));

app.use(express.static(path.resolve(__dirname, "../frontend")));

app.set("views", path.resolve(__dirname, "../frontend/views"));
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  mainData.findAbout(function (data) {
    res.render('index', { about: data })
  });
})

app.get('/api/findAbout', mainData.findAbout);
app.get('/api/saveAbout', mainData.saveAbout);

app.get("/gallery/:picture", function (req, res) {
  res.sendFile();
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.send("Internal server error");
});

app.use(function (req, res) {
  res.status(404);
  res.send('File not found');
});

db.Promise = global.Promise;
db.connect('mongodb://' + config.database.host + '/' + config.database.db);

app.listen(port, host, function(error) {
    if (error) {
      console.error("APP ERROR:")
      console.error(error)
    } else {
        console.info("==> 🌎  Web APP listening on port %s. Open up http://%s:%s/ in your browser.", port, host, port)
    }
});
