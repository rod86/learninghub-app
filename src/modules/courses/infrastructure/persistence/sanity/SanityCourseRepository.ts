import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import Course from '@modules/courses/domain/models/Course';
import {inject, injectable} from 'tsyringe';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';

@injectable()
class SanityCourseRepository implements CourseRepositoryInterface {

    constructor(
        @inject('SanityRepository') private readonly repository: SanityRepository
    ) {}

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

        return await this.repository.fetch<Course>(query);
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

        return this.repository.fetchOne<Course>(query);
    }
}

export default SanityCourseRepository;