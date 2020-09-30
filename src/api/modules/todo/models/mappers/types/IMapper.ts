import { Todo } from "@/domain/aggregates/todo/Todo";

export interface IMapper<TIn, TOut> {
    mapArray(model: TIn[]): TOut[];
    map(model: TIn): TOut;
}