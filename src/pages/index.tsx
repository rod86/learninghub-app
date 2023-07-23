import TagsList from '@components/tags/TagsList';
import { GetStaticProps } from 'next';
import CoursesList from '@components/courses/CoursesList';
import LinkButton from '@components/common/LinkButton';
import {GoChevronRight} from 'react-icons/go';
import GetCoursesUseCase from '@modules/courses/application/GetCoursesUseCase';
import Course from '@modules/courses/domain/models/Course';
import GetTagsUseCase from '@modules/courses/application/GetTagsUseCase';
import Tag from '@modules/courses/domain/models/Tag';

interface HomePageProps {
    tags: Tag[];
    latestCourses: Course[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const coursesUseCase = new GetCoursesUseCase();
    const { courses } = await coursesUseCase.handle();
    //TODO fetch 5 courses order by publishedAt desc

    const tagUseCase = new GetTagsUseCase();
    const { tags } = await tagUseCase.handle();

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
