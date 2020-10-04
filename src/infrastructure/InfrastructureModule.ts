import { Module } from '@nestjs/common';

import { ITodoRepository } from './repositories/types';
import { TodoRepository } from './repositories/impl';
import { TodoContext } from './contexts/TodoContext';
import { PoktaService } from './services/PoktaService';

@Module({
  providers: [
    PoktaService,
    TodoContext,
    {
      provide: ITodoRepository,
      useClass: TodoRepository,
    },
  ],
  exports: [PoktaService, ITodoRepository],
})
export class InfrastructureModule {}
