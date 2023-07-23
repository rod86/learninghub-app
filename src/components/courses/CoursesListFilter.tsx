import {ChangeEvent} from 'react';
import TextField from '@components/common/Form/TextField';
import SelectField, {SelectFieldOption} from '@components/common/Form/SelectField';
import CheckboxFieldGroup from '@components/common/Form/CheckboxFieldGroup';
import Field from '@components/common/Form/Field';
import Button from '@components/common/Form/Button';
import {GoX} from 'react-icons/go';

// TODO move to domain
export interface CoursesFilterValues {
    search: string|null;
    tag: number|null;
    format: string[];
    duration: string[];
    level: string[];
}

interface CoursesListFilterProps {
    filterValues: CoursesFilterValues;
    className?: string;
    onChange: (filterValues: CoursesFilterValues) => void;
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
                    options={[
                        {value: 'web', label: 'Web\\Blog'},
                        {value: 'video', label: 'Video'},
                        {value: 'pdf', label: 'Pdf'},
                    ]}
                    checkedValues={filterValues.format}
                    onChange={onChangeCheckboxGroup} />
            </Field>
            <Field label="Duration" asDiv>
                <CheckboxFieldGroup
                    name="duration"
                    options={[
                        {value:'1_hour_or_less', label: '1 hour or less'},
                        {value:'1_3_hours', label: '1 - 3 hours'},
                        {value:'3_6_hours', label: '3 - 6 hours'},
                        {value:'6_hours_or_more', label: '6 hours or more'},
                    ]}
                    checkedValues={filterValues.duration}
                    onChange={onChangeCheckboxGroup} />
            </Field>
            <Field label="Level" asDiv>
                <CheckboxFieldGroup
                    name="level"
                    options={[
                        {value: 'beginner', label: 'Beginner'},
                        {value: 'intermediate', label: 'Intermediate'},
                        {value: 'advanced', label: 'Advanced'},
                    ]}
                    checkedValues={filterValues.level}
                    onChange={onChangeCheckboxGroup} />
            </Field>
        </div>
    );
};

export default CoursesListFilter;