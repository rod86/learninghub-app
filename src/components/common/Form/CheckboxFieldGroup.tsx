import {ChangeEvent} from 'react';
import CheckboxField from '@components/common/Form/CheckboxField';

interface CheckboxFieldGroupItem {
    value: string;
    label: string;
}

interface CheckboxFieldGroupProps {
    name: string;
    options: CheckboxFieldGroupItem[];

    checkedValues?: string[]
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxFieldGroup = ({name, options, onChange, checkedValues = []}: CheckboxFieldGroupProps) => {
    return (
        <div className="flex-row space-y-2.5">
            {options.map(({label, value}) => {
                return (
                    <div className="flex items-center" key={value}>
                        <CheckboxField
                            name={name}
                            value={value}
                            checked={checkedValues && checkedValues.includes(value)}
                            onChange={onChange} />
                        <label htmlFor={value} className="form-label mb-0 font-light">{label}</label>
                    </div>
                );
            })}
        </div>
    );
};

export default CheckboxFieldGroup;