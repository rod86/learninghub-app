import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';
import TagRepositoryInterface from '@modules/courses/domain/TagRepositoryInterface';
import Tag from '@modules/courses/domain/models/Tag';
import {SanityDocument} from '@sanity/client';

class SanityTagRepository extends SanityRepository implements TagRepositoryInterface {
    async getTags(): Promise<Tag[]> {
        const query = `*[_type=="tag"] {
            "id":_id,
            "slug":slug.current,
            name  
        }`;
        const result: SanityDocument<Tag[]> = await this.client.fetch(query);
        return result as Tag[];
    }
}

export default SanityTagRepository;