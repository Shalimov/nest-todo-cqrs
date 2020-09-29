import { Module } from '@nestjs/common';

import { TodoListModule } from './modules/todoList/TodoListModule';

@Module({
  imports: [TodoListModule],
})
export class AppModule {}
