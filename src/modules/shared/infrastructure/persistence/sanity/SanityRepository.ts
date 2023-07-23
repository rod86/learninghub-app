import {createClient, SanityClient} from '@sanity/client';


abstract class SanityRepository {
    private readonly _client: SanityClient;
    constructor() {
        this._client = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN,
            apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
        });
    }

    protected get client(): SanityClient {
        return this._client;
    }
}

export default SanityRepository;