import express from './node_modules/express';

export default class AppServiceProvider {
  constructor() {
    this.app = express();

    if (new.target === AppServiceProvider) {
      throw new TypeError("Cannot construct 'AppServiceProvider' instances directly");
    }
  }

  getApp() {
    return this.app;
  }

  setApp() {
    throw new Error("You have to implement the method 'setApp'");
  }
}
