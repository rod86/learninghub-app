import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import {fetchCourseBySlug} from '@lib/fakeApi';
import {Course} from '@lib/models/Course';
import {courses} from '@lib/data';
import CourseFormatBadge from '@components/courses/CourseFormatBadge';
import {GoCalendar, GoClock, GoLink} from 'react-icons/go';
import {FaStairs} from 'react-icons/fa6';
import CourseTag from '@components/courses/CourseTag';
import TimeDuration from '@components/common/TimeDuration';

interface CoursePageProps {
    course: Course;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = courses.map(course => ({ params: { slug: course.slug }}));
    return {
        paths,
        fallback: false
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug?.toString() as string;
    const course = await fetchCourseBySlug(slug);

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
                    <span className="font-thin">11/11/2000</span>
                </div>
                <div className="flex items-center">
                    <GoClock className="w-4 h-4 mr-2" />
                    <TimeDuration duration={course.duration} />
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio facilis repudiandae, aperiam dolor
                ipsam minus, atque omnis assumenda molestias minima totam deleniti voluptatum eos voluptates non. Eius
                assumenda in debitis repudiandae architecto cupiditate quasi rem consectetur, quibusdam molestiae
                nostrum culpa dignissimos repellat dolorum, tempore est aperiam voluptatem esse placeat. Commodi dolores
                labore ipsa tempore officiis dolorem nemo, expedita aliquam praesentium laboriosam quod. Quidem iste
                cumque veritatis accusamus culpa dolor optio voluptatum maxime hic praesentium necessitatibus nobis odit
                nam, minima similique sapiente ab odio nostrum excepturi. Architecto soluta saepe, culpa doloremque
                veniam dicta repellat nulla eveniet fugit molestias voluptatum harum quas dolor eos minima placeat
                beatae obcaecati esse facilis nam, eius excepturi. Odit at nostrum doloribus deserunt rem rerum a ad
                quia laudantium inventore, quidem culpa quam sunt suscipit commodi nihil voluptatibus perspiciatis? Quos
                corporis autem repellendus perferendis beatae earum optio nam nostrum aperiam, praesentium officiis ad.
                Obcaecati id, vero nulla nisi optio temporibus voluptates quasi beatae harum totam, repellat
                voluptatibus ducimus recusandae magni reiciendis iusto unde nemo consequuntur omnis? Ex earum unde
                fugiat amet, autem saepe magni iste assumenda? Officia odio laudantium doloremque iusto eaque commodi
                error corporis voluptatem modi, excepturi numquam earum quo consequatur, asperiores accusamus unde!
                Ducimus nesciunt veritatis eaque nemo, aspernatur recusandae blanditiis nam incidunt qui aliquid, vel
                obcaecati assumenda iusto dicta et dolorem atque aliquam! Odio minima dignissimos molestiae quo nisi
                fugit repudiandae ullam? Dolor, ad! Cumque, atque. Dolorum odio corrupti quae optio quos et iste dolor
                animi, consequatur ad error facere, temporibus qui sit non, placeat laboriosam repellendus? A hic libero
                vero, labore aliquid, similique, magnam debitis nam odio incidunt saepe. Tempora distinctio fugit sequi
                iste voluptate modi explicabo sunt, nam culpa soluta ea similique magni error cum consequuntur illo non
                sit provident molestiae eligendi aspernatur consectetur eum! Accusantium tempora inventore velit,
                adipisci, rerum accusamus soluta pariatur optio odit facilis necessitatibus animi assumenda ad laborum
                odio natus mollitia dolorem illo ea earum architecto? Quibusdam modi nesciunt ipsum sint voluptatum
                culpa repudiandae facere. Impedit atque quam laborum nemo amet sapiente beatae. Facere error voluptatem
                fugit quae atque doloribus neque accusantium corporis corrupti voluptatibus, earum minus quibusdam quod
                molestias architecto voluptatum rem dolorem. Officiis reiciendis, tenetur tempora repudiandae ipsa
                incidunt adipisci doloremque nisi a est facere nihil iste atque, culpa impedit eos modi amet sit
                expedita. Veritatis quasi ex suscipit culpa amet iste cum, et ea officia qui quam, iure id possimus
                voluptatibus consectetur veniam perspiciatis. Itaque voluptatibus distinctio placeat rem reprehenderit
                numquam nostrum quod laudantium et, voluptatem deleniti dolorum, autem atque! Mollitia, sint ab?
                Repellat architecto odit cumque beatae voluptates hic, incidunt aperiam quod distinctio at ut eius iusto
                minima culpa voluptatum consequatur? Debitis quas nam suscipit accusamus voluptatem dolorum
                exercitationem reiciendis beatae veritatis modi? Voluptatibus soluta quis repudiandae, sunt, amet
                explicabo illo excepturi magni provident, distinctio quidem odit aperiam asperiores! Explicabo maiores
                iure totam repudiandae ipsum quidem expedita culpa repellat earum architecto ea amet, suscipit a? Illo,
                delectus quia. Natus, voluptatum odio! Et atque consequatur voluptates dolor voluptatibus distinctio
                autem labore ea, laborum dolore velit!
            </p>
            <div className="lg:text-center">
                <a href="#"
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