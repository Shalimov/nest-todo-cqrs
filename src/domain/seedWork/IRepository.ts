export interface IRepository<TAggRoot, TSpec> {
  insert(record: TAggRoot): Promise<void>;
  update(record: TAggRoot): Promise<void>;
  findOne(spec: TSpec): Promise<TAggRoot>;
  findAll(spec?: TSpec): Promise<TAggRoot>
}
