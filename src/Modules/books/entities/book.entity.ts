import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookAuthor } from './book-auther.entity';
import { BookBookshelve } from './book-bookshelve.entity';
import { BooksFormat } from './book-format.entity';
import { BookLanguage } from './book-language.entity';
import { BookSubject } from './book-subject.entity';

@Entity({ name: 'books_book'})
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: true,})
    download_count: number;

    @Column({ type: 'integer', nullable: false, })
    gutenberg_id: number;

    @Column({ type: 'varchar', nullable: false, length: 16 })
    media_type: string;

    @Column({ type: 'varchar', nullable: false, length: 1024 })
    title: string;

    @OneToOne(() => BookAuthor)
    @JoinColumn({ name: 'id', referencedColumnName: 'book_id' })
    book_author: BookAuthor

    @OneToOne(() => BookSubject)
    @JoinColumn({ name: 'id', referencedColumnName: 'book_id' })
    book_subject: BookSubject

    @OneToOne(() => BookLanguage)
    @JoinColumn({ name: 'id', referencedColumnName: 'book_id' })
    book_language: BookLanguage

    @OneToOne(() => BookBookshelve)
    @JoinColumn({ name: 'id', referencedColumnName: 'book_id' })
    book_bookshelve: BookBookshelve

    @OneToMany(() => BooksFormat, booksFormat => booksFormat.book,{eager:true})
    downloads?: BooksFormat[];
}
