import Link from 'next/link';
import Course from '@modules/courses/domain/models/Course';
import LinkButton from '@components/common/LinkButton';
import CourseFormatBadge from '@components/courses/CourseFormatBadge';
import {GoCalendar, GoClock} from 'react-icons/go';
import {FaStairs} from 'react-icons/fa6';
import CourseTag from '@components/courses/CourseTag';
import TimeDuration from '@components/common/TimeDuration';

interface CoursesListItemProps {
    course: Course;
}

const CoursesListItem = ({ course }: CoursesListItemProps) => {
    return (
        <div className="border border-slate-100 rounded-md shadow-md px-7 py-5">
            <CourseFormatBadge format={course.format} />
            <div className="text-xl font-thin mt-2 mb-3">
                <Link href={`/courses/${course.slug}`} className="hover:opacity-75">
                    {course.title}
                </Link>
            </div>
            <div className="flex-row space-y-3 items-center text-slate-500 mb-3 md:flex md:space-y-0 md:space-x-16">
                <div className="flex items-center flex-1">
                    <GoCalendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-thin">11/11/2000</span>
                </div>
                <div className="flex items-center flex-1">
                    <GoClock className="w-4 h-4 mr-2" />
                    <TimeDuration duration={course.durationMinutes} />
                </div>
                <div className="flex items-center flex-1">
                    <FaStairs className="w-4 h-4 mr-2" />
                    <span className="text-sm font-thin">{course.level}</span>
                </div>
            </div>
            <div className="inline-flex flex-wrap space-x-2 mb-5">
                {course.tags.map(item => (
                    <CourseTag key={item.id} label={item.name} />
                ))}
            </div>
            <div className="lg:text-right">
                <LinkButton url={`/courses/${course.slug}`}>
                    View
                </LinkButton>
            </div>
        </div>
    );
};

export default CoursesListItem;