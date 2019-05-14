import bodyParser from 'body-parser';
import AppServiceProvider from './AppServiceProvider';
import { router } from 'Routes/land'

export default class LandAppServiceProvider extends AppServiceProvider {
  setApp() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(router);
  }
}
