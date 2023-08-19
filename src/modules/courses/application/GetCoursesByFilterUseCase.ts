import {UseCase} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import {inject, injectable} from 'tsyringe';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';

interface GetCoursesByFilterUseCaseQuery {
    search: string|null;
    tags: string[];
    format: string[];

    duration: string[];

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

        const criteria: { [key: string]: any } = {};

        if (query.search) {
            criteria['search'] = query.search;
        }

        if (query.tags.length) {
            criteria['tags'] = query.tags;
        }

        if (query.duration.length) {
            criteria['durationMin'] = query.duration + '_min';
            criteria['durationMax'] = query.duration + '_max';
        }

        if (query.format.length) {
            criteria['format'] = query.format;
        }

        if (query.level.length) {
            criteria['level'] = query.format;
        }

        return { courses: [] };
    }
}

export default GetCoursesByFilterUseCase;