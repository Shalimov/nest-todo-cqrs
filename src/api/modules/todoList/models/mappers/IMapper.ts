export interface IMapper<TIn, TOut> {
    map(model: TIn): TOut;
}