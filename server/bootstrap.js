import DBServiceProvider from 'Provider/DBServiceProvider';
import APIAppServiceProvider from 'Provider/APIAppServiceProvider';
import LandAppServiceProvider from 'Provider/LandAppServiceProvider';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';

const db_provider = new DBServiceProvider();
const api_app = new APIAppServiceProvider();
const land_app = new LandAppServiceProvider();
const web_app = new WebAppServiceProvider();

db_provider.boot();   // asynchronous
api_app.setApp();
land_app.setApp();
web_app.setApp();

export { api_app, land_app, web_app };
