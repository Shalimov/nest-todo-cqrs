export class TodoViewModel {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly status: string,
  ) {}
}
