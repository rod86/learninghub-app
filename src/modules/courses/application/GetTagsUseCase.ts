import Tag from '@modules/courses/domain/models/Tag';
import {UseCase} from '@modules/shared/domain/UseCase';
import type TagRepositoryInterface from '@modules/courses/domain/TagRepositoryInterface';
import {inject, injectable} from 'tsyringe';

interface GetTagsUseCaseResponse {
    tags: Tag[];
}

@injectable()
class GetTagsUseCase implements UseCase<void, Promise<GetTagsUseCaseResponse>> {

    constructor(
        @inject('TagRepositoryInterface') private readonly tagRepository: TagRepositoryInterface
    ) {}

    async handle(): Promise<GetTagsUseCaseResponse> {
        const tags = await this.tagRepository.getTags();
        return { tags };
    }
}

export default GetTagsUseCase;