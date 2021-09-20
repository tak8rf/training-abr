export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    AWSDate: string;
    AWSDateTime: string;
    AWSEmail: string;
    AWSIPAddress: string;
    AWSJSON: string;
    AWSPhone: string;
    AWSTime: string;
    AWSTimestamp: number;
    AWSURL: string;
};
export declare type PostMast = {
    image: S3Object;
    postID: Scalars['ID'];
    userID: Scalars['ID'];
};
export declare type S3Object = {
    url: Scalars['AWSURL'];
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
};
export declare type S3ObjectInput = {
    url: Scalars['AWSURL'];
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
};
export declare type UserMast = {
    userID: Scalars['ID'];
    name: Scalars['String'];
    email: Scalars['String'];
    userIcon: S3Object;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type UserMastInput = {
    userID: Scalars['ID'];
    name: Scalars['String'];
    email: Scalars['String'];
    userIcon: S3Object;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
};
