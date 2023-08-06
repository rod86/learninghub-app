import { container } from 'tsyringe';
import {createClient} from '@sanity/client';
import SanityCourseRepository from '@modules/courses/infrastructure/persistence/sanity/SanityCourseRepository';
import SanityTagRepository from '@modules/courses/infrastructure/persistence/sanity/SanityTagRepository';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';


container.register<SanityRepository>('SanityRepository', {
    useValue: new SanityRepository(
        createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN,
            apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
        })
    )
});

container.register('CourseRepositoryInterface', {
    useClass: SanityCourseRepository
});

container.register('TagRepositoryInterface', {
    useClass: SanityTagRepository
});