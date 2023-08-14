import {UseCase} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import CourseNotFoundError from '@modules/courses/domain/errors/CourseNotFoundError';
import {inject, injectable} from 'tsyringe';

interface FindCourseBySlugUseCaseQuery{
    slug: string;
}

interface FindCourseBySlugUseCaseResponse {
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