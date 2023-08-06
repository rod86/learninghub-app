import {SanityClient, SanityDocument} from '@sanity/client';
import {Any} from '@sanity/client/src/types';

type ModelDocument = Record<string, Any>;

class SanityRepository {
    constructor(
        private readonly client: SanityClient
    ) {}

    public async fetch<T extends ModelDocument = ModelDocument>(query: string): Promise<T[]> {
        const result: SanityDocument<T>[] = await this.client.fetch(query);
        return result as T[];
    }

    public async fetchOne<T extends ModelDocument = ModelDocument>(query: string): Promise<T|null> {
        const result = await this.fetch<T>(query);
        return result.shift() as T || null;
    }
}

export default SanityRepository;