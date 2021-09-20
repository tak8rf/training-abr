import { S3Object } from '../../../entity/type';
export interface IS3Repository {
    fetchObject<T>(s3Object: S3Object): Promise<T>;
    addFile(uniquePath: string, file: File): Promise<S3Object>;
}
