import TagRepositoryInterface from '@modules/courses/domain/TagRepositoryInterface';
import Tag from '@modules/courses/domain/models/Tag';
import {injectable} from 'tsyringe';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';

@injectable()
class SanityTagRepository extends SanityRepository implements TagRepositoryInterface {

    async getTags(): Promise<Tag[]> {
        const query = `*[_type=="tag"] {
            "id":_id,
            "slug":slug.current,
            name  
        }`;

        return await this.client.fetch<Tag[]>(query);
    }
}

export default SanityTagRepository;