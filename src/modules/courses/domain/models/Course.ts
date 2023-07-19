import {Tag} from '@lib/models/Tag';

export type CourseFormat = 'web' | 'video' | 'pdf';

export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
    id: string;
    title: string;
    slug: string;
    tags: Tag[];
    format: CourseFormat;
    duration: number;

    level: Level;

    isFree: boolean;
}