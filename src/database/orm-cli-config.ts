import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { CreateCourseTable1760973186107 } from 'src/migrations/1760973186107-CreateCourseTable'
import { CreateTagsTable1761135004685 } from 'src/migrations/1761135004685-CreateTagsTable'
import { CreateCoursesTagsTable1761140315058 } from 'src/migrations/1761140315058-CreateCoursesTagsTable'
import { AddCoursesIdToCoursesTagsTable1761141832587 } from 'src/migrations/1761141832587-AddCoursesIdToCoursesTagsTable'
import { AddTagsIdToCoursesTagsTable1761154269034 } from 'src/migrations/1761154269034-AddTagsIdToCoursesTagsTable'
import { Course } from 'src/courses/entities/courses.entity'
import { Tag } from 'src/courses/entities/tag.entity'

export const dataSourceOptions: DataSourceOptions = {

    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: false,
}

export const dataSource = new DataSource({
    ...dataSourceOptions, 
    synchronize: false, 
    migrations: [CreateCourseTable1760973186107,
        CreateTagsTable1761135004685,
        CreateCoursesTagsTable1761140315058, 
        AddCoursesIdToCoursesTagsTable1761141832587, 
        AddTagsIdToCoursesTagsTable1761154269034],
})