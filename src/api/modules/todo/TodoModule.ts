import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ITodoRepository } from '@/infrastructure/repositories/types/ITodoRepository';
import { TodoRepository } from '@/infrastructure/repositories/impl/TodoRepository';

import {
  AllTodosQueryHandler,
  FilterByStatusTodosQueryHandler,
} from '@/application/queries/handlers';
import { CreateTodoCommandHandler } from '@/application/commands/handlers';
import { TodoCreatedEventHandler } from '@/application/events/handlers';

import { IMapperTodo } from './models/mappers/types';
import { TodoMapper } from './models/mappers/impl';
import { TodoController } from './controllers/TodoController';

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [
    {
      provide: IMapperTodo,
      useClass: TodoMapper,
    },
    {
      provide: ITodoRepository,
      useClass: TodoRepository,
    },
    // Events
    TodoCreatedEventHandler,
    // Queries
    AllTodosQueryHandler,
    FilterByStatusTodosQueryHandler,
    // Commands
    CreateTodoCommandHandler,
  ],
})
export class TodoModule {}
