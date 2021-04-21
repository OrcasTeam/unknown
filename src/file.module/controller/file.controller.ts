import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import FileApplication from '../application/file.application';

@ApiBearerAuth()
@ApiTags('file')
@Controller('file')
export default class FileController {
  constructor(private fileApplication: FileApplication) {}

  @Get('/')
  async getFile(@Res() res: Response) {
    return (
      await this.fileApplication.fileStream(
        '7a4e8ba948df176042fe5652aaf1d6b2.mp4',
      )
    ).pipe(res);
  }

  @Post('/upload')
  async upload(@Req() req: Request) {
    return await this.fileApplication.upload(req.files.file);
  }
}
