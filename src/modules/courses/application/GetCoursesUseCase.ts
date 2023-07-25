import {UseCase, Response} from '@modules/shared/domain/UseCase';
import Course from '@modules/courses/domain/models/Course';
import type CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import {inject, injectable} from 'tsyringe';

interface GetCoursesUseCaseResponse extends Response {
    courses: Course[];
}

@injectable()
class GetCoursesUseCase implements UseCase<void, Promise<GetCoursesUseCaseResponse>> {

    constructor(
        @inject('CourseRepositoryInterface') private readonly courseRepository: CourseRepositoryInterface
    ) {}

    async handle(): Promise<GetCoursesUseCaseResponse> {
        const courses = await this.courseRepository.getAllCourses();
        return { courses };
    }
}

export default GetCoursesUseCase;