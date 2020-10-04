import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateTodoCommand,
  SetStatusTodoCommand,
} from '@/application/commands/defs';
import {
  AllTodosQuery,
  FilterByStatusTodosQuery,
  AllPoktaMessagesQuery,
} from '@/application/queries/defs';
import { Todo } from '@/domain/aggregates/todo/Todo';

import { IMapperTodo } from '../models/mappers/types';

@Controller('v1/todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(IMapperTodo) private readonly mapper: IMapperTodo,
  ) {}

  @Get('/debug/pokta')
  async queryPoktaMessages() {
    const poktaMessages = await this.queryBus.execute<
      AllPoktaMessagesQuery,
      { id: number; msg: string }[]
    >(new AllPoktaMessagesQuery());

    return poktaMessages;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() todo: CreateTodoCommand) {
    await this.commandBus.execute(
      new CreateTodoCommand(todo.title, todo.description),
    );
  }

  @Patch('/:todoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateTodo(
    @Param('todoId') todoId: string,
    @Body() todo: Omit<SetStatusTodoCommand, 'todoId'>,
  ) {
    await this.commandBus.execute(
      new SetStatusTodoCommand(Number(todoId), todo.status),
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
  async queryTodosByStatus(
    @Param('status') status: 'completed' | 'inprogress',
  ) {
    const todos = await this.queryBus.execute<FilterByStatusTodosQuery, Todo[]>(
      new FilterByStatusTodosQuery(status),
    );

    return this.mapper.mapArray(todos);
  }
}
