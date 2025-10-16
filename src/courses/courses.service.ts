import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [{
        id: 1, 
        name: 'NestJS', 
        description: 'Curso do framework NestJS', 
        tags: ['node.js', 'nestjs', 'javascript', 'typescript']
    }];

     findAll(){
        return this.courses;

    }

    findOne(id: number){
        const course = this.courses.find(course => course.id === id);
        if(!course){
            throw new NotFoundException(`Course Id ${id}, not found`);
        }
        return course;
    }


    create(createCourseDTO: any){
        this.courses.push(createCourseDTO);
        return createCourseDTO;
    }

    update(id: number, updateCourseDTO: any){
        const existiCourse = this.findOne(id);
        if(existiCourse as any){
           const index = this.courses.findIndex(course => course.id === id);
            this.courses[index] = {
            id, 
            ...updateCourseDTO,
           };
           return this.courses[index];
        }
    }

    remove(id: number){
        //const index = this.remove.findIndex(Course => Course.id === id)
        const index = this.courses.findIndex(course => course.id === id);
        if(index >= 0){
            this.courses.splice(index, 1);
        }
    }
}

