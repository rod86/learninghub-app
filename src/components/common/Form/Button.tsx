import { MouseEvent, PropsWithChildren } from 'react';

interface ButtonProps {
    type?: 'button' | 'submit';
    name: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    className?: string;
}

const Button = ({ type = 'button', name, onClick, className = '', children}: PropsWithChildren<ButtonProps>) => {
    return (
        <button type={type} name={name} id={name} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;