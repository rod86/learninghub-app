import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { courses } from '@lib/data';

interface CoursePageProps {
    slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = courses.map(course => ({ params: { courseSlug: course.slug }}));
    return {
        paths,
        fallback: false
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const courseSlug = params?.courseSlug?.toString();

    // TODO fetch courses by tag

    return {
        props: { slug: courseSlug }
    };
};

function CoursePage({ slug }: CoursePageProps) {
    return (
        <div>course detail page {slug}</div>
    );
}

export default CoursePage;