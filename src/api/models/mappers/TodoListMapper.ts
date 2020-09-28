import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { TodoStatus } from '@/domain/aggregates/todoList/TodoStatus';

import { TodoListViewModel } from '../viewModels/TodoListViewModel';
import { TodoViewModel } from '../viewModels/TodoViewModel';
import { IMapper } from './IMapper';

export class TodoListMapper implements IMapper<TodoList, TodoListViewModel> {
  map(model: TodoList): TodoListViewModel {
    return new TodoListViewModel(
        model.todos.map((todo) =>  {
            let status = "None";
    
            switch (todo.status) {
                case TodoStatus.COMPLETE: status = "Completed"; break;
                case TodoStatus.INPROGRESS: status = "In Progress"; break;
                default: throw new Error("[Mapping] Status argument is wrong and unsupported");
            }

            return new TodoViewModel(todo.title, todo.description, status);
        })
    );
  }
}
