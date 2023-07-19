import {Course} from '@modules/courses/domain/models/Course';

interface CourseRepositoryInterface {
    fetchCourses: () => Course[];
    fetchCourseBySlug: (slug: string) => Course; // throws excpetion if no result
}

export default CourseRepositoryInterface;