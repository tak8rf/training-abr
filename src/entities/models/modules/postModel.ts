import { UserModel } from '..';
import { ChillnnTrainingError, ErrorCode } from '../../../'
import { CommentModel } from '..';
import { S3Object, Scalars } from '../..';
import { generateUUID } from '../../..';
import { PostMast } from '../../type';
import { BaseModel } from './_baseModel';

export class PostModel extends BaseModel<PostMast> {
    static getBlanc(ownerUserID: Scalars['ID'], image: S3Object): PostMast {
        return {
            postID: generateUUID(),
            ownerUserID,
            image,
            createdAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get postID() {
        return this.mast.postID;
    }
    get ownerUserID() {
        return this.mast.ownerUserID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get imageURL() {
        return this.mast.image.url || null;
    }
    // ============================================
    // getter / setter
    // ============================================
	get description() {
        return this.mast.description || ''
    }
    set description(input: string) {
        if (input) {
            this.mast.description = input;
        } else {
            this.mast.description = null;
        }
    }
    // ============================================
    // validation
    // ============================================
    get isRegistable() {
        return !!this.imageURL && this.isNew;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * 画像の登録
     * @param file
     */
    async setImage(file: File) {
        const path = `user/${this.ownerUserID}/post/${this.postID}`;
        console.log(path)
        this.mast.image = await this.repositoryContainer.s3Repository.addFile(path, file);
        console.log(this.mast.image)
    }

    /**
     * 投稿を行う
     */
    async register() {
        if (this.isRegistable) {
            this.mast.createdAt = new Date().getTime();
            this.mast = await this.repositoryContainer.postMastRepository.addPost(this.mast);
        }
    }

    /**
     * この投稿のコメントを取得する
     * @return
     */
    async fetchPostComments(): Promise<CommentModel[]> {
        const res = await this.repositoryContainer.commentMastRepository.fetchCommentsByPostID(this.postID);
        return res.map((item) => this.modelFactory.commentModel(item));
    }

    // createNewComment(): CommentModel {
    //     return this.modelFactory.commentModel(CommentModel.getBlanc(this.postID, this.repositoryContainer.userMastRepository.fetchMyUserMast()));
    // }
    async createNewComment(): Promise<CommentModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.commentModel(CommentModel.getBlanc(this.postID, me.userID));
    }
}
