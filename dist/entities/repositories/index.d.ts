import { ICommentMastRepository } from './modules/commentMastRepository';
import { IPostMastRepository } from './modules/postMastRepository';
import { IS3Repository } from './modules/S3Repository';
import { IUserMastRepository } from './modules/userMastRepository';
export * from './modules/S3Repository';
export * from './modules/commentMastRepository';
export * from './modules/postMastRepository';
export * from './modules/userMastRepository';
export declare class RepositoryContainer {
    s3Repository: IS3Repository;
    commentMastRepository: ICommentMastRepository;
    postMastRepository: IPostMastRepository;
    userMastRepository: IUserMastRepository;
    constructor(s3Repository: IS3Repository, //
    commentMastRepository: ICommentMastRepository, postMastRepository: IPostMastRepository, userMastRepository: IUserMastRepository);
}
