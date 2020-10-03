export interface IRepository<TAggRoot, TSpec, ID = TAggRoot extends { id: infer T } ? NonNullable<T> : never> {
  insert(record: TAggRoot): Promise<TAggRoot>;
  update(id: ID, record: TAggRoot): Promise<void>;
  get(id: ID): Promise<TAggRoot | null>;
  findOne(spec: TSpec): Promise<TAggRoot | null>;
  findAll(spec?: TSpec): Promise<TAggRoot[]>
}
