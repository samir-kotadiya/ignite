import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books_language' })
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 4, nullable: false, })
    code: string;
}
