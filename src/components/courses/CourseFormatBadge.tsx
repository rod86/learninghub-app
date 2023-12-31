import React from 'react';
import {GoDeviceCameraVideo, GoLink, GoFile} from 'react-icons/go';
import Badge from '@components/common/Badge';
import {CourseFormat} from '@modules/courses/domain/models/Course';

type CourseFormatInfo = {
    [key in CourseFormat]: { label: string, color: string, icon: React.ElementType }
};

const FORMATS: CourseFormatInfo = {
    video: {
        label: 'Video',
        color: 'red',
        icon: GoDeviceCameraVideo
    },
    web: {
        label: 'Web',
        color: 'sky',
        icon: GoLink
    },
    pdf: {
        label: 'PDF',
        color: 'violet',
        icon: GoFile
    },
};

interface CourseFormatBadgeProps {
    format: CourseFormat;
    isLarge?: boolean
    className?: string|null
}

const CourseFormatBadge = ({ format, isLarge = false, className = null }: CourseFormatBadgeProps) => {
    const { label, color, icon } = FORMATS[format];

    return (
        <Badge
            text={label}
            color={color}
            isLarge={isLarge}
            Icon={icon}
            className={className} />
    );
};

export default CourseFormatBadge;