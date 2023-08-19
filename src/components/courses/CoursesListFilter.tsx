import {ChangeEvent} from 'react';
import TextField from '@components/common/Form/TextField';
import SelectField, {SelectFieldOption} from '@components/common/Form/SelectField';
import CheckboxFieldGroup from '@components/common/Form/CheckboxFieldGroup';
import Field from '@components/common/Form/Field';
import Button from '@components/common/Form/Button';
import {GoX} from 'react-icons/go';
import { Courses, COURSE_DURATION_OPTIONS, COURSE_FORMAT_OPTIONS, COURSE_LEVEL_OPTIONS } from '@helpers/courses';

interface CoursesListFilterProps {
    filterValues: Courses;
    className?: string;
    onChange: (filterValues: Courses) => void;
    onClear: () => void;
    tagsOptions: SelectFieldOption[]
}

const CoursesListFilter = ({ filterValues, className, tagsOptions, onChange, onClear }: CoursesListFilterProps) => {
    const onChangeFilter = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>): void => {
        const { name, value } = e.target;
        onChange({
            ...filterValues,
            [name]: value
        });
    };

    const onChangeCheckboxGroup = (name: string, checkedValues: string[]): void => {
        onChange({
            ...filterValues,
            [name]: checkedValues
        });
    };

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl uppercase font-light mb-0">Search</h2>
                <Button
                    name="clear-filters"
                    className="flex items-center px-2 py-1 font-light text-lg border rounded-md border-transparent hover:border-neutral-200"
                    onClick={onClear}>
                    <GoX className="text-xl mr-1" /> Clear All
                </Button>
            </div>
            <Field>
                <TextField
                    name="search"
                    placeholder="Search"
                    value={filterValues.search}
                    onChange={onChangeFilter} />
            </Field>
            <Field label="Category" htmlFor="category">
                <SelectField
                    name="tag"
                    options={[{ value: '', label: '-'}, ...tagsOptions]}
                    value={filterValues.tag}
                    onChange={onChangeFilter} />
            </Field>
            <Field label="Format" asDiv>
                <CheckboxFieldGroup
                    name="format"
                    options={COURSE_FORMAT_OPTIONS}
                    checkedValues={filterValues.format}
                    onChange={onChangeCheckboxGroup} />
            </Field>
            <Field label="Duration" asDiv>
                <CheckboxFieldGroup
                    name="duration"
                    options={COURSE_DURATION_OPTIONS}
                    checkedValues={filterValues.duration}
                    onChange={onChangeCheckboxGroup} />
            </Field>
            <Field label="Level" asDiv>
                <CheckboxFieldGroup
                    name="level"
                    options={COURSE_LEVEL_OPTIONS}
                    checkedValues={filterValues.level}
                    onChange={onChangeCheckboxGroup} />
            </Field>
        </div>
    );
};

export default CoursesListFilter;