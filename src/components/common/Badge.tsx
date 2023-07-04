import classNames from 'classnames';
import React from 'react';

interface BadgeProps {

    text: string
    color?: string;
    Icon?: React.ElementType|null;
    isLarge?: boolean;
}

const Badge = ({text, color = '', Icon = null, isLarge = false}: BadgeProps) => {
    const styles = classNames(
        `badge badge-${color}`,
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