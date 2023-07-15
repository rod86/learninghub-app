import { PropsWithChildren} from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type ButtonSize = 'sm' | 'normal' | 'lg';
interface LinkButtonProps {
    url: string;
    outlined?: boolean;
    size?: ButtonSize;
}

const LinkButton = ({ children, url, size = 'normal', outlined = false }: PropsWithChildren<LinkButtonProps>) => {
    const btnClass = classNames('button', {
        'button-outlined': outlined,
        [`button-${size}`]: size !== 'normal',
    });

    return (
        <Link
            href={url}
            className={btnClass}>
            {children}
        </Link>
    );
};

export default LinkButton;