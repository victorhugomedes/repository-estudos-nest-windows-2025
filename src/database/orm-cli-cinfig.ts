import { DataSource } from 'typeorm'
import { dataSourceOptions } from './database.module'
import { CreateCourseTable1760973186107 } from 'src/migrations/1760973186107-CreateCourseTable'



export const dataSource = new DataSource({
    ...dataSourceOptions, 
    synchronize: false, 
    migrations: [CreateCourseTable1760973186107]
})