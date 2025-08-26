import z from "zod";

export const todoSchema = {
  create: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    priority: z.enum(["extreme", "moderate", "low"]),
    completed: z.boolean().optional(),
  }),
  update: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    priority: z.enum(["extreme", "moderate", "low"]).optional(),
    completed: z.boolean().optional(),
  }),
};
