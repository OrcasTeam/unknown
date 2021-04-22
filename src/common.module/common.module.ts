import { Global, Module } from '@nestjs/common';
import { Logger } from "@/common.module/log/Logger";

@Global()
@Module({
  providers: [
    Logger
  ],
  exports: [
    Logger
  ]
})
export class CommonModule {

}
