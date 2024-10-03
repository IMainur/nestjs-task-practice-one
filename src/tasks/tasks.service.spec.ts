import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from 'src/auth/users.repository';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
});

const mockUsersRepository = () => ({})

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository: TasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports:[
                AuthModule,
            ],
            providers: [
                TasksService,
                {
                    provide: TasksRepository, useFactory: mockTasksRepository,
                },
                {
                    provide: UsersRepository, useFactory: mockUsersRepository
                },
            ],
        }).compile()

        tasksService = module.get(TasksService)
        tasksRepository = module.get(TasksRepository)
    });


    describe('getTasks', () => {
        it('calls TaskRepository.getTasks and return the result ', () => {
            expect(tasksRepository.getTasks).not.toHaveBeenCalled();
        })
    })
});