import DBServiceProvider from 'Provider/DBServiceProvider';
import APIAppServiceProvider from 'Provider/APIAppServiceProvider';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';

const db_provider = new DBServiceProvider();
const api_app = new APIAppServiceProvider();
const web_app = new WebAppServiceProvider();

db_provider.boot();   // asynchronous
api_app.setApp();
web_app.setApp();

export { api_app, web_app };
