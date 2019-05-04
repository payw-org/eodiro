import AppServiceProvider from './AppServiceProvider';
import { router } from 'Server/app/routes/api'

export default class APIAppServiceProvider extends AppServiceProvider {
    setApp() {
        this.app.use(router);
    }
}
