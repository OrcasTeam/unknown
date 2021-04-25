import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class RegisterUserInput {
  @ApiModelProperty()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  phone: string;

  @ApiModelProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
