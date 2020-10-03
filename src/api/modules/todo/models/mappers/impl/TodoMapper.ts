import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';

import { TodoViewModel } from '../../viewModels/TodoViewModel';

import { IMapper } from '../types';

export class TodoMapper implements IMapper<Todo, TodoViewModel> {
  mapArray(models: Todo[]): TodoViewModel[] {
    return models.map(this.map);
  }

  map(model: Todo): TodoViewModel {
    let status = 'None';

    switch (model.status) {
      case TodoStatus.COMPLETE:
        status = 'Completed';
        break;
      case TodoStatus.INPROGRESS:
        status = 'In Progress';
        break;
      default:
        throw new Error('[Mapping] Status argument is wrong and unsupported');
    }

    return new TodoViewModel(model.id, model.title, model.description, status);
  }
}
