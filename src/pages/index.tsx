import TagsList from '@components/tags/TagsList';
import {Tag} from '@lib/models/Tag';
import { GetStaticProps } from 'next';
import { tags, courses } from '@lib/data';
import CoursesList from '@components/courses/CoursesList';
import {Course} from '@lib/models/Course';
import LinkButton from '@components/common/LinkButton';
import {GoChevronRight} from 'react-icons/go';

interface HomePageProps {
    tags: Tag[];
    latestCourses: Course[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    return { props: { tags, latestCourses: courses }};
};

export default function HomePage({ tags, latestCourses }: HomePageProps) {
    return (
        <>
            <section className="section">
                <h2 className="section-header">Categories</h2>
                <TagsList tags={tags} />
            </section>

            <section className="section">
                <h2 className="section-header">Latest Courses</h2>
                <CoursesList courses={latestCourses} />
                <div className="lg:text-right">
                    <LinkButton url="/courses" size='lg' outlined>
                        See All
                        <GoChevronRight className="w-6 h-6 ml-2" />
                    </LinkButton>
                </div>
            </section>
        </>
    );
}
