import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity({ name: 'books_book_subjects' })
export class BookSubject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: false,})
    book_id: number;

    @Column({ type: 'integer', nullable: false, })
    subject_id: number;

    @OneToOne(() => Subject)
    @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
    subject: Subject
}
