import { container } from 'tsyringe';
import SanityCourseRepository from '@modules/courses/infrastructure/persistence/sanity/SanityCourseRepository';
import SanityTagRepository from '@modules/courses/infrastructure/persistence/sanity/SanityTagRepository';

container.register('CourseRepositoryInterface', {
    useClass: SanityCourseRepository
});

container.register('TagRepositoryInterface', {
    useClass: SanityTagRepository
});