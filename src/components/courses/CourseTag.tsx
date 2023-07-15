import classNames from 'classnames';

interface CourseTagProps {
    label: string;
    isLarge?: boolean;
}
const CourseTag = ({ label, isLarge = false }: CourseTagProps) => {
    const styles = classNames(
        'text-emerald-500 font-thin rounded border border-emerald-500',
        isLarge ? 'px-2.5 pt-0.5 pb-1' : 'text-xs px-1.5 py-0.5'
    );
    return (
        <span
            className={styles}>
            {label}
        </span>
    );
};

export default CourseTag;