import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import WebAppServiceProvider from 'Providers/WebAppServiceProvider';
import DevAppServiceProvider from 'Providers/DevAppServiceProvider';
import APIAppServiceProvider from 'Providers/APIAppServiceProvider';

const BASE_URI = "eodiro.local";

let app = express();
app.use(cors());

let web_app_provider = new WebAppServiceProvider();
let dev_app_provider = new DevAppServiceProvider();
let api_app_provider = new APIAppServiceProvider();

web_app_provider.setApp();
dev_app_provider.setApp();
api_app_provider.setApp();

app.use(vhost(BASE_URI, web_app_provider.getApp()));
app.use(vhost("dev." + BASE_URI, dev_app_provider.getApp()));
app.use(vhost("api." + BASE_URI, api_app_provider.getApp()));

app.listen(80);
