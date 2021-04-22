import config from 'config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user.module/user.module';
import { CommonModule } from './common.module/common.module';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video.module/video.module';
import { FileModule } from './file.module/file.module';

const dbConfig = config.get<{
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
}>('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/**/*/entity/*.{js,ts}'],
  synchronize: dbConfig.synchronize,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    CommonModule,
    UserModule,
    VideoModule,
    FileModule,
  ],
})
export class AppModule {}
