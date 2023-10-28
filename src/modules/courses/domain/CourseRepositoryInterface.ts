import Course from '@modules/courses/domain/models/Course';
import {CourseFilter} from '@modules/courses/domain/CourseFilter';
import {FindByFilter} from '@modules/shared/domain/Filter';

interface CourseRepositoryInterface {
    getAllCourses(): Promise<Course[]>;
    
    findByFilter: FindByFilter<CourseFilter, Course[]>;

    findCourseBySlug(slug: string): Promise<Course|null>;
}

export default CourseRepositoryInterface;