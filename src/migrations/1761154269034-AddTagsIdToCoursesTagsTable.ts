import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagsIdToCoursesTagsTable1761154269034 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses_tags', new TableColumn({
                   name: 'tagsId',
                   type: 'uuid',
                   isNullable: true,
               }))
         await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
                    name: 'courses_tags_tags', 
                    columnNames: ['tagsId'],
                    referencedTableName: 'tags',
                    referencedColumnNames: ['id'],
                    onDelete: 'SET NULL',
                }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropForeignKey('courses_tags', 'courses_tags_tags')// dropa o nome da tabela e nome da chave estrangeira

        await queryRunner.dropColumn('courses_tags', 'tagsId')//dropa o nome da tabela e nome da coluna 

    }

}
