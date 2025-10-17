import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { CoursesController } from './courses.controller';
import { AppService } from 'src/app.service';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';

@Module({
            //TypeOrmModule.forFeature([Course])
    imports: [TypeOrmModule.forFeature([Course])],
    controllers:[CoursesController], 
    providers: [CoursesService]
})
export class CoursesModule {}
