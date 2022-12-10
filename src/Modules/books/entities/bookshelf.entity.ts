import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books_bookshelf'})
export class Bookshelf {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 64 })
    name: string;
}
