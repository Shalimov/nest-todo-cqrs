import { TodoViewModel } from './TodoViewModel';

export class TodoListViewModel {
  constructor(public readonly todos: TodoViewModel[]) {}
}
