import express from 'express';
import app_root from 'app-root-path';
import AppServiceProvider from './AppServiceProvider';
import { router } from 'Server/app/routes/dev';

export default class DevAppServiceProvider extends AppServiceProvider {
    setApp() {
        this.app.use(express.static(app_root.path + '/public_html'));
        this.app.use(router);
    }
}
