import {UseCase} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import {inject, injectable} from 'tsyringe';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import {CourseFilterCriteria} from '@modules/courses/domain/CourseFilterCriteria';

interface GetCoursesByFilterUseCaseQuery {
    search?: string|null;
    tags?: string[];
    format?: string[];
    minDuration?: number|null;
    maxDuration?: number|null;
    level?: string[];
    orderColumn?: string;
    orderDirection?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
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

        if (query.tags) {
            criteria['tags'] = query.tags;
        }

        if (query.minDuration) {
            criteria['minDuration'] = query.minDuration;
        }

        if (query.maxDuration) {
            criteria['maxDuration'] = query.maxDuration;
        }

        if (query.format) {
            criteria['format'] = query.format;
        }

        if (query.level) {
            criteria['level'] = query.level;
        }

        const courses = await this.courseRepository.findCoursesByCriteria(
            criteria,
            query.orderColumn,
            query.orderDirection,
            query.offset,
            query.limit
        );

        return { courses };
    }
}

export default GetCoursesByFilterUseCase;