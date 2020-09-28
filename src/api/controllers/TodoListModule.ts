import { Module } from '@nestjs/common';

import { IMapperTodoList } from '@/api/models/mappers/ITodoListMapper';
import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';
import { TodoListRepository } from '@/infrastructure/repositories/TodoListRepository';

import { TodoListMapper } from '../models/mappers/TodoListMapper';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IMapperTodoList,
      useClass: TodoListMapper,
    },
    {
      provide: ITodoListRepository,
      useClass: TodoListRepository,
    },
  ],
})
export class TodoListModule {}
