import Link from 'next/link';
import { Course } from '@lib/models/Course';
import Button from '@components/common/Button';
import CourseFormatBadge from '@components/courses/CourseFormatBadge';
import {GoCalendar, GoClock} from 'react-icons/go';
import {FaStairs} from 'react-icons/fa6';

interface CoursesListItemProps {
    course: Course;
}

// TODO move to right place
const convertDuration = (value: number): string => {
    const hours = value / 60,
        rhours = Math.floor(hours),
        minutes = (hours - rhours)*60,
        rminutes = Math.round(minutes);

    let text = '';
    if (rhours > 0) text += `${rhours} hours `;
    if (rminutes > 0) text += `${rminutes} minutes`;

    return text;
};

const CoursesListItem = ({ course }: CoursesListItemProps) => {
    return (
        <div className="border border-slate-100 rounded-md shadow-md px-7 py-5">
            <CourseFormatBadge format={course.format} />
            <div className="text-xl font-thin mt-2 mb-3">
                <Link href={`/courses/${course.slug}`} className="hover:opacity-75">
                    {course.title}
                </Link>
            </div>
            <div className="flex-row space-y-3 items-center justify-between text-slate-500 mb-3 md:flex md:space-y-0">
                <div className="flex items-center">
                    <GoCalendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-thin">11/11/2000</span>
                </div>
                <div className="flex items-center">
                    <GoClock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-thin">{convertDuration(course.duration)}</span>
                </div>
                <div className="flex items-center">
                    <FaStairs className="w-4 h-4 mr-2" />
                    <span className="text-sm font-thin">{course.level}</span>
                </div>
            </div>
            <div className="inline-flex flex-wrap space-x-2 mb-5">
                <span
                    className="mb-1.5 text-emerald-500 text-xs font-thin px-1.5 py-0.5 rounded border border-emerald-500">NodeJS</span>
                <span
                    className="mb-1.5 text-emerald-500 text-xs font-thin px-1.5 py-0.5 rounded border border-emerald-500">Express</span>
                <span
                    className="mb-1.5 text-emerald-500 text-xs font-thin px-1.5 py-0.5 rounded border border-emerald-500">MongoDB</span>
            </div>
            <div className="lg:text-right">
                <Button
                    text='View'
                    url={`/courses/${course.slug}`}
                />
            </div>
        </div>
    );
};

export default CoursesListItem;