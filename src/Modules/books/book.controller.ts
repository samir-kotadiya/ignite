import Controller from "../../core/controller";
import { BookService } from "./book.service";
import App from "../../app";
import { NextFunction, Request, Response } from "express";

export class BookController extends Controller {
  public path = '/v1';
  private bookService: BookService;

  constructor(app: App) {
    super();
    this.intializeRoutes();
    this.bookService = new BookService(app);
  }

  public intializeRoutes() {
    this.router.get(this.path.concat("/book"), this.getMenuItems.bind(this));
  }

  async getMenuItems(req: Request, res: Response, next: NextFunction) {
    return await this.bookService.getBooks(req.query)
      .then((data) => {
        res.json(data);
      })
      .catch((e: Error) => {
        next(e);
      });
  }
}
