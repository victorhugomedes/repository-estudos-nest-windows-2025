import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"



@Entity('course')
export class Course{
    
    //Determina que o id será criado automaticamnete pelo banco de dados 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    description: string
    
    @JoinTable()
    @ManyToMany(() => Tag, tag => tag.course, {
        cascade: true,
    })
        
    tags: Tag[] 
}