import {UseCase} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import {inject, injectable} from 'tsyringe';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import {CourseFilterCriteria} from '@modules/courses/domain/CourseFilterCriteria';

interface GetCoursesByFilterUseCaseQuery {
    search: string|null;
    tags: string[];
    format: string[];

    minDuration: number|null;

    maxDuration: number|null;

    level: string[];
}

interface GetCoursesByFilterUseCaseResponse {
    courses: Course[];
}

@injectable()
class GetCoursesByFilterUseCase implements UseCase<GetCoursesByFilterUseCaseQuery, Promise<GetCoursesByFilterUseCaseResponse>> {

    constructor(
        @inject('CourseRepositoryInterface') private readonly courseRepository: CourseRepositoryInterface
    ) {}

    async handle(query: GetCoursesByFilterUseCaseQuery): Promise<GetCoursesByFilterUseCaseResponse> {

        const criteria: CourseFilterCriteria = {};

        if (query.search) {
            criteria['search'] = query.search;
        }

        if (query.tags.length) {
            criteria['tags'] = query.tags;
        }

        if (query.minDuration) {
            criteria['minDuration'] = query.minDuration;
        }

        if (query.maxDuration) {
            criteria['maxDuration'] = query.maxDuration;
        }

        if (query.format.length) {
            criteria['format'] = query.format;
        }

        if (query.level.length) {
            criteria['level'] = query.level;
        }

        const courses = await this.courseRepository.findCoursesByCriteria(criteria);

        return { courses };
    }
}

export default GetCoursesByFilterUseCase;