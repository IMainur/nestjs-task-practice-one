import { CreateTaskDto } from './dto/create-task-dto';
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { Injectable } from "@nestjs/common";
import { ETaskStatus } from './tasks.constants';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
        const { title, description } = createTaskDto
        
        const task = this.create({
            title:title,
            description:description,
            status: ETaskStatus.OPEN,
        })

        await this.save(task);
        return task
    }
}
// @Injectable()