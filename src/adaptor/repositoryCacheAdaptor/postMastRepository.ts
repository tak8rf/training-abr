import { compareNumDesc, IPostMastRepository } from '../..';
import { PostMast, Scalars } from '../../entities';

type UserCache = {
    [userID: string]:
        | {
              [postID: string]: PostMast;
          }
        | undefined;
};
type PostCache = {
    [postID: string]: PostMast | 'blanc' | undefined;
};

export class PostMastRepositoryCacheAdaptor implements IPostMastRepository {
    private userCache: UserCache = {};
    private postCache: PostCache = {};

    constructor(private repository: IPostMastRepository) {}

    async addPost(input: PostMast): Promise<PostMast> {
        const res = await this.repository.addPost(input);
        this.addCacheEach(res.postID, res);
        return res;
    }

    async deletePost(postID: string): Promise<PostMast> {
        const res = await this.repository.deletePost(postID);
        res.deletedAt = new Date().getTime();
        this.addCacheEach(postID, res);
        return res;
    }

    async fetchPostsByOwnerUserID(userID: string): Promise<PostMast[]> {
        const cache = this.fetchPosts(userID);
        if (cache) return cache;
        const res = await this.repository.fetchPostsByOwnerUserID(userID);
        this.addCacheBulk(userID, res);
        return res.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    async fetchPostByPostID(postID: string): Promise<PostMast | null> {
        const cache = this.fetchPost(postID);
        if (cache && cache === 'blanc') {
            return null;
        } else if (cache) {
            return cache;
        }
        const res = await this.repository.fetchPostByPostID(postID);
        this.addCacheEach(postID, res);
        return res;
    }

    // ===============================================================
    //
    // private
    //
    // ===============================================================

    private addCacheEach(postID: Scalars['ID'], post: PostMast | null) {
        this.postCache[postID] = post || 'blanc';
        if (!post) return;
        const userCache = this.userCache[post.ownerUserID];
        if (userCache) {
            userCache[postID] = post;
        }
    }

    private addCacheBulk(userID: Scalars['ID'], posts: PostMast[]) {
        this.userCache[userID] = {};
        for (const post of posts) {
            this.addCacheEach(post.postID, post);
        }
    }

    private fetchPost(postID: Scalars['ID']) {
        return this.postCache[postID];
    }

    private fetchPosts(userID: Scalars['ID']) {
        const userCache = this.userCache[userID];
        if (!userCache) return null;
        return Object.keys(userCache)
            .map((key) => {
                return userCache[key];
            })
            .filter((item) => !item.deletedAt)
            .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
}
