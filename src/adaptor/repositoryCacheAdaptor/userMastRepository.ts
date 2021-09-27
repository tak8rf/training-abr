import { compareNumDesc, IUserMastRepository } from '../..';
import { Scalars, UserMast } from '../../entities';

type UserCache = {
    [userID: string]: UserMast | 'blanc' | undefined;
};

export class UserMastRepositoryCacheAdaptor implements IUserMastRepository {
    private userEachCache: UserCache = {};
    private userAllCache: UserCache | null = null;
    constructor(private repository: IUserMastRepository) {}

    async addUserMast(input: UserMast): Promise<UserMast> {
        const res = await this.repository.addUserMast(input);
        this.updateCacheEach(res.userID, res);
        this.myUser = res;
        return res;
    }

    async updateUserMast(input: UserMast): Promise<UserMast> {
        const res = await this.repository.updateUserMast(input);
        this.updateCacheEach(res.userID, res);
        this.myUser = res;
        return res;
    }

    async fetchMyUserMast(): Promise<UserMast | null> {
        if (this.myUser) return this.myUser;
        const res = await this.repository.fetchMyUserMast();
        this.myUser = res;
        return res;
    }

    async fetchUserMastByUserID(userID: string): Promise<UserMast | null> {
        const cache = this.fetchCacheUserMast(userID);
        if (cache && cache === 'blanc') {
            return null;
        } else if (cache) {
            return cache;
        }
        const res = await this.repository.fetchUserMastByUserID(userID);
        this.updateCacheEach(userID, res);
        return res;
    }

    async fetchAllUser(): Promise<UserMast[]> {
        const cache = this.fetchCacheUserAll();
        if (cache) return cache;
        const res = await this.repository.fetchAllUser();
        this.updateCacheBulk(res);
        return res;
    }

    // ===============================================================
    //
    // private
    //
    // ===============================================================
    private myUser: UserMast | null = null;
    private updateCacheEach(userID: Scalars['ID'], user: UserMast | null) {
        this.userEachCache[userID] = user || 'blanc';
        if (this.userAllCache && user) {
            this.userAllCache[userID] = user;
        }
    }
    private updateCacheBulk(users: UserMast[]) {
        this.userAllCache = {};
        for (const user of users) {
            this.updateCacheEach(user.userID, user);
        }
    }

    private fetchCacheUserMast(userID: Scalars['ID']) {
        return this.userEachCache[userID];
    }

    private fetchCacheUserAll() {
        if (!this.userAllCache) return null;
        return Object.keys(this.userAllCache)
            .map((key) => {
                return this.userAllCache![key]! as UserMast;
            })
            .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
}
