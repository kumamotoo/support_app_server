import * as bcrypt from 'bcrypt';

export const isPasswordMatched = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword);

export const getHashedPassword = async (password: string) =>
  await bcrypt.hash(password, 12);

export const getQueryValue = (request: any) => {
  const [query] = `${request}`.split(';');
  const [option, value] = query.split('=');
  return { option, value };
};
