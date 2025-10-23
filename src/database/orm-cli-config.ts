import { DataSource } from 'typeorm'
import { dataSourceOptions } from './database.module'
import { CreateCourseTable1760973186107 } from 'src/migrations/1760973186107-CreateCourseTable'
import { CreateTagsTable1761135004685 } from 'src/migrations/1761135004685-CreateTagsTable'
import { CreateCoursesTagsTable1761140315058 } from 'src/migrations/1761140315058-CreateCoursesTagsTable'
import { AddCoursesIdToCoursesTagsTable1761141832587 } from 'src/migrations/1761141832587-AddCoursesIdToCoursesTagsTable'
import { AddTagsIdToCoursesTagsTable1761154269034 } from 'src/migrations/1761154269034-AddTagsIdToCoursesTagsTable'



export const dataSource = new DataSource({
    ...dataSourceOptions, 
    synchronize: false, 
    migrations: [CreateCourseTable1760973186107,
        CreateTagsTable1761135004685,
        CreateCoursesTagsTable1761140315058, 
        AddCoursesIdToCoursesTagsTable1761141832587, 
        AddTagsIdToCoursesTagsTable1761154269034],
})