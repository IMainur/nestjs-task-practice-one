import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ETaskStatus } from "./tasks.constants";
import { User } from "../auth/user.entity";
import { Exclude } from "class-transformer";

// data mapper [approach] 🔽
@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column()
    status: ETaskStatus;

    @ManyToOne(_type => User, user => user.tasks, { eager:false})
    @Exclude({toPlainOnly:true})
    user: User;
}