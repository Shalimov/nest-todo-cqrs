import { ISpecification } from '../types/ISpecification';

export class DeleteSpec implements ISpecification {
  constructor(public readonly todoId: number) {}

  getSpecType() {
    return 'DeleteSpec';
  }
}
