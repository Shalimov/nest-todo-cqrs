import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateTodoCommand } from '@/application/commands/defs';
import {
  AllTodosQuery,
  FilterByStatusTodosQuery,
} from '@/application/queries/defs';
import { Todo } from '@/domain/aggregates/todo/Todo';

import { IMapperTodo } from '../models/mappers/ITodoMapper';

@Controller('v1/todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(IMapperTodo) private readonly mapper: IMapperTodo,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() todo: CreateTodoCommand) {
    await this.commandBus.execute(
      new CreateTodoCommand(todo.title, todo.description),
    );
  }

  @Get()
  async queryAllTodos() {
    const todos = await this.queryBus.execute<AllTodosQuery, Todo[]>(
      new AllTodosQuery(),
    );

    return this.mapper.mapArray(todos);
  }

  @Get('/:status')
  async queryTodosByStatus(@Param('status') status: 'completed' | 'inprogress') {
    const todos = await this.queryBus.execute<FilterByStatusTodosQuery, Todo[]>(
      new FilterByStatusTodosQuery(status),
    );

    return this.mapper.mapArray(todos);
  }
}
