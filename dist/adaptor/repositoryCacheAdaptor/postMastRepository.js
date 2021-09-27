"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMastRepositoryCacheAdaptor = void 0;
const __1 = require("../..");
class PostMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.userCache = {};
        this.postCache = {};
    }
    async addPost(input) {
        const res = await this.repository.addPost(input);
        this.addCacheEach(res.postID, res);
        return res;
    }
    async deletePost(postID) {
        const res = await this.repository.deletePost(postID);
        res.deletedAt = new Date().getTime();
        this.addCacheEach(postID, res);
        return res;
    }
    async fetchPostsByOwnerUserID(userID) {
        const cache = this.fetchPosts(userID);
        if (cache)
            return cache;
        const res = await this.repository.fetchPostsByOwnerUserID(userID);
        this.addCacheBulk(userID, res);
        return res.sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
    async fetchPostByPostID(postID) {
        const cache = this.fetchPost(postID);
        if (cache && cache === 'blanc') {
            return null;
        }
        else if (cache) {
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
    addCacheEach(postID, post) {
        this.postCache[postID] = post || 'blanc';
        if (!post)
            return;
        const userCache = this.userCache[post.ownerUserID];
        if (userCache) {
            userCache[postID] = post;
        }
    }
    addCacheBulk(userID, posts) {
        this.userCache[userID] = {};
        for (const post of posts) {
            this.addCacheEach(post.postID, post);
        }
    }
    fetchPost(postID) {
        return this.postCache[postID];
    }
    fetchPosts(userID) {
        const userCache = this.userCache[userID];
        if (!userCache)
            return null;
        return Object.keys(userCache)
            .map((key) => {
            return userCache[key];
        })
            .filter((item) => !item.deletedAt)
            .sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.PostMastRepositoryCacheAdaptor = PostMastRepositoryCacheAdaptor;
