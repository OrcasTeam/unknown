import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { IUploadedFileDto } from '../dtos/uploaded-file.dto';
import FileRepository from '../repository/file.repository';
import * as path from 'path';
import { Readable as ReadableStream } from 'stream';

@Injectable()
export default class FileApplication {
  constructor(private fileRepository: FileRepository) {}

  upload(input: Array<IUploadedFileDto> | IUploadedFileDto) {
    console.log('IUploadedFileDto', input);
    const p = this.path();
    if (!Array.isArray(input)) {
      //  TODO: 需要严谨获取文件后缀
      const ext = path.extname(input.name);
      return this.fileRepository.putFile(p, input.md5 + ext, input.data);
    }
  }

  fileStream(fileName: string): Promise<ReadableStream> {
    return this.fileRepository.getFile(this.path(), fileName);
  }

  path(): string {
    return dayjs(Date.now()).format('YYYY-MM-DD');
  }
}
