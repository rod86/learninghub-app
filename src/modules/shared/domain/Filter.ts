
export type OrderByDirection = 'asc' | 'desc';

export type Filter<T> = {
    filters: T,
    orderColumn?: string,
    orderDirection?: OrderByDirection,
    offset?: number,
    limit?: number
};

export type FilterResult<T> = {
    total: number,
    items: T
};

export type FindByFilter<T, R> = (options: Filter<T>) => Promise<FilterResult<R>>;