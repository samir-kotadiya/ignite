import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './auther.entity';

@Entity({ name: 'books_book_authors' })
export class BookAuthor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: false,})
    book_id: number;

    @Column({ type: 'integer', nullable: false, })
    author_id: number;

    @OneToOne(() => Author)
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
    author: Author
}
