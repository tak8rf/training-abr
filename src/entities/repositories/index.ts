import { IPostMastRepository } from './modules/postMastRepository';
import { IS3Repository } from './modules/S3Repository';
import { IUserMastRepository } from './modules/userMastRepository';

export * from './modules/S3Repository';
export * from './modules/postMastRepository';
export * from './modules/userMastRepository';

export class RepositoryContainer {
    constructor(
        // object
        public s3Repository: IS3Repository, //
        // entity
        public postMastRepository: IPostMastRepository,
        public userMastRepository: IUserMastRepository,
    ) {}
}
