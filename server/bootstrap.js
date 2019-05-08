import DBServiceProvider from 'Provider/DBServiceProvider';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';
import APIAppServiceProvider from 'Provider/APIAppServiceProvider';

const db_service_provider = new DBServiceProvider();
db_service_provider.boot();

const api_app_provider = new APIAppServiceProvider();
api_app_provider.setApp();

const web_app_provider = new WebAppServiceProvider();
web_app_provider.setApp();

export { api_app_provider, web_app_provider };
