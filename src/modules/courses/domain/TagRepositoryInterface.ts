import Tag from '@modules/courses/domain/models/Tag';

interface TagRepositoryInterface {
    getTags: () => Promise<Tag[]>;
}

export default TagRepositoryInterface;