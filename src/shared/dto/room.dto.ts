import { MessagesI } from '../../messages/messages.service';
import { AdminDto } from './admin.dto';
import { UserDto } from './user.dto';

export class RoomDto {
  title: string;
  description: string;
  open: boolean;
  resolved: boolean;
  massages?: Omit<MessagesI, 'id'>;
  admin: Omit<AdminDto, 'id'>;
  user: Omit<UserDto, 'id'>;
}
