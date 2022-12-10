import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class DbSetUp1661860035294 implements MigrationInterface {
  name = 'DbSetUp1661860035294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books_book',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'download_count', type: 'integer' },
          { name: 'gutenberg_id', type: 'integer' },
          { name: 'media_type', type: 'integer', isNullable: false },
          { name: 'title', type: 'varchar', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'books_book',
      new TableForeignKey({
        columnNames: ['id'],
        referencedColumnNames: ['book_id'],
        referencedTableName: 'books_author',
        onDelete: 'CASCADE',
      }),
    );

    try {
      await queryRunner.query(`INSERT INTO public.books_book (download_count,gutenberg_id,media_type,title) VALUES
        (50,3,'Text','John F. Kennedy''s Inaugural Address'),
        (284,5,'Text','The United States Constitution'),
        (72,6,'Text','Give Me Liberty or Give Me Death'),
        (25,7,'Text','The Mayflower Compact'),
        (32,8,'Text','Abraham Lincoln''s Second Inaugural Address');
      `);
    }catch(e) {
      console.log(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //empty
  }
}