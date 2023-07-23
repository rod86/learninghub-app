import DomainError from '@modules/shared/domain/DomainError';

class CourseNotFoundError extends DomainError {
    get code(): string {
        return 'course_not_found';
    }

    get message(): string {
        return 'Course with "X" not found';
    }
}

export default CourseNotFoundError;