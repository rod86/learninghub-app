import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import Course from '@modules/courses/domain/models/Course';
import {injectable} from 'tsyringe';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';
import {SanityDocument} from '@sanity/client';

@injectable()
class SanityCourseRepository extends SanityRepository implements CourseRepositoryInterface {

    public async getAllCourses(): Promise<Course[]> {
        const query = `*[_type == "course"] {
            "id": _id,
            title,  
            "slug": slug.current,
            format,
            level,
            durationMinutes,
            publishedAt,
            description,
            isFree,
            url,
            "tags": tags[]->{"id":_id,"slug":slug.current,name}
        }`;

        return await this.client.fetch<Course[]>(query);
    }

    async findCourseBySlug(slug: string): Promise<Course|null> {
        const query = `*[_type == "course" && slug.current == "${slug}"] {
            "id": _id,
            title,  
            "slug": slug.current,
            format,
            level,
            durationMinutes,
            publishedAt,
            description,
            isFree,
            url,
            "tags": tags[]->{"id":_id,"slug":slug.current,name}
        }`;

        const result = await this.client.fetch<Course[]>(query);
        return result.shift() as Course || null;
    }
}

export default SanityCourseRepository;