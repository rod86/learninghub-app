import {container} from 'tsyringe';
import GetCoursesByFilterUseCase from '@modules/courses/application/GetCoursesByFilterUseCase';
import Course from '@modules/courses/domain/models/Course';
import GetTagsUseCase from '@modules/courses/application/GetTagsUseCase';

export const COURSE_DURATION_OPTIONS = [
    {value:'1_hour_or_less', label: '1 hour or less'},
    {value:'1_3_hours', label: '1 - 3 hours'},
    {value:'3_6_hours', label: '3 - 6 hours'},
    {value:'6_hours_or_more', label: '6 hours or more'},
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

export interface Courses {
    search: string|null;
    tag: string|null;
    format: string[];
    duration: string[];
    level: string[];
}

export const DEFAULT_FILTER_VALUES: Courses = {
    search: null,
    tag: null,
    format: [],
    duration: [],
    level: []
};

export async function searchCourses(values: Courses): Promise<Course[]> {
    const tags = values.tag ? [values.tag] : [];

    const handler = container.resolve<GetCoursesByFilterUseCase>(GetCoursesByFilterUseCase);
    const { courses } = await handler.handle({
        search: values.search,
        tags,
        format: values.format,
        duration: values.duration,
        level: values.level
    });

    return courses;
}

export async function getTagsOptions(): Promise<{ value: string, label: string}[]> {
    const getTagsUseCase = container.resolve(GetTagsUseCase);
    const { tags } = await getTagsUseCase.handle();
    return tags.map(elem => ({value: elem.id, label: elem.name}));
}