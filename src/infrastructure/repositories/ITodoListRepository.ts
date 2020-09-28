import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { IRepository } from '@/domain/seedWork/IRepository';

export type ITodoListRepository = IRepository<TodoList, unknown>;
export const ITodoListRepository = "ITodoListRepository";
