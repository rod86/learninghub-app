import Tag from '@modules/courses/domain/models/Tag';
import {PortableTextBlock} from '@portabletext/types';

export type CourseFormat = 'web' | 'video' | 'pdf';

export type Level = 'beginner' | 'intermediate' | 'advanced';

 interface Course {
    id: string;
    title: string;
    slug: string;
    tags: Tag[];
    format: CourseFormat;
    level: Level;
    durationMinutes: number;
    url: string;
    isFree: boolean;
    publishedAt: string;
    description?: PortableTextBlock[];
}

export default Course;