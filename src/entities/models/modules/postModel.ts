import { PostMast } from '../../type';
import { BaseModel } from './_baseModel';

export class PostModel extends BaseModel<PostMast> {
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
        const path = `user/${this.ownerUserID}/post/${this.postID}/${new Date().getTime()}.${file.name}`;
        this.mast.image = await this.repositoryContainer.s3Repository.addFile(path, file);
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
}
