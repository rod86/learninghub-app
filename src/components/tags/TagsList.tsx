import Tag from '@modules/courses/domain/models/Tag';
import TagListItem from '@components/tags/TagListItem';

interface TagListProps {
    tags: Tag[]
}

const TagsList = ({ tags }: TagListProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {tags.map(tag => (
                <TagListItem tag={tag} key={tag.id} />
            ))}
        </div>
    );
};

export default TagsList;