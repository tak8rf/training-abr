import { CommentMast } from '../../type';
import { Scalars } from '../..';
import { BaseModel } from './_baseModel';
export declare class CommentModel extends BaseModel<CommentMast> {
    static getBlanc(postID: Scalars['ID'], commentUserID: Scalars['ID']): CommentMast;
    get postID(): string;
    get commentUserID(): string;
    get commentID(): string;
    get createdAt(): number;
    get comment(): string;
    set comment(input: string);
    get isRegistable(): boolean;
    /**
     * 投稿を行う
     */
    register(): Promise<void>;
}
