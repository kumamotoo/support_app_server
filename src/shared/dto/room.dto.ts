import { MessagesI } from '../../messages/messages.service';
import { UserDto } from './user.dto';

export class RoomDto {
  title: string;
  description: string;
  open: boolean;
  resolved: boolean;
  massages?: Omit<MessagesI, 'id'>;
  admin: Omit<UserDto, 'id'>;
  user: Omit<UserDto, 'id'>;
}
