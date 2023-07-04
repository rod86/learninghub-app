import { Course } from '@lib/models/Course';
import CourseListItem from '@components/courses/CourseListItem';

interface CoursesListProps {
    courses: Course[];
}

const CoursesList = ({ courses }: CoursesListProps) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-5 mb-8 lg:grid-cols-2">
                {courses.map(course => (
                    <CourseListItem course={course} key={course.id} />
                ))}
            </div>
        </>
    );
};

export default CoursesList;