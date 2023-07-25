import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import Course from '@modules/courses/domain/models/Course';
import {SanityDocument} from '@sanity/client';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';

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

        const result: SanityDocument<Course>[] = await this.client.fetch(query);
        return result as Course[];
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
        const result: SanityDocument<Course>[] = await this.client.fetch(query);
        const row = result.shift() as Course || null;

        if (!row) {
            return null;
        }

        return row;
    }
}

export default SanityCourseRepository;