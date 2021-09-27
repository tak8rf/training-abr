import { IPostMastRepository } from '../..';
import { PostMast } from '../../entities';
export declare class PostMastRepositoryCacheAdaptor implements IPostMastRepository {
    private repository;
    private userCache;
    private postCache;
    constructor(repository: IPostMastRepository);
    addPost(input: PostMast): Promise<PostMast>;
    deletePost(postID: string): Promise<PostMast>;
    fetchPostsByOwnerUserID(userID: string): Promise<PostMast[]>;
    fetchPostByPostID(postID: string): Promise<PostMast | null>;
    private addCacheEach;
    private addCacheBulk;
    private fetchPost;
    private fetchPosts;
}
