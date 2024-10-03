import { ETaskStatus } from './tasks.constants';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    private logger = new Logger('TasksController')

    constructor(
        private tasksService:TasksService,
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

    @Get('')
    async getTasks(
        @Query() filterDto:GetTasksFilterDto,
        @GetUser() user: User,
    ):Promise<Task[]>{
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto,user);
    }

    @Get('/:id')
    async getTaskById(
        @Param('id') id:string,
        @GetUser() user: User,
    ):Promise<Task>{
        return this.tasksService.getTaskById(id,user)
    }
    
    @Post('')
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ):Promise<Task>{
        this.logger.verbose(`User "${user.username}" creating a net task. Data: ${JSON.stringify(createTaskDto)}`)
        return this.tasksService.createTask(createTaskDto,user)
    }
    
    @Delete('/:id')
    async deleteTask(
        @Param('id') id: string,
        @GetUser() user: User,
    ):Promise<void>{
        await this.tasksService.deleteTaskById(id,user)
    }
    
    
    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id') id:string,
        @Body() updateTaskStatusDto:UpdateTaskStatusDto,
        @GetUser() user: User,
    ):Promise<Task>{
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status,user)
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
