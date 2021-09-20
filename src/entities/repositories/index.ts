import { IPostMastRepository } from './modules/postMastRepository';
import { IS3Repository } from './modules/S3Repository';
import { IUserMastRepository } from './modules/userMastRepository';

export * from './modules/S3Repository';
export * from './modules/postMastRepository';
export * from './modules/userMastRepository';

export class RepositoryContainer {
    constructor(
        public s3Repository: IS3Repository, //
        public postMastRepository: IPostMastRepository,
        public userMastRepository: IUserMastRepository,
    ) {}
}
