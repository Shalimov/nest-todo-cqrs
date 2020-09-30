import { Module } from '@nestjs/common';

import { TodoModule } from './modules/todo/TodoModule';

@Module({
  imports: [TodoModule],
})
export class AppModule {}
