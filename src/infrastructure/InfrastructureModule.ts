import { Module } from '@nestjs/common';

import { ITodoRepository } from './repositories/types';
import { TodoRepository } from './repositories/impl';
import { TodoContext } from './contexts/TodoContext';

@Module({
  providers: [
    TodoContext,
    {
      provide: ITodoRepository,
      useClass: TodoRepository,
    },
  ],
  exports: [ITodoRepository],
})
export class InfrastructureModule {}
