import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import FileApplication from "../application/file.application";

@ApiBearerAuth()
@ApiTags("file")
@Controller("file")
export default class FileController {
  constructor(private fileApplication: FileApplication) {}

  @Get("source/:fileName")
  async sourceFile(@Param("fileName") fileName: string, @Res() res: Response) {
    return (
      await this.fileApplication.sourceStream(fileName)
    ).pipe(res);
  }

  @Get('hls/:fileName')
  async hlsFile(@Param("fileName") fileName: string, @Res() res: Response) {

    return (
      await this.fileApplication.hlsStream(fileName)
    ).pipe(res);
  }

  @Post("/upload")
  async upload(@Req() req: Request) {
    return "/file/source" + await this.fileApplication.upload(req.files.file);
  }

}
