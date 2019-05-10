import DBServiceProvider from 'Provider/DBServiceProvider';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';
import APIAppServiceProvider from 'Provider/APIAppServiceProvider';

const db_provider = new DBServiceProvider();
const api_app = new APIAppServiceProvider();
const web_app = new WebAppServiceProvider();

export default new Promise(async (resolve, reject) => {
  await db_provider.boot();
  api_app.setApp();
  web_app.setApp();

  const services = {
    db: db_provider,
    api_app: api_app,
    web_app: web_app
  }

  resolve(services);
});
