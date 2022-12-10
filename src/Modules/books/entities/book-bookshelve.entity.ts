import { Bookshelf } from './bookshelf.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books_book_bookshelves'})
export class BookBookshelve {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: false,})
    book_id: number;

    @Column({ type: 'integer', nullable: false, })
    bookshelf_id: number;

    @OneToOne(() => Bookshelf)
    @JoinColumn({ name: 'bookshelf_id', referencedColumnName: 'id' })
    bookshelf: Bookshelf
}
