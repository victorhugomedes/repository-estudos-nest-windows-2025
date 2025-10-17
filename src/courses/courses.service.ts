import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CoursesService {

    constructor(
         @InjectRepository(Course)
         private readonly courseRepository: Repository<Course>,
    ){}
   
    async findAll(){
        return this.courseRepository.find()

    }

    async findOne(id: number){

        //const course = this.courses.find(course => course.id === id);
        const course = await this.courseRepository.findOne({
            where: {id},
        })
       
        return course;
    }


    async create(createCourseDTO: any){
       const course = this.courseRepository.create(createCourseDTO)
        return this.courseRepository.save(course)
    }

    async update(id: number, updateCourseDTO: any){
        //const existiCourse = this.findOne(id);

        const course = await this.courseRepository.preload({
            ...updateCourseDTO, 
            id
        })
        if (!course){
            throw new NotFoundException(`Course Id ${id}, not found`);
        }

        return this.courseRepository.save(course);


        //Maneira antiga
        /*  if(existiCourse as any){
           const index = this.courses.findIndex(course => course.id === id);
            this.courses[index] = {
            id, 
            ...updateCourseDTO,
           };
           return this.courses[index];
        }*/
    }

    async remove(id: number){
        //const index = this.remove.findIndex(Course => Course.id === id)
        const course = await this.courseRepository.findOne({
            where: {id}
        })
         if(!course){
            throw new NotFoundException(`Course Id ${id}, not found`);
        }
        return this.courseRepository.remove(course);
    }
}

