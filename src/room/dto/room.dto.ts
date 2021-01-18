import { MessagesI } from './../../messages/messages.service';
import { UserDto } from '../../user/dto/user.dto';
import { AdminDto } from './../../admin/dto/admin.dto';

export class RoomDto {
  title: string;
  open: boolean;
  massages?: Omit<MessagesI, 'id'>;
  admin: Omit<AdminDto, 'id'>;
  user: Omit<UserDto, 'id'>;
}
