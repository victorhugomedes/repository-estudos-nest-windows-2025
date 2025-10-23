import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"
import { randomUUID } from "node:crypto"
import { timestamp } from "rxjs"



@Entity('courses')
export class Course{
    
    //Determina que o id será criado automaticamnete pelo banco de dados 
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string
    
    @Column()
    description: string
    
   @ManyToMany(() => Tag, tag => tag.courses, { cascade: true })
    @JoinTable({
    name: 'courses_tags_tags', //  precisa bater com a migration
    joinColumn: { name: 'coursesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagsId', referencedColumnName: 'id' },
    })
    tags: Tag[];
        
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