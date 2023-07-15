import classNames from 'classnames';
import React from 'react';

interface BadgeProps {

    text: string
    color?: string;
    Icon?: React.ElementType|null;
    isLarge?: boolean;
    className?: string|null;
}

const Badge = ({text, color = '', Icon = null, isLarge = false, className = null}: BadgeProps) => {
    const styles = classNames(
        `badge badge-${color} ${className}`,
        {
            'badge-lg': isLarge
        }
    );

    return (
        <div className={styles}>
            {Icon && <Icon className='badge-icon' />}
            {text}
        </div>
    );
};

export default Badge;