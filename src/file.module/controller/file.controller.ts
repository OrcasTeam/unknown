import config from 'config';
import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import FileApplication from "../application/file.application";

@ApiBearerAuth()
@ApiTags("file")
@Controller("file")
export default class FileController {
  constructor(private fileApplication: FileApplication) {}

  @Get('hls/:path')
  async hlsFile(@Param("path") path: string, @Res() res: Response) {
    return (
      await this.fileApplication.hlsStream(path)
    ).pipe(res);
  }

  @Post("/upload")
  async upload(@Req() req: Request) {

    const filePath = await this.fileApplication.upload(req.files.file);
    return 'localhost:' + config.get<string>('server.port') + "/file/hls/" + filePath;
  }

}
