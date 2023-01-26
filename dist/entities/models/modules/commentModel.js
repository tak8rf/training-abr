"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const __1 = require("../../..");
const _baseModel_1 = require("./_baseModel");
class CommentModel extends _baseModel_1.BaseModel {
    static getBlanc(postID, commentUserID) {
        return {
            postID,
            commentUserID,
            commentID: __1.generateUUID(),
            createdAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get postID() {
        return this.mast.postID;
    }
    get commentUserID() {
        return this.mast.commentUserID;
    }
    get commentID() {
        return this.mast.commentID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    // ============================================
    // getter / setter
    // ============================================
    get comment() {
        return this.mast.comment || '';
    }
    set comment(input) {
        if (input) {
            this.mast.comment = input;
        }
        else {
            this.mast.comment = null;
        }
    }
    // ============================================
    // validation
    // ============================================
    get isRegistable() {
        return !!this.comment;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * 投稿を行う
     */
    async register() {
        if (this.isRegistable) {
            this.mast.createdAt = new Date().getTime();
            this.mast = await this.repositoryContainer.commentMastRepository.addComment(this.mast);
        }
    }
}
exports.CommentModel = CommentModel;
