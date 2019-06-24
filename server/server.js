import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import { api_app, web_app } from './bootstrap';
import { server_private } from 'Configs/private';

const BASE_URI = "eodiro.com";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

app.use(vhost("api." + BASE_URI, api_app.getApp()));
app.use(web_app.getApp());

app.listen(server_private['node_port']);
