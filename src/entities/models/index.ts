import { CommentMast, PostMast, UserMast } from '../type';
import { RepositoryContainer } from '../repositories';
import { CommentModel } from './modules/commentModel';
import { PostModel } from './modules/postModel';
import { UserModel } from './modules/userModel';
import { BaseModel, ModelOption } from './modules/_baseModel';

export * from './modules/commentModel';
export * from './modules/postModel';
export * from './modules/userModel';

export class ModelFactory {
    constructor(
        private repositoryContainer: RepositoryContainer, //
    ) {}

    public commentModel(mast: CommentMast, option?: ModelOption) {
        return new CommentModel(
            mast, //
            this.repositoryContainer,
            this,
            option || BaseModel.baseModelOption(),
        );
    }

    public PostModel(mast: PostMast, option?: ModelOption) {
        return new PostModel(
            mast, //
            this.repositoryContainer,
            this,
            option || BaseModel.baseModelOption(),
        );
    }

    public UserModel(mast: UserMast, option?: ModelOption) {
        return new UserModel(
            mast, //
            this.repositoryContainer,
            this,
            option || BaseModel.baseModelOption(),
        );
    }
}
