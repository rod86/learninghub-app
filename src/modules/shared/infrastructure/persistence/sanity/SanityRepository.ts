import {SanityClient} from '@sanity/client';

abstract class SanityRepository {
    constructor(
        private readonly _client: SanityClient
    ) {}

    protected get client(): SanityClient {
        return this._client;
    }
}

export default SanityRepository;