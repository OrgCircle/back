import { hash, compare } from "bcryptjs";

export const hashPassword = async (pass: string): Promise<string | null> => {
  if (!pass) return null;
  return await hash(pass, 4);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};
