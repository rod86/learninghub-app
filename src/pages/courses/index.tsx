import {Course} from '@lib/models/Course';
import {courses as coursesData} from '@lib/data';
import CoursesList from '@components/courses/CoursesList';
import CoursesListFilter, {CoursesFilterValues} from '@components/courses/CoursesListFilter';
import {useEffect, useState} from 'react';
import Spinner from '@components/common/Spinner';
import {useRouter} from 'next/router';
import Button from '@components/common/Form/Button';
import {GoFilter} from 'react-icons/go';
import classNames from 'classnames';

const initialFilterValues = {
    search: null,
    category: null,
    format: [],
    duration: [],
    level: []
};

const applyFilters = (filters: CoursesFilterValues): Course[] => {
    let filteredCourses = coursesData;
    const { search, format, category } = filters;

    if (search !== null) {
        filteredCourses = filteredCourses.filter(item => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });
    }

    if (category) {
        filteredCourses = filteredCourses.filter(item => item.tags[0].id === category);
    }

    if (format.length) {
        filteredCourses = filteredCourses.filter(item => format.includes(item.format));
    }

    return filteredCourses;
};

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export default function CoursesPage() {
    const { query } = useRouter();
    const category = query.category as string;

    const [filterValues, setFilterValues] = useState<CoursesFilterValues>(initialFilterValues);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    useEffect(() => {
        if (!category) return;
        setFilterValues({...filterValues, category });
    }, [category]);

    useEffect(() => {
        const fetchCourses = setTimeout(() => {
            setIsLoading(true);
            delay(2000).then(()=>{
                setCourses(applyFilters(filterValues));
                setIsLoading(false);
            });
        }, 500);

        return () => clearTimeout(fetchCourses);
    }, [filterValues]);

    const onChangeFilter = (values: CoursesFilterValues): void => setFilterValues(values);
    const onClearFilters = () => setFilterValues(initialFilterValues);

    return (
        <>
            <h1 className="section-header">Courses</h1>

            <section className="flex-row section lg:flex">
                <div className="w-full lg:w-1/4 pb-5 lg:pb-0 lg:pr-5">
                    <Button
                        name="toggle-filters"
                        className="flex w-full items-center justify-center font-light text-lg py-3 mb-5 border border-neutral-200 rounded-md lg:hidden"
                        onClick={() => setShowFilters(!showFilters)}>
                        <GoFilter className="text-2xl mr-3" />
                        Show/Hide Search Filters
                    </Button>
                    <CoursesListFilter
                        className={classNames('lg:block', { 'hidden': showFilters })}
                        filterValues={filterValues}
                        onChange={onChangeFilter}
                        onClear={onClearFilters} />
                </div>
                <div className="w-full lg:pl-5">
                    {isLoading && <Spinner />}
                    {(!isLoading && courses) && <CoursesList courses={courses} />}
                </div>
            </section>
        </>
    );
}