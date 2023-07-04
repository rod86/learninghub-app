import {ChangeEvent} from 'react';

interface TextFieldProps {
    type?: 'text' | 'number' | 'email' | 'password';
    name: string;
    value?: string|null;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ type, name, value, placeholder, onChange}: TextFieldProps) => {
    return (
        <input
            type={type || 'text'}
            name={name}
            id={name}
            placeholder={placeholder || ''}
            value={value || ''}
            className="form-input w-full"
            onChange={onChange} />
    );
};

export default TextField;