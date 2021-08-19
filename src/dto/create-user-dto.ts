import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: "Name can't be shorter than 2 letters" })
  @Matches(/^([A-Z][a-z]+)$/, {
    message: 'First name must start with Capital letter',
  })
  firstName: string;

  @IsString({ message: 'Surname must be a string' })
  @MinLength(2, { message: "Surname can't be shorter than 2 letters" })
  @Matches(/^([A-Z][a-z]+)$/, {
    message: 'Last name must start with Capital letter',
  })
  lastName: string;

  @IsEmail({ allow_ip_domain: false })
  email: string;

  photo: Buffer;
}
