import { UserModel } from '..';
import { CommentMast } from '../../type';
import { BaseModel } from './_baseModel';

export class CommentModel extends BaseModel<CommentMast> {
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
        return this.mast.comment || ''
    }
    set comment(input: string) {
        if (input) {
            this.mast.comment = input;
        } else {
            this.mast.comment = null;
        }
    }
    // ============================================
    // validation
    // ============================================
    get isRegistable() {
        return !!this.comment
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
