import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"



@Entity('course')
export class Course{
    
    //Determina que o id será criado automaticamnete pelo banco de dados 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    description: string
    
    @Column('json', {nullable: true})
    tags: string[] 
}