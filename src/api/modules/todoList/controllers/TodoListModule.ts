import { Module } from '@nestjs/common';

import { IMapperTodoList } from '@/api/modules/todoList/models/mappers/ITodoListMapper';
import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';
import { TodoListRepository } from '@/infrastructure/repositories/impl/TodoListRepository';

import { TodoListMapper } from '../models/mappers/impl/TodoListMapper';
import { TodoListController } from './TodoListController';

@Module({
  imports: [],
  controllers: [TodoListController],
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
