import { PostMast, Scalars } from '../../type';

export interface IPostMastRepository {
    addPost(input: PostMast): Promise<PostMast>;
    deletePost(postID: Scalars['ID']): Promise<PostMast>;
    fetchPostsByOwnerUserID(userID: Scalars['ID']): Promise<PostMast[]>;
    fetchPostByPostID(postID: Scalars['ID']): Promise<PostMast | null>;
}
