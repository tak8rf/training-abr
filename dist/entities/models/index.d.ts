import { CommentMast, PostMast, UserMast } from '../type';
import { RepositoryContainer } from '../repositories';
import { CommentModel } from './modules/commentModel';
import { PostModel } from './modules/postModel';
import { UserModel } from './modules/userModel';
import { ModelOption } from './modules/_baseModel';
export * from './modules/commentModel';
export * from './modules/postModel';
export * from './modules/userModel';
export declare class ModelFactory {
    private repositoryContainer;
    constructor(repositoryContainer: RepositoryContainer);
    commentModel(mast: CommentMast, option?: ModelOption): CommentModel;
    PostModel(mast: PostMast, option?: ModelOption): PostModel;
    UserModel(mast: UserMast, option?: ModelOption): UserModel;
}
