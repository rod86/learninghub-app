import Tag from '@modules/courses/domain/models/Tag';
import {UseCase} from '@modules/shared/domain/UseCase';
import TagRepositoryInterface from '@modules/courses/domain/TagRepositoryInterface';
import SanityTagRepository from '@modules/courses/infrastructure/persistence/sanity/SanityTagRepository';

interface GetTagsUseCaseResponse {
    tags: Tag[];
}

class GetTagsUseCase implements UseCase<void, Promise<GetTagsUseCaseResponse>> {
    private readonly tagRepository: TagRepositoryInterface;

    constructor() {
        this.tagRepository = new SanityTagRepository();
    }

    async handle(): Promise<GetTagsUseCaseResponse> {
        const tags = await this.tagRepository.getTags();
        return { tags };
    }
}

export default GetTagsUseCase;