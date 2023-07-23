
interface DomainErrorObject {
    message: string,
    code: string
}

abstract class DomainError extends Error {

    abstract get message(): string;

    abstract get code(): string;

    toObject(): DomainErrorObject {
        return {
            code: this.code,
            message: this.message
        };
    }
}

export default DomainError;