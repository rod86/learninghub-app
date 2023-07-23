import {UseCase, Response} from '@modules/shared/domain/UseCase';
import SanityCourseRepository from '@modules/courses/infrastructure/persistence/sanity/SanityCourseRepository';
import Course from '@modules/courses/domain/models/Course';
import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';

interface GetCoursesUseCaseResponse extends Response {
    courses: Course[];
}

class GetCoursesUseCase implements UseCase<void, Promise<GetCoursesUseCaseResponse>> {

    private readonly courseRepository: CourseRepositoryInterface;

    constructor() {
        this.courseRepository = new SanityCourseRepository();
    }
    async handle(): Promise<GetCoursesUseCaseResponse> {
        const courses = await this.courseRepository.getAllCourses();
        return { courses };
    }
}

export default GetCoursesUseCase;