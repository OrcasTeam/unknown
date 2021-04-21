export default interface MinioConfig {
  host: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucketRegion: string;
}
