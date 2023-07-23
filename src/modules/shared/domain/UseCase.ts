export abstract class Query {}
export abstract class Response {}


export interface UseCase<Q extends Query|void = void, R extends Response|void = void> {
    handle(query: Q): R;
}