import {UseCase,Response,Query} from '@modules/shared/domain/UseCase';
import SanityCourseRepository from '@modules/courses/infrastructure/persistence/sanity/SanityCourseRepository';
import Course from '@modules/courses/domain/models/Course';
import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import CourseNotFoundError from '@modules/courses/domain/errors/CourseNotFoundError';

interface FindCourseBySlugUseCaseQuery extends Query {
    slug: string;
}

interface FindCourseBySlugUseCaseResponse extends Response {
    course: Course;
}

class FindCourseBySlugUseCase implements UseCase<FindCourseBySlugUseCaseQuery, Promise<FindCourseBySlugUseCaseResponse>> {

    private readonly courseRepository: CourseRepositoryInterface;

    constructor() {
        this.courseRepository = new SanityCourseRepository();
    }

    async handle({ slug }: FindCourseBySlugUseCaseQuery): Promise<FindCourseBySlugUseCaseResponse> {
        const course = await this.courseRepository.findCourseBySlug(slug);

        if (!course) {
            throw new CourseNotFoundError();
        }

        return { course };
    }
}

export default FindCourseBySlugUseCase;