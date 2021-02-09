import { User } from '../entities/user.entity';

export interface RequestDto {
  title: string;
  description: string;
  creator: string;
}
