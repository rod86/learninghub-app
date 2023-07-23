import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import CourseFormatBadge from '@components/courses/CourseFormatBadge';
import {GoCalendar, GoClock, GoLink} from 'react-icons/go';
import {FaStairs} from 'react-icons/fa6';
import CourseTag from '@components/courses/CourseTag';
import TimeDuration from '@components/common/TimeDuration';
import GetCoursesUseCase from '@modules/courses/application/GetCoursesUseCase';
import Course from '@modules/courses/domain/models/Course';
import FindCourseBySlugUseCase from '@modules/courses/application/FindCourseBySlugUseCase';

interface CoursePageProps {
    course: Course;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const handler = new GetCoursesUseCase();
    const { courses } = await handler.handle();
    const paths = courses.map(course => ({ params: { slug: course.slug }}));
    return {
        paths,
        fallback: false
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug?.toString() as string;
    const finder = new FindCourseBySlugUseCase();
    const { course } = await finder.handle({ slug });

    return {
        props: { course }
    };
};

function CoursePage({ course }: CoursePageProps) {
    return (
        <>
            <CourseFormatBadge format={course.format} isLarge className="mb-3" />
            <h1 className="section-header mb-7">{course.title}</h1>
            <div className="flex-row space-y-3 items-center justify-between text-slate-500 mb-7 md:flex md:space-y-0 lg:w-2/3">
                <div className="flex items-center">
                    <GoCalendar className="w-4 h-4 mr-2" />
                    <span className="font-thin">{course.publishedAt}</span>
                </div>
                <div className="flex items-center">
                    <GoClock className="w-4 h-4 mr-2" />
                    <TimeDuration duration={course.durationMinutes} />
                </div>
                <div className="flex items-center">
                    <FaStairs className="w-4 h-4 mr-2" />
                    <span className="font-thin">{course.level}</span>
                </div>
            </div>
            <div className="flex-row items-start space-x-4 mb-10">
                {course.tags.map(item => <CourseTag key={item.id} label={item.name} isLarge />)}
            </div>
            <p className="mb-10">
                [desc here]
            </p>
            <div className="lg:text-center">
                <a href={course.url}
                    target="_blank"
                    className="inline-flex items-center justify-center w-full lg:w-auto text-center px-10 py-2 text-emerald-500 tracking-wide border-2 border-emerald-500 rounded-md transition-all duration-300 hover:bg-emerald-500 hover:text-white">
                    <GoLink className="w-6 h-6 mr-2" />
                    Open Course
                </a>
            </div>
        </>
    );
}

export default CoursePage;