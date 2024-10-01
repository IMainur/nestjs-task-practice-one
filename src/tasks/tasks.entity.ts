import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ETaskStatus } from "./tasks.constants";

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
}