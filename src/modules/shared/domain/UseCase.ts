


export interface UseCase<Q = void, R = void> {
    handle(query: Q): R;
}