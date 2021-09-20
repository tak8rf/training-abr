import { PostMast, Scalars } from '../../../entity/type';
export interface IPostMastRepository {
    addPost(input: PostMast): Promise<PostMast>;
    deletePost(postID: Scalars['ID']): Promise<PostMast>;
    fetchPostsByUserID(userID: Scalars['ID']): Promise<PostMast[]>;
    fetchPostByPostID(postID: Scalars['ID']): Promise<PostMast | null>;
}
