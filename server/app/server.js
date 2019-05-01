import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';
import DevAppServiceProvider from 'Provider/DevAppServiceProvider';

const BASE_URI = "eodiro.local";

let app = express();
app.use(cors());

let web_app_provider = new WebAppServiceProvider();
let dev_app_provider = new DevAppServiceProvider();

web_app_provider.setApp();
dev_app_provider.setApp();

app.use(vhost(BASE_URI, web_app_provider.getApp()));
app.use(vhost("dev." + BASE_URI, dev_app_provider.getApp()));
// // // app.use(vhost("api." + BASE_URI, ));
app.listen(8080);