import { Module } from '@nestjs/common';

import { ITodoRepository } from './repositories/types';
import { TodoRepository } from './repositories/impl';

@Module({
  providers: [{
    provide: ITodoRepository,
    useClass: TodoRepository,
  }],
  exports: [ITodoRepository],
})
export class InfrastructureModule {}
