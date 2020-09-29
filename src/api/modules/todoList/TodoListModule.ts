import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { IMapperTodoList } from '@/api/modules/todoList/models/mappers/ITodoListMapper';
import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';
import { TodoListRepository } from '@/infrastructure/repositories/impl/TodoListRepository';

import {
  AllTodosQueryHandler,
  CompletedTodosQueryHandler,
  InProgressTodosQueryHandler,
} from '@/application/queries/handlers';
import { CreateTodoCommandHandler } from '@/application/commands/handlers';
import { TodoCreatedEventHandler } from '@/application/events/handlers';

import { TodoListMapper } from './models/mappers/impl/TodoListMapper';
import { TodoListController } from './controllers/TodoListController';

@Module({
  imports: [CqrsModule],
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
    // Events
    TodoCreatedEventHandler,
    // Queries
    AllTodosQueryHandler,
    CompletedTodosQueryHandler,
    InProgressTodosQueryHandler,
    // Commands
    CreateTodoCommandHandler,
  ],
})
export class TodoListModule {}
