import {ChangeEvent} from 'react';

type SelectFieldOption = {
    label: string|number;
    value: string|number;
};

interface SelectFieldProps {
    name: string;
    options: SelectFieldOption[];
    value?: string|number|null;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({name, options = [], value, onChange}: SelectFieldProps) => {
    return (
        <select
            id={name}
            name={name}
            className="form-select w-full"
            onChange={onChange}
            value={value || ''}>
            {options.map(({ label, value }) =>(
                <option key={value} value={value}>{label}</option>
            ))}
        </select>
    );
};

export default SelectField;