import { ETaskStatus } from './tasks.constants';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {

    constructor(
        private tasksService:TasksService
    ){}
    
    // @Get('')
    // getAllTasks():ITask[]{
    //     return this.tasksService.getAllTasks();
    // }
    
    // @Get('')
    // getTasks(
    //     @Query() filterDto:GetTasksFilterDto
    // ):ITask[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto)
    //     }
    //     else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    async getTaskById(@Param('id') id:string):Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

     @Post('')
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ):Promise<Task>{
        return this.tasksService.createTask(createTaskDto)
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id:string):ITask{
    //     return this.tasksService.getTaskById(id)
    // }

    // // @Post('')
    // // createTask(
    // //     @Body('title') title,
    // //     @Body('description') description,
    // // ):ITask{
    // //     // console.log('body', body);
    // //     // console.log('title :>> ', title);
    // //     // console.log('description :>> ', description);
    // //     return this.tasksService.createTask(title,description)
    // // }
    // @Post('')
    // createTask(
    //     @Body() createTaskDto: CreateTaskDto
    // ):ITask{
    //     // console.log('body', body);
    //     // console.log('title :>> ', title);
    //     // console.log('description :>> ', description);
    //     // return this.tasksService.createTask(title,description)
    //     return this.tasksService.createTask(createTaskDto)
    // }

    // @Delete('/:id')
    // deleteTask(
    //     @Param('id') id: string,
    // ):void{
    //     this.tasksService.deleteTaskById(id)
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id:string,
    //     @Body() updateTaskStatusDto:UpdateTaskStatusDto,
    // ):ITask{
    //     const {status} = updateTaskStatusDto;
    //     return this.tasksService.updateTaskStatus(id,status)
    // }
}
// export class TasksController {
    
//     tasksService:TasksService;

//     constructor(tasksService:TasksService){
//         this.tasksService = tasksService
//     }

//     helloWorld(){
//         this.tasksService.doSomeThing()
//     }
// }
