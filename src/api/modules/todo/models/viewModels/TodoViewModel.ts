export class TodoViewModel {
  constructor(
    public readonly id: number | null,
    public readonly title: string,
    public readonly description: string,
    public readonly status: string,
  ) {}
}
