import * as config from 'config';
import { Client, ItemBucketMetadata } from 'minio';
import { Readable as ReadableStream } from 'stream';
import { NotFoundException } from '@nestjs/common';
import MinioConfig from './config';
import FileRepository from '../file.repository';

export default class MinioRepository extends FileRepository {
  private readonly _minioClient: Client;
  private readonly _minioConfig: MinioConfig;

  constructor() {
    super();
    this._minioConfig = config.get<MinioConfig>('minio');
    this._minioClient = new Client({
      endPoint: this._minioConfig.host,
      port: this._minioConfig.port,
      useSSL: this._minioConfig.useSSL,
      accessKey: this._minioConfig.accessKey,
      secretKey: this._minioConfig.secretKey,
    });
  }

  async pathExists(bucketName: string): Promise<boolean> {
    return this._minioClient.bucketExists(bucketName);
  }

  /**
   * 创建 bucket
   * 当 bucket已存在时,不会再创建,
   * @param bucketName bucket 名称
   * @param region
   */
  async makePath(bucketName: string, region?: string): Promise<void> {
    if (await this.pathExists(bucketName)) return;
    return this._minioClient.makeBucket(
      bucketName,
      region || this._minioConfig.bucketRegion,
    );
  }

  /***
   * 删除指定 bucket
   * 当bucket不存在时,抛出 NotFoundException 异常
   * @param bucketName bucket名称
   */
  async removePath(bucketName: string) {
    if (!(await this.pathExists(bucketName)))
      throw new NotFoundException(`not find ${bucketName} bucket`);
    await this._minioClient.removeBucket(bucketName);
  }

  async putFile(
    bucketName: string,
    objectName: string,
    stream: ReadableStream | Buffer | string,
    metaData?: ItemBucketMetadata,
  ): Promise<string> {
    await this.makePath(bucketName);
    return this._minioClient.putObject(
      bucketName,
      objectName,
      stream,
      metaData,
    );
  }

  async fPutObject(
    bucketName: string,
    objectName: string,
    filePath: string,
    metaData: ItemBucketMetadata,
  ): Promise<string> {
    await this.makePath(bucketName);
    return this._minioClient.fPutObject(
      bucketName,
      objectName,
      filePath,
      metaData,
    );
  }

  getFile(bucketName: string, objectName: string): Promise<ReadableStream> {
    return this._minioClient.getObject(bucketName, objectName);
  }

  getPartialObject(
    bucketName: string,
    objectName: string,
    offset: number,
    length?: number,
  ): Promise<ReadableStream> {
    return this._minioClient.getPartialObject(
      bucketName,
      objectName,
      offset,
      length,
    );
  }
}
