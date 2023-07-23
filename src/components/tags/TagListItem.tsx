import Link from 'next/link';
import Tag from '@modules/courses/domain/models/Tag';

interface TagListItemProps {
    tag: Tag
}

const TagListItem = ({tag}: TagListItemProps) => {
    return (
        <Link
            href={{
                pathname: '/courses',
                query: { category: tag.id }
            }}
            className="p-4 pl-8 rounded-r-md border-l-4 border-neutral-500 shadow-md bg-neutral-50 text-slate-500 font-thin hover:border-emerald-500 hover:text-emerald-500 transition-all duration-300">
            {tag.name}
        </Link>
    );
};

export default TagListItem;