import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books_subject'})
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256, nullable: false, })
    name: string;
}
