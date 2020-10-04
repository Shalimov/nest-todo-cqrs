export interface IUnitOfWork {
  complete(): Promise<void>;
}