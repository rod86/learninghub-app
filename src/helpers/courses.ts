import {container} from 'tsyringe';
import GetCoursesByFilterUseCase from '@modules/courses/application/GetCoursesByFilterUseCase';
import Course from '@modules/courses/domain/models/Course';
import GetTagsUseCase from '@modules/courses/application/GetTagsUseCase';

export interface Courses {
    search: string|null;
    tag: string|null;
    format: string[];
    duration: string|null;
    level: string[];
}

interface CourseDuration {
    id: string;
    title: string;
    minDuration?: number;
    maxDuration?: number;
}

export const COURSE_DURATION: CourseDuration[] = [
    {
        id:'1_hour_or_less',
        title: '1 hour or less',
        maxDuration: 60,
    },
    {
        id:'1_3_hours',
        title: '1 - 3 hours',
        minDuration: 60,
        maxDuration: 180,
    },
    {
        id:'3_6_hours',
        title: '3 - 6 hours',
        minDuration: 180,
        maxDuration: 360,
    },
    {
        id:'6_hours_or_more',
        title: '6 hours or more',
        minDuration: 360,
    },
];

export const COURSE_FORMAT_OPTIONS = [
    {value: 'web', label: 'Web\\Blog'},
    {value: 'video', label: 'Video'},
    {value: 'pdf', label: 'Pdf'},
];

export const COURSE_LEVEL_OPTIONS = [
    {value: 'beginner', label: 'Beginner'},
    {value: 'intermediate', label: 'Intermediate'},
    {value: 'advanced', label: 'Advanced'},
];

export const DEFAULT_FILTER_VALUES: Courses = {
    search: null,
    tag: null,
    format: [],
    duration: null,
    level: []
};

export async function searchCourses(values: Courses): Promise<Course[]> {

    const { minDuration, maxDuration } = values.duration
        ? getDurationTimeRange(values.duration)
        : { minDuration: null, maxDuration: null};

    const tags = values.tag ? [values.tag] : [];

    const handler = container.resolve<GetCoursesByFilterUseCase>(GetCoursesByFilterUseCase);
    const { courses } = await handler.handle({
        search: values.search,
        tags,
        format: values.format,
        minDuration,
        maxDuration,
        level: values.level
    });

    return courses;
}

export async function getTagsOptions(): Promise<{ value: string, label: string}[]> {
    const getTagsUseCase = container.resolve(GetTagsUseCase);
    const { tags } = await getTagsUseCase.handle();
    return tags.map(elem => ({
        value: elem.id,
        label: elem.name
    }));
}

export function getDurationOptions(): { value: string, label: string}[] {
    return COURSE_DURATION.map(elem => ({
        value: elem.id,
        label: elem.title
    }));
}

function getDurationTimeRange(id: string): {minDuration: number|null, maxDuration: number|null} {
    const duration = COURSE_DURATION.find(elem => elem.id === id);

    if (!duration) {
        throw new Error(`Duration option with id ${id} not found`);
    }

    return {
        minDuration: duration.minDuration ?? null,
        maxDuration: duration.maxDuration ?? null,
    };
}