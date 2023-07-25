import {UseCase,Response,Query} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import CourseNotFoundError from '@modules/courses/domain/errors/CourseNotFoundError';
import {inject, injectable} from 'tsyringe';

interface FindCourseBySlugUseCaseQuery extends Query {
    slug: string;
}

interface FindCourseBySlugUseCaseResponse extends Response {
    course: Course;
}

@injectable()
class FindCourseBySlugUseCase implements UseCase<FindCourseBySlugUseCaseQuery, Promise<FindCourseBySlugUseCaseResponse>> {

    constructor(
        @inject('CourseRepositoryInterface') private readonly courseRepository: CourseRepositoryInterface
    ) {}

    async handle({ slug }: FindCourseBySlugUseCaseQuery): Promise<FindCourseBySlugUseCaseResponse> {
        const course = await this.courseRepository.findCourseBySlug(slug);

        if (!course) {
            throw new CourseNotFoundError();
        }

        return { course };
    }
}

export default FindCourseBySlugUseCase;