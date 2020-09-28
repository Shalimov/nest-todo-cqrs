import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TodoListModule } from './modules/todoList/controllers/TodoListModule';

@Module({
  imports: [CqrsModule, TodoListModule],
})
export class AppModule {}
