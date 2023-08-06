import TagRepositoryInterface from '@modules/courses/domain/TagRepositoryInterface';
import Tag from '@modules/courses/domain/models/Tag';
import {inject, injectable} from 'tsyringe';
import SanityRepository from '@modules/shared/infrastructure/persistence/sanity/SanityRepository';

@injectable()
class SanityTagRepository implements TagRepositoryInterface {

    constructor(
        @inject('SanityRepository') private readonly repository: SanityRepository
    ) {}

    async getTags(): Promise<Tag[]> {
        const query = `*[_type=="tag"] {
            "id":_id,
            "slug":slug.current,
            name  
        }`;

        return this.repository.fetch<Tag>(query);
    }
}

export default SanityTagRepository;