import * as fs from "fs";
import dayjs from "dayjs";
import * as path from "path";
import { Injectable, NotFoundException } from "@nestjs/common";
import ffmpegCommand from "fluent-ffmpeg";
import { PassThrough, Readable as ReadableStream, Stream } from "stream";
import FileRepository from "../repository/file.repository";
import { IUploadedFileDto } from "../dtos/uploaded-file.dto";
import { Logger } from "@/common.module/log/Logger";

@Injectable()
export default class FileApplication {
  constructor(private logger: Logger,  private fileRepository: FileRepository) {}

  async upload(input: Array<IUploadedFileDto> | IUploadedFileDto): Promise<string> {
    if (!Array.isArray(input)) {
      //  TODO: 需要严谨获取文件后缀
      const ext = path.extname(input.name);

      // const data = ffmpeg({
      //   MEMFS: [{ name: input.name, data: input.data }],
      //   //ffmpeg -re -i g:/media/baifa.mp4 -codec copy -f hls -hls_list_size 4 -hls_wrap 20 -hls_time 15
      // g:/media/demo/index.m3u8 arguments: [ '-i', input.name, '-c:v libx264', '-f hls', '-an', 'test.m3u8', ],
      // onExit: function (data) { console.log('错误---------------', data); }, });

      const bufferStream = new PassThrough();
      bufferStream.end(input.data);

      if (!fs.existsSync("C:/videos")) {
        fs.mkdirSync("C:/videos");
      }

      const fileName = Date.now() + "-" + input.md5;

      await this.fileRepository.putFile(
        "source",
        this.datePath() + fileName + ext,
        input.data
      );

      if (!fs.existsSync(`C:/videos/${ fileName }`)) {
        fs.mkdirSync(`C:/videos/${ fileName }`);
      }

      ffmpegCommand(bufferStream)
        .addOption("-hls_time", "10") //设置每个片段的长度
        .save(`C:/videos/${ fileName }/playlist.m3u8`)
        .on("end", async () => {
          const filePath = fs.readdirSync(`C:/videos/${ fileName }/`);
          for (const p of filePath) {
            await this.fileRepository.putFile(
              "hls",
              this.datePath() + fileName + "/" + p,
              fs.readFileSync(`C:/videos/${ fileName }/${ p }`)
            );
          }
        })
        .on("stderr", function(stderrLine) {
        })
        .on("error", function(err, stdout, stderr) {
        });

      return fileName;
    }
  }

  sourceStream(fileName: string): Promise<ReadableStream> {
    if (fileName.indexOf("-") <= 0) throw new NotFoundException("file is not find");

    const date = Number(fileName.substr(0, fileName.indexOf("-")));
    const datePath = this.datePath(date);
    return this.fileRepository.getFile('source', datePath + fileName);
  }


  hlsStream(fileName: string): Promise<ReadableStream> {
    if (fileName.indexOf("-") <= 0) throw new NotFoundException("file is not find");
    const date = Number(fileName.substr(0, fileName.indexOf("-")));
    const datePath = this.datePath(date);
    return this.fileRepository.getFile('hls', datePath + fileName + '/playlist.m3u8');
  }

  datePath(date: Date | number | string = Date.now()): string {
    return dayjs(date).format("YYYY-MM-DD") + "/";
  }
}
