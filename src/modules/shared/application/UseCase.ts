export abstract class Response {}
export abstract class UseCase {}

export interface UseCaseHandler<Q extends UseCase, R extends Response> {
    handle(query: Q): R;
}