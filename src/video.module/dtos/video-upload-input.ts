import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsArray, IsString } from "class-validator";

export class VideoUploadInput {
  @ApiModelProperty()
  @IsString()
  name: string

  @ApiModelProperty()
  @IsString()
  description: string

  @ApiModelProperty()
  @IsString()
  url: string;

  @ApiModelProperty()
  @IsString()
  coverUrl: string;

  @ApiModelProperty()
  @IsArray()
  label: Array<string>
}
