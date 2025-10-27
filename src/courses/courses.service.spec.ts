import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { randomUUID } from 'node:crypto';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit test', () => {
  let service: CoursesService;
  let id: string
  let create_at: Date
  let expectOutPutTags: any
  let expectOutPutCourses: any
  let mockCoursesRepositoy: any
  let mockTagRepository: any

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    create_at = new Date
    expectOutPutTags = [
      {
        id, 
        name: 'Nestjs',
        create_at,
      }
    ]
    
    expectOutPutCourses = {
      id, 
      name: 'test', 
      description: 'test description', 
      create_at, 
      tags: expectOutPutTags
    }

    mockCoursesRepositoy = {
      create : jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses))
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutPutTags)),
      findOne: jest.fn()
    }
  });

  it('should create a course', async() => {
  //@ts-expect-error defined part of methods  
  service['courseRepository'] = mockCoursesRepositoy

  //@ts-expect-error defined part of methods
  service['tageRepository'] = mockTagRepository

  const createCourseDTO: CreateCourseDTO = {
    name: 'test', 
    description: 'test description', 
    tags: ['Nestjs']
  }

  const newCourse = await service.create(createCourseDTO);

  expect(mockCoursesRepositoy.save).toHaveBeenCalled();
  expect(expectOutPutCourses).toStrictEqual(newCourse);
  });


  it('should list all courses', async() => {
  //@ts-expect-error defined part of methods  
  service['courseRepository'] = mockCoursesRepositoy

  //@ts-expect-error defined part of methods
  service['tageRepository'] = mockTagRepository

  const courses = await service.findAll();

  expect(mockCoursesRepositoy.find).toHaveBeenCalled();
  expect(expectOutPutCourses).toStrictEqual(courses);
  });


  it('should gets a course by id', async() => {
  //@ts-expect-error defined part of methods  
  service['courseRepository'] = mockCoursesRepositoy

  //@ts-expect-error defined part of methods
  service['tageRepository'] = mockTagRepository

  const course = await service.findOne(id);

  expect(mockCoursesRepositoy.findOne).toHaveBeenCalled();
  expect(expectOutPutCourses).toStrictEqual(course);
  });


  
  it('should update a course', async() => {
  //@ts-expect-error defined part of methods  
  service['courseRepository'] = mockCoursesRepositoy

  //@ts-expect-error defined part of methods
  service['tageRepository'] = mockTagRepository

  const updateCourseDTO: UpdateCourseDTO = {
    name: 'test', 
    description: 'test description', 
    tags: ['Nestjs']
  }

  const course = await service.update(id, updateCourseDTO);

  expect(mockCoursesRepositoy.save).toHaveBeenCalled();
  expect(mockCoursesRepositoy.preload).toHaveBeenCalled();
  expect(expectOutPutCourses).toStrictEqual(course);
  });

});
