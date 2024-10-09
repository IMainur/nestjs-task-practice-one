// import { Test } from '@nestjs/testing';
// import { TasksService } from './tasks.service';
// import { TasksRepository } from './tasks.repository';
// import { AuthModule } from '../auth/auth.module';

// const mockTasksRepository = () => ({
//     getTasks: jest.fn(),
// });


// describe('TasksService', () => {
//     let tasksService: TasksService;
//     let tasksRepository: TasksRepository;

//     beforeEach(async () => {
//         const module = await Test.createTestingModule({
//             imports:[
//                 AuthModule,
//             ],
//             providers: [
//                 TasksService,
//                 {
//                     provide: TasksRepository, useFactory: mockTasksRepository
//                 },
//             ],
//         }).compile()

//         tasksService = module.get(TasksService)
//         tasksRepository = module.get(TasksRepository)
//     });


//     describe('getTasks', () => {
//         it('calls TaskRepository.getTasks and return the result ', async() => {
//             expect(tasksRepository.getTasks).not.toHaveBeenCalled();
//         })
//     })
// });

// import { Test } from '@nestjs/testing';
// import { TasksService } from './tasks.service';
// import { TasksRepository } from './tasks.repository';
// import { TasksModule } from './tasks.module';

// const mockTasksRepository = () => ({
//   getTasks: jest.fn(),
// })

// describe('TasksService', () =>{
//     let tasksService:TasksService;
//     let tasksRepository:jest.Mocked<TasksRepository>;

//     beforeEach(async () => {
//       // initialize a nestjs moduole with tasksservice and tasks repository
//       const module = await Test.createTestingModule({
//         imports:[
//           TasksModule
//         ],
//         providers:[
//           TasksService,
//           {
//             provide: TasksRepository, useFactory: mockTasksRepository
//           }
//         ]
//       }).compile()

//       tasksService = module.get(TasksService);
//       tasksRepository= module.get(TasksRepository);
//     })

//     describe('getTasks', () => {
//       it('calls TaskRepository.getTasks  and return the result', ()=> {
//         expect(tasksRepository.getTasks).not.toHaveBeenCalled();
//       })
//     })
// });
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { ETaskStatus } from './tasks.constants';
import { NotFoundException } from '@nestjs/common';
import { TasksModule } from './tasks.module';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TasksModule
      ],
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTasksById', () => {
    it('calls Tasks Repository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'mock Test Title',
        description: 'Mock Desc',
        id: ' someId',
        status: ETaskStatus.OPEN
      }

      await tasksRepository.findOne.mockResolvedValue(mockTask)
      const result = await tasksService.getTaskById('someId', mockUser)
      expect(result).toEqual(mockTask)
    })

    it('calls Tasks Repository.findOne and handles the error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException)
    })
  })
});