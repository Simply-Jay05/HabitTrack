import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./colors";

export const categories = [
  { label: "Health", value: "Health" },
  { label: "Fitness", value: "Fitness" },
  { label: "Study", value: "Study" },
  { label: "Personal", value: "Personal" },
  { label: "Mindfulness", value: "Mindfulness" },
  { label: "Productivity", value: "Productivity" },
  { label: "Finance", value: "Finance" },
  { label: "Social", value: "Social" },
];

export const frequencies = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
];

export const colors = [
  COLORS.blue,
  COLORS.cyan,
  COLORS.green,
  COLORS.orange,
  COLORS.purple,
  COLORS.pink,
];

export const icons: (keyof typeof Ionicons.glyphMap)[] = [
  "water-outline",
  "cash-outline",
  "barbell-outline",
  "laptop-outline",
  "walk-outline",
  "book-outline",
  "leaf-outline",
  "restaurant-outline",
  "briefcase-outline",
];
