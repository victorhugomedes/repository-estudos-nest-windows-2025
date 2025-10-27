import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';


@Injectable()
export class CoursesService {

   
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>

    @InjectRepository(Tag)
    private readonly tageRepository: Repository<Tag>
    
   
    async findAll(){
        return this.courseRepository.find({
            relations: ['tags'], 
        })

    }

    async findOne(id: string){

        //const course = this.courses.find(course => course.id === id); modo antigo
        
        const course = await this.courseRepository.findOne({
            where: {id},
            relations: ['tags'],
        })
       
        return course;
    }


    async create(createCourseDTO: CreateCourseDTO){
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagName(name)), 
        )
       const course = this.courseRepository.create({
        ...createCourseDTO,
        tags,
       })
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDTO: UpdateCourseDTO){
        //const existiCourse = this.findOne(id);
        const tags = updateCourseDTO.tags && 
        (await Promise.all(
            updateCourseDTO.tags.map(name => this.preloadTagName(name)), 
        ))
        const course = await this.courseRepository.preload({
            ...updateCourseDTO, 
            id, 
            tags,
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

    async remove(id: string){
        //const index = this.remove.findIndex(Course => Course.id === id)
        const course = await this.courseRepository.findOne({
            where: {id}
        })
         if(!course){
            throw new NotFoundException(`Course Id ${id}, not found`);
        }
        return this.courseRepository.remove(course);
    }

    private async preloadTagName(name: string):Promise<Tag> {
        const tag = await this.tageRepository.findOne({where: {name}});
        if(tag){
            return tag;
        }
        return this.tageRepository.create({name});
    }
}

