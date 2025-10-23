import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCoursesIdToCoursesTagsTable1761141832587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses_tags_tags', new TableColumn({
            name: 'coursesId',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('courses_tags_tags', new TableForeignKey({
            name: 'courses_tags_courses', 
            columnNames: ['coursesId'],
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('ccourses_tags_tags', 'courses_tags_courses')// dropa o nome da tabela e nome da chave estrangeira

        await queryRunner.dropColumn('courses_tags_tags', 'coursesId')//dropa o nome da tabela e nome da coluna 

    }

}
