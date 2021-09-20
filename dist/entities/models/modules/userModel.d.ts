import { PostModel } from '..';
import { UserMast } from '../../../entity/type';
import { BaseModel } from './_baseModel';
export declare class UserModel extends BaseModel<UserMast> {
    get userID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get name(): string;
    set name(input: string);
    get email(): string;
    set email(input: string);
    get isRegisterble(): boolean;
    /**
     * アイコン画像をセットする
     * @param file
     */
    setIcon(file: File): Promise<void>;
    /**
     * ユーザー情報を新規登録、または更新する
     */
    register(): Promise<void>;
    /**
     * このユーザーの投稿を取得する
     * @returns
     */
    fetchMyPosts(): Promise<PostModel[]>;
}
