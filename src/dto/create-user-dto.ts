import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: "Name can't be shorter than 2 letters" })
  name: string;

  @IsString({ message: 'Surname must be a string' })
  @MinLength(2, { message: "Surname can't be shorter than 2 letters" })
  surname: string;

  @IsEmail({ allow_ip_domain: false })
  email: string;
}
