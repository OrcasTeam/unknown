import { Readable as ReadableStream } from 'stream';

export default abstract class FileRepository {
  abstract pathExists(path: string): Promise<boolean>;

  abstract makePath(path: string): Promise<void>;

  abstract removePath(path: string): Promise<void>;

  abstract putFile(
    path: string,
    fileName: string,
    stream: ReadableStream | Buffer | string,
    metaData?: Record<string, any>,
  ): Promise<string>;

  abstract getFile(path: string, fileName: string): Promise<ReadableStream>;
}
