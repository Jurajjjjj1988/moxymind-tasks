import { z } from 'zod';

export const createUserResponseSchema = z.object({
  name: z.string().min(1),
  job: z.string().min(1),
  // reqres returns id as a string like "123"
  id: z.string().min(1),
  createdAt: z.string().datetime(),
});

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
