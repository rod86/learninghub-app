import {Course} from './models/Course';
import {Tag} from './models/Tag';

const tags: Tag[] = [
    {id: '1', name: 'Marketing & SEO', slug: 'marketing-seo'},
    {id: '2', name: 'Backend', slug: 'backend'},
    {id: '3', name: 'Frontend', slug: 'frontend'},
    {id: '4', name: 'devops', slug: 'devops'},
    {id: '5', name: 'Testing', slug: 'testing'},
    {id: '6', name: 'Software Architecture', slug: 'software-architecture'},
    {id: '7', name: 'Mobile App Develepment', slug: 'mobile-app-development'},
];

const courses: Course[] = [
    {
        id: '1',
        title: 'Build a chat with React and Socket.io',
        slug: 'build-a-chat-with-react-and-socket-io',
        tags: [tags[2]],
        format: 'video',
        level: 'beginner',
        duration: 50,
        isFree: true
    },
    {
        id: '2',
        title: 'Design Patterns with Javascript',
        slug: 'design-patterns-with-javascript',
        tags: [tags[5]],
        format: 'web',
        level: 'advanced',
        duration: 250,
        isFree: false
    },
    {
        id: '3',
        title: 'Introduction to Flutter',
        slug: 'introduction-to-flutter',
        tags: [tags[6]],
        format: 'video',
        level: 'beginner',
        duration: 400,
        isFree: true
    },
    {
        id: '4',
        title: 'SEO with NextJS',
        slug: 'seo-with-nextjs',
        tags: [tags[0]],
        format: 'pdf',
        level: 'intermediate',
        duration: 360,
        isFree: true
    },
    {
        id: '5',
        title: 'Learn TailwindCSS with 3 projects',
        slug: 'learn-tailwindcss-with-3-projects',
        tags: [tags[2]],
        format: 'video',
        level: 'intermediate',
        duration: 540,
        isFree: false
    },
    {
        id: '6',
        title: 'Domain Driven Design with Symfony 6',
        slug: 'domain-driven-design-with-symfony-6',
        tags: [tags[5]],
        format: 'video',
        level: 'advanced',
        duration: 450,
        isFree: true
    },
    {
        id: '7',
        title: 'iOs App Development from scratch',
        slug: 'ios-app-development-from-scratch',
        tags: [tags[6]],
        format: 'video',
        level: 'beginner',
        duration: 700,
        isFree: false
    },
];

export {tags, courses};