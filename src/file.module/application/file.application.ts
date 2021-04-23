import * as fs from "fs";
import dayjs from "dayjs";
import * as path from "path";
import makeDir from "make-dir";
import ffmpegCommand from "fluent-ffmpeg";
import { Logger } from "@/common.module/log/Logger";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PassThrough, Readable as ReadableStream } from "stream";
import FileRepository from "../repository/file.repository";
import { IUploadedFileDto } from "../dtos/uploaded-file.dto";
import { EnumRootPath } from "@/file.module/enums/root-path";

@Injectable()
export default class FileApplication {
  constructor(private logger: Logger, private fileRepository: FileRepository) {}

  async upload(input: Array<IUploadedFileDto> | IUploadedFileDto): Promise<string> {
    if (!Array.isArray(input)) {
      //  TODO: 需要严谨获取文件后缀
      const ext = path.extname(input.name);
      const bufferStream = new PassThrough();
      bufferStream.end(input.data);

      const fileName = `${ Date.now() }-${ input.md5 }`;

      await this.fileRepository.putFile(
        EnumRootPath.SOURCE,
        this.datePath() + '/' + fileName + ext,
        input.data
      );


       await makeDir(`C:/videos/${ fileName }`)

      //  TODO: 在此使用了使用IO流
      ffmpegCommand()
        .input(bufferStream)
        .seek(0)
        .videoCodec("libx264")
        .addOption("-hls_time", String(10))
        .addOption("-start_number", String(10))
        .addOption("-hls_list_size", String(0))
        .addOption("-f", "hls")
        .addOption("-f", "hls")
        .addOption("-hls_segment_filename", `C:/videos/${ fileName }/${ fileName }-%d.ts`)
        .save(`C:/videos/${ fileName }/${ fileName }.m3u8`)
        .on("end", async () => {
          const filePath = fs.readdirSync(`C:/videos/${ fileName }/`);
          const allPromise: Array<Promise<string>> = filePath.map(p => this.fileRepository.putFile(
            EnumRootPath.HLS,
            [this.datePath(), fileName, p].join('/'),
             fs.readFileSync(`C:/videos/${ fileName }/${ p }`)
          ));
          await Promise.all(allPromise);

        });

      return fileName;
    }
  }

  hlsStream(file: string): Promise<ReadableStream> {
    if (file.indexOf("-") <= 0) throw new NotFoundException("file is not find");
    //  获取当前时间path
    const date = Number(file.substr(0, file.indexOf("-")));
    const datePath = this.datePath(date);
    const connectPath = file.endsWith(".ts") ? file.substr(0, file.lastIndexOf("-")) + '/' + file : file + '/' + file + '.m3u8'

    return this.fileRepository.getFile("hls",  datePath + '/' + 'connectPath');
  }

  /**
   * 获取当前日期路径
   * @param date
   */
  datePath(date: Date | number | string = Date.now()): string {
    return dayjs(date).format("YYYY-MM-DD");
  }
}
