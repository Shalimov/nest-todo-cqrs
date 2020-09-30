import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoViewModel } from '../viewModels/TodoViewModel';
import { IMapper } from './IMapper';

export type IMapperTodo = IMapper<Todo, TodoViewModel>;
export const IMapperTodo = 'IMapperTodo';
