import { ModelFactory, RepositoryContainer, Scalars } from '../..';
export declare class UserUsecase {
    private repositoryContainer;
    private modelFactory;
    constructor(repositoryContainer: RepositoryContainer, //
    modelFactory: ModelFactory);
    fetchMyUserModel(): Promise<import("../..").UserModel>;
    fetchUserModelByUserID(userID: Scalars['ID']): Promise<import("../..").UserModel>;
}
