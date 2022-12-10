import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({ name: 'books_format' })
export class BooksFormat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length:32, nullable: false,})
    mime_type: number;

    @Column({ type: 'varchar', length: 256, nullable: false, })
    url: number;

    @Column({ type: 'integer', nullable: false, })
    book_id: number;

    @ManyToOne(() => Book, { eager: false, cascade: true })
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
    book!: Book;
}
