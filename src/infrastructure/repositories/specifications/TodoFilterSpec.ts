import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';

import { ISpecification } from '../types/ISpecification';

export class TodoFilterSpec implements ISpecification {
  constructor(public readonly status: TodoStatus) {}

  createPredicate() {
    console.log('Predicate');
  }
}
