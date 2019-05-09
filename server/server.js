import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import { api_app, web_app } from './bootstrap';
import { server_config } from './config';

const BASE_URI = "eodiro.com";

const app = express();

app.use(cors());
app.use(vhost("api." + BASE_URI, api_app.getApp()));
app.use(web_app.getApp());

app.listen(server_config['node_port']);

require("./app/crawler/executing-phantom.js");
