import {Course} from '@lib/models/Course';
import CoursesList from '@components/courses/CoursesList';
import CoursesListFilter from '@components/courses/CoursesListFilter';
import {useState, useEffect, useRef} from 'react';
import Spinner from '@components/common/Spinner';
import Button from '@components/common/Form/Button';
import {GoFilter} from 'react-icons/go';
import classNames from 'classnames';
import {GetStaticProps} from 'next';
import {CoursesFilterValues, fetchCourses, fetchTags} from '@lib/fakeApi';
import {SelectFieldOption} from '@components/common/Form/SelectField';

const initialFilterValues = {
    search: null,
    tag: null,
    format: [],
    duration: [],
    level: []
};

interface CoursesPageProps {
    courses: Course[];
    tagsOptions: SelectFieldOption[];
}

export const getStaticProps: GetStaticProps<CoursesPageProps> = async () => {
    const courses = await fetchCourses();
    const tagsOptions = (await fetchTags()).map(elem => ({value: elem.id, label: elem.name}));

    return { props: {
        courses,
        tagsOptions
    }};
};

const CoursesPage = ({ courses, tagsOptions }: CoursesPageProps) => {
    const initialRender = useRef(true);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
    const [filterValues, setFilterValues] = useState<CoursesFilterValues>(initialFilterValues);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const onChangeFilter = (values: CoursesFilterValues): void => {
        initialRender.current = false;
        setFilterValues(values);
    };

    useEffect(() => {
        if (initialRender.current) {
            return;
        }

        const loadCourses = setTimeout(() => {
            setIsLoading(true);
            fetchCourses(filterValues)
                .then(result => setFilteredCourses(result))
                .finally(() => setIsLoading(false));
        }, 500);

        return () => clearTimeout(loadCourses);
    }, [filterValues]);

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
                        className={classNames('lg:block', { 'hidden': !showFilters })}
                        tagsOptions={tagsOptions}
                        filterValues={filterValues}
                        onChange={onChangeFilter}
                        onClear={() => onChangeFilter(initialFilterValues)} />
                </div>
                <div className="w-full lg:pl-5">
                    {isLoading && <Spinner />}
                    {(!isLoading && !filteredCourses.length ) && (
                        <div className="w-full text-center text-4xl text-slate-400 font-thin">No results found</div>
                    )}
                    {(!isLoading && filteredCourses) && <CoursesList courses={filteredCourses} />}
                </div>
            </section>
        </>
    );
};

export default CoursesPage;