import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { CoursesController } from './courses.controller';
import { AppService } from 'src/app.service';
import { CoursesService } from './courses.service';

@Module({
    controllers:[CoursesController], 
    providers: [CoursesService]
})
export class CoursesModule {}
