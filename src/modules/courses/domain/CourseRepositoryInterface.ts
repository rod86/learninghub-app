import Course from '@modules/courses/domain/models/Course';

interface CourseRepositoryInterface {
    getAllCourses(): Promise<Course[]>;

    findCourseBySlug(slug: string): Promise<Course|null>;
}

export default CourseRepositoryInterface;