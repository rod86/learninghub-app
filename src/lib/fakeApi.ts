import {Course} from '@lib/models/Course';
import {courses, tags} from '@lib/data';
import {Tag} from '@lib/models/Tag';
export interface CoursesFilterValues {
    search: string|null;
    tag: number|null;
    format: string[];
    duration: string[];
    level: string[];
}

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const fetchCourses = async (filters?: CoursesFilterValues): Promise<Course[]> => {
    await delay(500);

    let filteredCourses = courses;

    const { search = null, format = null, tag = null } = filters || {};
    if (search !== null) {
        filteredCourses = filteredCourses.filter(item => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });
    }

    if (tag) {
        filteredCourses = filteredCourses.filter(item => {
            return item.tags[0].id == tag;
        });
    }

    if (format && format.length) {
        filteredCourses = filteredCourses.filter(item => format.includes(item.format));
    }

    return filteredCourses;
};

const fetchCourseBySlug = async (slug: string): Promise<Course|null> => {
    await delay(500);
    return courses.filter(item => item.slug === slug).shift() || null;
};

const fetchTags = async (): Promise<Tag[]> => {
    await delay(500);
    return tags;
};

export { fetchCourses, fetchTags,fetchCourseBySlug };