import { CreateTaskDto } from './dto/create-task-dto';
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { ETaskStatus } from './tasks.constants';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    private logger = new Logger('TasksRepository',{timestamp:true});

    async getTasks(filterDto:GetTasksFilterDto,user:User):Promise<Task[]> {
        const query = this.createQueryBuilder('task');
        
        const { status, search} = filterDto;
        
        query.where({user});

        if(status){
            query.andWhere('task.status = :status', {status: status})
        }
        if(search){
            query.andWhere(
                '(LOWER(task.title) LIKE  LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search : `%${search}%`}
            )
        }
        
        try{
            const tasks = await query.getMany();
            return tasks
        }catch(error){
            this.logger.error(`Failed to get Tasks for user "${user.username}" . filters: ${JSON.stringify(filterDto)}`,error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDto:CreateTaskDto,user: User):Promise<Task>{
        const { title, description } = createTaskDto
        
        const task = this.create({
            title:title,
            description:description,
            status: ETaskStatus.OPEN,
            user:user,
        })

        await this.save(task);
        return task
    }
}
// @Injectable()