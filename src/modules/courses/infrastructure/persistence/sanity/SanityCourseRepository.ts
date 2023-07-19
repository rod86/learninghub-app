import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import {Course} from '@modules/courses/domain/models/Course';

class SanityCourseRepository implements CourseRepositoryInterface {
    fetchCourseBySlug(slug: string): Course {
        return {
            id: 'abcde',
            title: 'hello',
            slug,
            tags: [],
            format: 'web',
            duration: 200,
            level: 'beginner',
            isFree: true
        } as Course;
    }

    fetchCourses(): Course[] {
        return [];
    }
}

export default SanityCourseRepository;