import DBServiceProvider from 'Provider/DBServiceProvider';
import APIAppServiceProvider from 'Provider/APIAppServiceProvider';
import LandAppServiceProvider from 'Provider/LandAppServiceProvider';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';

const db_provider = new DBServiceProvider();
const api_app = new APIAppServiceProvider();
const land_app = new LandAppServiceProvider();
const web_app = new WebAppServiceProvider();

export default new Promise(async (resolve, reject) => {
  await db_provider.boot();
  api_app.setApp();
  land_app.setApp();
  web_app.setApp();

  const services = {
    db: db_provider,
    api_app: api_app,
    land_app: land_app,
    web_app: web_app
  }

  resolve(services);
});
