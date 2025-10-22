import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"
import { randomUUID } from "node:crypto"
import { timestamp } from "rxjs"



@Entity('course')
export class Course{
    
    //Determina que o id será criado automaticamnete pelo banco de dados 
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string
    
    @Column()
    description: string
    
    @JoinTable()
    @ManyToMany(() => Tag, tag => tag.course, {
        cascade: true,
    })
        
    tags: Tag[] 

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date

    @BeforeInsert()
    generateId(){
        if(this.id){
            return
        }
        this.id = randomUUID();
    }
}