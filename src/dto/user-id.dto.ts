import { Matches } from 'class-validator';

export class UserIdDto {
  @Matches(/^[a-f\d]{24}$/i, { message: 'Invalid ObjectId' })
  id: string;
}
