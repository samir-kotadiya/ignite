import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books_author' })
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer'})
    birth_year: number;

    @Column({ type: 'integer' })
    death_year: number;
    
    @Column({ type: 'varchar', length: 128, nullable: false, })
    name: string;
}
