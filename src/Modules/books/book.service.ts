import { Book } from './entities/book.entity';
import { Brackets, In, Repository } from "typeorm";
import App from "../../app";

export class BookService {

  private bookRepository: Repository<Book>;

  constructor(app: App) {
    this.bookRepository = app.getDataSource().getRepository(Book);
  }

  //sample response
  /*
  [
    {
        "id": 1,
        "download_count": null,
        "gutenberg_id": 0,
        "media_type": "Text",
        "title": null,
        "book_author": null,
        "book_subject": null,
        "book_language": null,
        "book_bookshelve": null,
        "downloads": []
    },
    {
        "id": 2,
        "download_count": 638,
        "gutenberg_id": 1,
        "media_type": "Text",
        "title": "The Declaration of Independence of the United States of America",
        "book_author": {
            "author_id": 1,
            "author": {
                "id": 1,
                "birth_year": 1743,
                "death_year": 1826,
                "name": "Jefferson, Thomas"
            }
        },
        "book_subject": {
            "subject_id": 1,
            "subject": {
                "id": 1,
                "name": "United States -- History -- Revolution, 1775-1783 -- Sources"
            }
        },
        "book_language": {
            "language_id": 1,
            "language": {
                "id": 1,
                "code": "en"
            }
        },
        "book_bookshelve": {
            "bookshelf_id": 2,
            "bookshelf": {
                "id": 2,
                "name": "Politics"
            }
        },
        "downloads": [
            {
                "id": 1,
                "mime_type": "text/plain",
                "url": "http://www.gutenberg.org/ebooks/1.txt.utf-8",
                "book_id": 2
            },
            {
                "id": 2,
                "mime_type": "application/prs.tex",
                "url": "http://www.gutenberg.org/6/5/2/6527/6527-t.zip",
                "book_id": 2
            },
            ...
        ]
    },
    {
        "id": 3,
        "download_count": 161,
        "gutenberg_id": 2,
        "media_type": "Text",
        "title": "The United States Bill of Rights: The Ten Original Amendments to the Constitution of the United States",
        "book_author": {
            "author_id": 2,
            "author": {
                "id": 2,
                "birth_year": null,
                "death_year": null,
                "name": "United States"
            }
        },
        "book_subject": {
            "subject_id": 3,
            "subject": {
                "id": 3,
                "name": "Civil rights -- United States -- Sources"
            }
        },
        "book_language": {
            "language_id": 1,
            "language": {
                "id": 1,
                "code": "en"
            }
        },
        "book_bookshelve": {
            "bookshelf_id": 3,
            "bookshelf": {
                "id": 3,
                "name": "American Revolutionary War"
            }
        },
        "downloads": [
            {
                "id": 8,
                "mime_type": "application/epub+zip",
                "url": "http://www.gutenberg.org/ebooks/2.epub.noimages",
                "book_id": 3
            },
            {
                "id": 9,
                "mime_type": "application/zip",
                "url": "http://www.gutenberg.org/files/2/2-h.zip",
                "book_id": 3
            },
            ...
        ]
    },    
    ] */

  /**Function to get book list by filter */
  async getBooks(filter = {} as BookFilter) {
    let q = this.bookRepository
      .createQueryBuilder("books_book")
      .leftJoinAndSelect("books_book.downloads", "downloads")
      .leftJoinAndSelect("books_book.book_author", "book_author")
      .leftJoinAndSelect("book_author.author", "author")
      .leftJoinAndSelect('books_book.book_subject', 'book_subject')
      .leftJoinAndSelect('book_subject.subject', 'subject')
      .leftJoinAndSelect('books_book.book_language', 'book_language')
      .leftJoinAndSelect('book_language.language', 'language')
      .leftJoinAndSelect('books_book.book_bookshelve', 'book_bookshelve')
      .leftJoinAndSelect('book_bookshelve.bookshelf', 'bookshelf')

    if (filter.term) {
      let tp = filter.term.split(',').filter(o => o.trim().length);
      q.andWhere(new Brackets(qb => {
        for (const t of tp) {
          qb.orWhere(`"title" ILike '%${t}%'`)
          qb.orWhere(`"author"."name" ILike '%${filter.term}%'`);
          qb.orWhere(`"subject"."name" ILike '%${t}%'`)
          qb.orWhere(`"bookshelf"."name" ILike '%${t}%'`)
        }
      }))
    }

    if (filter.book_id) {
      q.andWhere({ 'gutenberg_id': In(filter.book_id.split(',').filter(o => o.trim().length)) });
    }
    if (filter.language) {
      q.andWhere(`"language"."code" IN (${filter.language.split(',').filter(o => o.trim().length).map(language => `'${language}'`)})`);
    }
    if (filter.mime_type) {
      q.andWhere(`"downloads"."mime_type" IN (${filter.mime_type.split(',').filter(o => o.trim().length).map(type => `'${type}'`)})`);
    }
    if (filter.author) {
      q.andWhere(`"author"."name" ILike '%${filter.author}%'`);
    }
    if (filter.title) {
      q.andWhere(`title ILike '%${filter.title}%'`);
    }
    if (filter.topic) {
      let tp = filter.topic.split(',').filter(o => o.trim().length);
      q.andWhere(new Brackets(qb => {
        for (const t of tp) {
          qb.orWhere(`"subject"."name" ILike '%${t}%'`)
          qb.orWhere(`"bookshelf"."name" ILike '%${t}%'`)
        }
      }))
    }
    q.skip(filter.start_index ?? 0)
    q.take(25);
    return q.getMany();
  }
}

export interface BookFilter {
  start_index?: number; // for load more call
  term?: string;
  topic?: string;
  book_id?: string;
  language?: string;
  mime_type?: string;
  author?: string;
  title?: string;
}

export type PreparedFilter = Record<string, string[]>;