import { Module, Scope } from '@nestjs/common';
import FileApplication from './application/file.application';
import FileController from './controller/file.controller';
import MinioRepository from './repository/minio/repository';
import FileRepository from './repository/file.repository';

@Module({
  controllers: [FileController],
  providers: [
    {
      provide: FileApplication,
      useClass: FileApplication,
      scope: Scope.REQUEST,
    },
    {
      provide: FileRepository,
      useClass: MinioRepository,
    },
  ],
})
export class FileModule {}
