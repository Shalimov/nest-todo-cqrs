import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import // CreateTodoCommand,
// SetStatusTodoCommand,
'@/application/commands';
import {
  AllTodosQuery,
  CompletedTodosQuery,
  InProgressTodosQuery,
} from '@/application/queries';
import { TodoList } from '@/domain/aggregates/todoList/TodoList';

import { IMapperTodoList } from '../models/mappers/ITodoListMapper';
import { TodoListViewModel } from '../models/viewModels/TodoListViewModel';

@Controller('v1/todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(IMapperTodoList) private readonly mapper: IMapperTodoList,
  ) {}

  @Post()
  async createTodo() {
    // this.commandBus.execute(new CreateTodoCommand())
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
    >(new CompletedTodosQuery());

    return this.mapper.map(todoList);
  }
}
