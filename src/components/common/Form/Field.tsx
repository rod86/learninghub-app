import { PropsWithChildren } from 'react';

interface FieldProps {
    label?: string;

    asDiv?: boolean;
    htmlFor?: string;
}

const Field = ({ children, label, htmlFor, asDiv = false }: PropsWithChildren<FieldProps>) => {
    return (
        <div className="w-full mb-5">
            {(label && !asDiv) && <label htmlFor={htmlFor} className="form-label">{label}</label>}
            {(label && asDiv) && <div className="form-label">{label}</div>}
            {children}
        </div>
    );
};

export default Field;