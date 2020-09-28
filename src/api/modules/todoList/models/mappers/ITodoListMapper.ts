import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { TodoListViewModel } from '../viewModels/TodoListViewModel';
import { IMapper } from './IMapper';

export type IMapperTodoList = IMapper<TodoList, TodoListViewModel>;
export const IMapperTodoList = 'IMapperTodoList';
