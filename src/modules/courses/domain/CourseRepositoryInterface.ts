import Course from '@modules/courses/domain/models/Course';
import {CourseFilterCriteria} from '@modules/courses/domain/CourseFilterCriteria';

interface CourseRepositoryInterface {
    getAllCourses(): Promise<Course[]>;

    findCoursesByCriteria(criteria: CourseFilterCriteria): Promise<Course[]>;

    findCourseBySlug(slug: string): Promise<Course|null>;
}

export default CourseRepositoryInterface;