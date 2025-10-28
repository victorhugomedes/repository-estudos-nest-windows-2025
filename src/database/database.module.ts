import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tag.entity';
import { DataSourceOptions } from 'typeorm';


export const dataSourceOptions: DataSourceOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'devtraining',
    entities: [Course, Tag],
    synchronize: false,
}
@Module({

   imports: [

    TypeOrmModule.forRootAsync({

      useFactory: async (configService: ConfigService) => {
        return {

          ...dataSourceOptions,
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          entities: [Course, Tag],
          synchronize: false,

        }
      },
      inject: [ConfigService]
    }),
  ],
})
export class DatabaseModule {}
