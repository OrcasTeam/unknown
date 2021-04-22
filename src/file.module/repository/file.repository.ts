import { Readable as ReadableStream } from 'stream';

export default abstract class FileRepository {
  abstract rootExists(root: string): Promise<boolean>;

  abstract makeRoot(root: string): Promise<void>;

  abstract removeRoot(root: string): Promise<void>;

  abstract putFile(
    path: string,
    fileName: string,
    stream: ReadableStream | Buffer | string,
    metaData?: Record<string, any>,
  ): Promise<string>;

  abstract getFile(root: string, fileName: string): Promise<ReadableStream>;
}
