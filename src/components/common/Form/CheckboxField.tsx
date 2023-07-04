import {ChangeEvent} from 'react';

interface CheckboxFieldProps {
    name: string;

    value: string|number;

    checked?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField = ({name, value, checked = false, onChange}: CheckboxFieldProps) => {
    return (
        <input
            type="checkbox"
            className="form-checkbox mr-4"
            name={name}
            id={name}
            value={value}
            checked={checked}
            onChange={onChange} />
    );
};

export default CheckboxField;