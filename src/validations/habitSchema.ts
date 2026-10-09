import { z } from "zod";

export const habitSchema = z.object({
  habitName: z.string().min(1, "Habit name is required.").trim(),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required."),
  frequency: z.string().min(1, "Freqency is required."),
  target: z.string().min(1, "Target is required.").trim(),
  targetUnit: z.string().min(1, "Target unit is required.").trim(),
  color: z.string().min(1, "Color is required."),
  icon: z.string().min(1, "Icon is required."),
});

export type HabitFormType = z.infer<typeof habitSchema>;
