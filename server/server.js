import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import { api_app, web_app, land_app } from './bootstrap';
import { server_config } from './config';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

const BASE_URI = "eodiro.com";

const app = express();

// session & cookie
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized:true
    })
);

app.use(cors());
app.use(vhost("api." + BASE_URI, api_app.getApp()));
app.use("/lander", land_app.getApp());
app.use(web_app.getApp());


app.listen(server_config['node_port']);
