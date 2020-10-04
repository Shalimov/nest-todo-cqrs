import { Injectable } from '@nestjs/common';

import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoContext } from '@/infrastructure/contexts/TodoContext';

import { ITodoRepository } from '../types/';
// Use Spec interface here
import { TodoFilterSpec, DeleteSpec } from '../specifications/';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(private readonly todoContext: TodoContext) {}

  get unitOfWork() {
    return this.todoContext;
  }

  insert(todo: Todo): Promise<Todo> {
    return this.todoContext.addTodo(todo);
  }

  update(todo: Todo): Promise<void> {
    return this.todoContext.updateTodo(todo);
  }

  get(id: number): Promise<Todo | null> {
    return this.todoContext.findById(id);
  }

  findOne(): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  findAll(specification: TodoFilterSpec): Promise<Todo[]> {
    if (specification?.status) {
      return this.todoContext.findByStatus(specification.status);
    }

    return this.todoContext.findAll();
  }

  delete(specification: DeleteSpec): Promise<void> {
    return this.todoContext.deleteById(specification.todoId);
  }
}
