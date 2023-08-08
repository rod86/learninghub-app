import { container } from 'tsyringe';
import {createClient, SanityClient} from '@sanity/client';
import SanityCourseRepository from '@modules/courses/infrastructure/persistence/sanity/SanityCourseRepository';
import SanityTagRepository from '@modules/courses/infrastructure/persistence/sanity/SanityTagRepository';
import CourseRepositoryInterface from '@modules/courses/domain/CourseRepositoryInterface';
import TagRepositoryInterface from '@modules/courses/domain/TagRepositoryInterface';


// Repositories
container.register<SanityClient>('SanityClient', {
    useValue: createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
    })
});

container.register<CourseRepositoryInterface>('CourseRepositoryInterface', {
    useValue: new SanityCourseRepository(
        container.resolve<SanityClient>('SanityClient')
    )
});

container.register<TagRepositoryInterface>('TagRepositoryInterface', {
    useValue: new SanityTagRepository(
        container.resolve<SanityClient>('SanityClient')
    )
});