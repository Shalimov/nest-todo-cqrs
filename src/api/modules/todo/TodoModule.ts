import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApplicationModule } from '@/application/ApplicationModule';

import { IMapperTodo } from './models/mappers/types';
import { TodoMapper } from './models/mappers/impl';
import { TodoController } from './controllers/TodoController';

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [TodoController],
  providers: [
    {
      provide: IMapperTodo,
      useClass: TodoMapper,
    },
  ],
})
export class TodoModule {}
