export interface UserDto {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}
