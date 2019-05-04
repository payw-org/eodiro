import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import WebAppServiceProvider from 'Providers/WebAppServiceProvider';
import APIAppServiceProvider from 'Providers/APIAppServiceProvider';
import { server_config } from 'Server/config';

const BASE_URI = "eodiro.local";

let app = express();
app.use(cors());

let web_app_provider = new WebAppServiceProvider();
let api_app_provider = new APIAppServiceProvider();

web_app_provider.setApp();
api_app_provider.setApp();

app.use(web_app_provider.getApp());
app.use(vhost("api." + BASE_URI, api_app_provider.getApp()));

app.listen(server_config['node_port']);
