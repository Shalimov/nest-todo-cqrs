import { IQuery } from '@nestjs/cqrs';

export class FilterByStatusTodosQuery implements IQuery {
  constructor(public readonly status: 'completed' | 'inprogress') {}
}
