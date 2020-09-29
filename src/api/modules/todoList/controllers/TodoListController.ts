import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateTodoCommand } from '@/application/commands/defs';
import {
  AllTodosQuery,
  CompletedTodosQuery,
  InProgressTodosQuery,
} from '@/application/queries/defs';
import { TodoList } from '@/domain/aggregates/todoList/TodoList';

import { IMapperTodoList } from '../models/mappers/ITodoListMapper';

@Controller('v1/todos')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(IMapperTodoList) private readonly mapper: IMapperTodoList,
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
    const todoList = await this.queryBus.execute<AllTodosQuery, TodoList>(
      new AllTodosQuery(),
    );

    return this.mapper.map(todoList);
  }

  @Get('/completed')
  async queryCompletedTodos() {
    const todoList = await this.queryBus.execute<CompletedTodosQuery, TodoList>(
      new CompletedTodosQuery(),
    );

    return this.mapper.map(todoList);
  }

  @Get('/inprogress')
  async queryInProgressTodos() {
    const todoList = await this.queryBus.execute<
      InProgressTodosQuery,
      TodoList
    >(new InProgressTodosQuery());

    return this.mapper.map(todoList);
  }
}
