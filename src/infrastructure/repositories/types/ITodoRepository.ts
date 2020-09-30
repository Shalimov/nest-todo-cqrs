import { Todo } from '@/domain/aggregates/todo/Todo';
import { IRepository } from '@/domain/seedWork/IRepository';

import { ISpecification } from '../types';

export type ITodoRepository = IRepository<Todo, ISpecification>;
export const ITodoRepository = 'ITodoRepository';
