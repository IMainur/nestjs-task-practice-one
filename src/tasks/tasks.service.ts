import { ETaskStatus } from './tasks.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository) 
        private tasksRepository: TasksRepository,


    ){}

    async getTaskById(id:string):Promise<Task>{
        const found = await this.tasksRepository.findOne(id);
        
        if(!found){
            throw new NotFoundException(`TAsk with Id "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
        return await this.tasksRepository.createTask(createTaskDto)
    }

    // private tasks:ITask[] = [
    //     {
    //         "id": "ba40acbe-735f-447e-a01b-0e42078edf78",
    //         "title": "Read Chemistry",
    //         "description": "Lots of topic has to be cover.",
    //         "status": ETaskStatus.OPEN
    //     },
    //     {
    //         "id": "aeec270a-56a5-415b-aabb-135529639673",
    //         "title": "Clean my room",
    //         "description": "Lots of cleaning has to be done.",
    //         "status": ETaskStatus.OPEN
    //     },
    //     {
    //         "id": "1c69b875-a8a1-45ec-8c9e-e258b73538ed",
    //         "title": "Read Chemistry",
    //         "description": "Lots of topic has to be cover.",
    //         "status": ETaskStatus.OPEN
    //     }
    // ];

    // getAllTasks():ITask[]{
    //     console.log(this.tasks)
    //     return this.tasks;
    // }
    // getAllTasks():ITask[]{
    //     console.log(this.tasks)
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[]{
    //     const { status, search } =filterDto;
        
    //     // define a temporary array to hold the result
    //     let tasks = this.getAllTasks();

    //     // do something with status
    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status)
    //     }
        
    //     // do something with search
    //     if(search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())){
    //                 return true
    //             }
    //             return false
    //         })
    //     }

    //     // return final result
    //     return tasks
    // }

    // getTaskById(id:string):ITask{

    //     // try to get task

    //     //  if not found, throw an error


    //     //  otherwise return the task
    //     const found =  this.tasks.find((task) => task.id === id);

    //     if(!found){
    //         throw new NotFoundException(`task with Id "${id}" not found`)
    //     }
    //     return found;
    // }

    // createTask(creteTaskDto:CreateTaskDto):ITask{
    //     const { title, description } =creteTaskDto
    //     const task:ITask = {
    //         id:uuid(),
    //         title,
    //         description,
    //         status : ETaskStatus.OPEN,
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTaskById(id:string):void{
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== id)
    // }

    // updateTaskStatus(id:string,status:ETaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
