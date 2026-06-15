import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  avatar: z.string().url(),
});

export const supportSchema = z.object({
  url: z.string().url(),
  text: z.string().min(1),
});

export const listUsersSchema = z.object({
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  total_pages: z.number().int().positive(),
  data: z.array(userSchema),
  support: supportSchema,
});

export type User = z.infer<typeof userSchema>;
export type ListUsersResponse = z.infer<typeof listUsersSchema>;
