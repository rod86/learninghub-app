import {tags} from '@lib/data';
import {ChangeEvent} from 'react';
import TextField from '@components/common/Form/TextField';
import SelectField from '@components/common/Form/SelectField';
import CheckboxFieldGroup from '@components/common/Form/CheckboxFieldGroup';
import Button from '@components/common/Form/Button';
import {GoX} from 'react-icons/go';

export interface CoursesFilterValues {
    search: string|null;
    category: string|null;
    format: string[];
    duration: string[];
    level: string[];
}

interface CoursesListFilterProps {
    filterValues: CoursesFilterValues;
    className?: string;
    onChange: (filterValues: CoursesFilterValues) => void;
    onClear: () => void;
}

const CoursesListFilter = ({ filterValues, className, onChange, onClear }: CoursesListFilterProps) => {
    const onChangeFilter = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>): void => {
        const { name, value } = e.target;
        onChange({
            ...filterValues,
            [name]: value
        });
    };

    const onChangeCheckboxGroup = (name: string, checkedValues: string[]): (e: ChangeEvent<HTMLInputElement>) => void => {
        return (e: ChangeEvent<HTMLInputElement>): void => {
            const { checked, value } = e.target;

            if (checked) {
                onChange({
                    ...filterValues,
                    [name]: [...checkedValues, value]
                });
            } else {
                onChange({
                    ...filterValues,
                    [name]: checkedValues.filter(item => item !== value)
                });
            }
        };
    };

    const tagsList = [
        { value: '', label: '-'},
        ...tags.map(({id, name}) => ({
            label: name,
            value: id
        }))
    ];

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

            <div className="w-full mb-5">
                <TextField
                    name="search"
                    placeholder="Search"
                    value={filterValues.search}
                    onChange={onChangeFilter} />
            </div>
            <div className="w-full mb-5">
                <label htmlFor="category" className="form-label">Category</label>
                <SelectField
                    name="category"
                    options={tagsList}
                    value={filterValues.category}
                    onChange={onChangeFilter} />
            </div>
            <div className="w-full mb-5">
                <div className="form-label">Format</div>
                <CheckboxFieldGroup
                    name="format"
                    options={[
                        {value: 'web', label: 'Web\\Blog'},
                        {value: 'video', label: 'Video'},
                        {value: 'pdf', label: 'Pdf'},
                    ]}
                    checkedValues={filterValues.format}
                    onChange={onChangeCheckboxGroup('format', filterValues.format)} />
            </div>
            <div className="w-full mb-5">
                <label htmlFor="duration" className="form-label">
                    Duration
                </label>
                <CheckboxFieldGroup
                    name="duration"
                    options={[
                        {value:'1_hour_or_less', label: '1 hour or less'},
                        {value:'1_3_hours', label: '1 - 3 hours'},
                        {value:'3_6_hours', label: '3 - 6 hours'},
                        {value:'6_hours_or_more', label: '6 hours or more'},
                    ]}
                    checkedValues={filterValues.duration}
                    onChange={onChangeCheckboxGroup('duration', filterValues.duration)} />
            </div>
            <div className="w-full mb-5">
                <div className="form-label">Level</div>
                <CheckboxFieldGroup
                    name="level"
                    options={[
                        {value: 'beginner', label: 'Beginner'},
                        {value: 'intermediate', label: 'Intermediate'},
                        {value: 'advanced', label: 'Advanced'},
                    ]}
                    checkedValues={filterValues.level}
                    onChange={onChangeCheckboxGroup('level', filterValues.level)} />
            </div>
        </div>
    );
};

export default CoursesListFilter;