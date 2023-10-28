import {UseCase} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import {inject, injectable} from 'tsyringe';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import {CourseFilter} from '@modules/courses/domain/CourseFilter';
import {OrderByDirection} from '@modules/shared/domain/Filter';

interface GetCoursesByFilterUseCaseQuery {
    search?: string|null;
    tags?: string[];
    format?: string[];
    minDuration?: number|null;
    maxDuration?: number|null;
    level?: string[];
    orderColumn?: string;
    orderDirection?: OrderByDirection;
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

        const filters: CourseFilter = {};

        if (query.search) {
            filters['search'] = query.search;
        }

        if (query.tags) {
            filters['tags'] = query.tags;
        }

        if (query.minDuration) {
            filters['minDuration'] = query.minDuration;
        }

        if (query.maxDuration) {
            filters['maxDuration'] = query.maxDuration;
        }

        if (query.format) {
            filters['format'] = query.format;
        }

        if (query.level) {
            filters['level'] = query.level;
        }

        const result = await this.courseRepository.findByFilter({
            filters,
            orderColumn: query.orderColumn,
            orderDirection: query.orderDirection,
            offset: query.offset,
            limit: query.limit
        });

        return { courses: result.items };
    }
}

export default GetCoursesByFilterUseCase;