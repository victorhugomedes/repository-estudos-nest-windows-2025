import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService){}
    @Get()
    findAll(){
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){

        const cusoExiste = await this.coursesService.findOne(+id);

        if(!cusoExiste){
                    throw new NotFoundException(`Course Id ${id}, not found`);
        }
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() body){
        return this.coursesService.create(body); 

    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body){

        const cusoExiste = await this.coursesService.findOne(+id);

        if(!cusoExiste){
                    throw new NotFoundException(`Course Id ${id}, not found`);
        }
        return this.coursesService.update(id, body);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: number){

        const cusoExiste = this.coursesService.findOne(+id);

        if(!cusoExiste){
                    throw new NotFoundException(`Course Id ${id}, not found`);
        }
        return this.coursesService.remove(id);

    }

}
