import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from './language.entity';

@Entity({ name: 'books_book_languages'})
export class BookLanguage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: false,})
    book_id: number;

    @Column({ type: 'integer', nullable: false, })
    language_id: number;

    @OneToOne(() => Language)
    @JoinColumn({ name: 'language_id', referencedColumnName: 'id' })
    language: Language
}
