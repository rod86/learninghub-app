import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import Course from '@modules/courses/domain/models/Course';
import {injectable} from 'tsyringe';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';
import {CourseFilter} from '@modules/courses/domain/CourseFilter';
import {Filter, FilterResult} from '@modules/shared/domain/Filter';

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
        const query = `*[_type == "course" && slug.current == "${slug}"][0] {
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

        const result = await this.client.fetch<Course>(query);
        return result as Course || null;
    }

    async findByFilter(options: Filter<CourseFilter>): Promise<FilterResult<Course[]>> {
        const {
            filters,
            orderColumn,
            orderDirection,
            limit,
            offset
        } = options;

        const where = [
            '_type == "course"'
        ];
        let orderClause = '',
            limitClause = '';

        const joinValues = (values: string[]) => `"${values.join('","')}"`;

        // Build where clause
        if (filters.search) {
            where.push(`title match "${filters.search}"`);
        }

        if (filters.tags?.length) {
            where.push(`count((tags[]->_id)[@ in [${joinValues(filters.tags)}]]) > 0`);
        }

        if (filters.minDuration) {
            where.push(`durationMinutes >= ${filters.minDuration}`);
        }

        if (filters.maxDuration) {
            where.push(`durationMinutes < ${filters.maxDuration}`);
        }

        if (filters.format?.length) {
            where.push(`format in [${joinValues(filters.format)}]`);
        }

        if (filters.level?.length) {
            where.push(`level in [${joinValues(filters.level)}]`);
        }

        // Build limit clause
        if (limit || offset) {
            limitClause = `[${offset ?? 0}...${limit ?? 20}]`;
        }

        // Build order clause
        if (orderColumn) {
            orderClause = `|order(${orderColumn} ${orderDirection ?? 'desc'})`;
        }

        // Run query
        const query = `{
            "total": count(*[${where.join(' && ')}]),
            "items": *[${where.join(' && ')}]${orderClause}${limitClause} {
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
            }
        }`;

        return await this.client.fetch<FilterResult<Course[]>>(query);
    }
}

export default SanityCourseRepository;