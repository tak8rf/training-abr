import { CommentMast } from '../../type';
import { BaseModel } from './_baseModel';
export declare class CommentModel extends BaseModel<CommentMast> {
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
