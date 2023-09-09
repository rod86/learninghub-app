import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import Course from '@modules/courses/domain/models/Course';
import {injectable} from 'tsyringe';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';
import {CourseFilterCriteria} from '@modules/courses/domain/CourseFilterCriteria';

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

    async findCoursesByCriteria(criteria: CourseFilterCriteria): Promise<Course[]> {

        const where = [
            '_type == "course"'
        ];

        const joinValues = (values: string[]) => `"${values.join('","')}"`;

        if (criteria.search) {
            where.push(`title match "${criteria.search}"`);
        }

        if (criteria.tags) {
            where.push(`count((tags[]->_id)[@ in [${joinValues(criteria.tags)}]]) > 0`)
        }

        if (criteria.minDuration) {
            where.push(`durationMinutes >= ${criteria.minDuration}`);
        }

        if (criteria.maxDuration) {
            where.push(`durationMinutes < ${criteria.maxDuration}`);
        }

        if (criteria.format) {
            where.push(`format in [${joinValues(criteria.format)}]`);
        }

        if (criteria.level) {
            where.push(`level in [${joinValues(criteria.level)}]`);
        }

        const query = `*[${where.join(' && ')}] {
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
}

export default SanityCourseRepository;