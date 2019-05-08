import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import { api_app_provider, web_app_provider } from './bootstrap';
import { server_config } from './config';

const BASE_URI = "eodiro.com";

const app = express();

app.use(cors());
app.use(vhost("api." + BASE_URI, api_app_provider.getApp()));
app.use(web_app_provider.getApp());

app.listen(server_config['node_port']);
