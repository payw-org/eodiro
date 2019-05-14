import express from './node_modules/express';
import app_root from './node_modules/app-root-path';
import AppServiceProvider from './AppServiceProvider';
import { router } from './node_modules/Routes/web';

export default class WebAppServiceProvider extends AppServiceProvider {
  setApp() {
    this.app.use(express.static(app_root.path + '/public_html'));
    this.app.use(router);
  }
}
