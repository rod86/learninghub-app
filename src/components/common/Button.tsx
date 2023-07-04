import Link from 'next/link';
import classNames from 'classnames';

type ButtonSize = 'sm' | 'normal' | 'lg';
interface ButtonProps {
    text: string;
    url: string;
    outlined?: boolean;
    size?: ButtonSize;
}

const Button = ({ text, url, size = 'normal', outlined = false }: ButtonProps) => {
    const btnClass = classNames('button', {
        'button-outlined': outlined,
        [`button-${size}`]: size !== 'normal',
    });

    return (
        <Link
            href={url}
            className={btnClass}>
            {text}
        </Link>
    );
};

export default Button;