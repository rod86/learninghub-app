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

    async findCoursesByCriteria(
        criteria: CourseFilterCriteria,
        orderColumn?: string,
        orderDirection?: 'asc' | 'desc',
        offset?: number,
        limit?: number
    ): Promise<Course[]> {

        const where = [
            '_type == "course"'
        ];
        let orderClause = '',
            limitClause = '';

        const joinValues = (values: string[]) => `"${values.join('","')}"`;

        if (criteria.search) {
            where.push(`title match "${criteria.search}"`);
        }

        if (criteria.tags?.length) {
            where.push(`count((tags[]->_id)[@ in [${joinValues(criteria.tags)}]]) > 0`);
        }

        if (criteria.minDuration) {
            where.push(`durationMinutes >= ${criteria.minDuration}`);
        }

        if (criteria.maxDuration) {
            where.push(`durationMinutes < ${criteria.maxDuration}`);
        }

        if (criteria.format?.length) {
            where.push(`format in [${joinValues(criteria.format)}]`);
        }

        if (criteria.level?.length) {
            where.push(`level in [${joinValues(criteria.level)}]`);
        }

        if (offset || limit) {
            offset = offset ?? 0;
            limit = limit ?? 20;

            limitClause = `[${offset}..${limit}]`;
        }

        if (orderColumn) {
            orderClause = `|order(${orderColumn} ${orderDirection ?? 'desc'})`;
        }

        const query = `*[${where.join(' && ')}]${orderClause}${limitClause} {
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