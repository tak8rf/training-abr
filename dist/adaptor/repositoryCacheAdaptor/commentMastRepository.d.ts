import { ICommentMastRepository } from '../..';
import { CommentMast } from '../../entities';
export declare class CommentMastRepositoryCacheAdaptor implements ICommentMastRepository {
    private repository;
    private cache;
    constructor(repository: ICommentMastRepository);
    addComment(input: CommentMast): Promise<CommentMast>;
    fetchCommentsByPostID(postID: string): Promise<CommentMast[]>;
    private updateCacheEach;
    private updateCacheBulk;
    private fetchCache;
}
