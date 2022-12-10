import App from './app';
import { BookController } from "./Modules/books/book.controller";

export default class Server {
  private static app: App;

  public static getApp(): App {
    return this.app;
  }

  public static async close() {
    await this.getApp().getDataSource().destroy().then(async () => {
      await this.app.close()
    });
  }

  public static async init() {
    if (!this.app) {
      this.app = new App(
        (app: App) => {
          return [
            new BookController(app),
          ]
        },
        3000,
      );
    }

    await this.app.init();
    return this.app
  }
}
