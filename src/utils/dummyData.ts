import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./colors";

export const user = {
  name: "Benjamin",
  profileImage: require("../../assets/profile.png"),
};

export const habits = [
  {
    id: "habit001",
    userId: "user123",
    name: "Drink Water",
    description: "Drink enough water throughout the day",
    category: "Health",
    frequency: "Daily",
    target: 8,
    targetUnit: "glasses",
    color: COLORS.blue,
    icon: "water-outline" as keyof typeof Ionicons.glyphMap,
    isActive: true,
    completed: true,
  },

  {
    id: "habit002",
    userId: "user123",
    name: "Exercise",
    description: "Complete a daily exercise session",
    category: "Fitness",
    frequency: "Daily",
    target: 30,
    targetUnit: "minutes",
    color: COLORS.cyan,
    icon: "barbell-outline" as keyof typeof Ionicons.glyphMap,
    isActive: false,
    completed: true,
  },

  {
    id: "habit003",
    userId: "user123",
    name: "Read",
    description: "Read every day",
    category: "Study",
    frequency: "Daily",
    target: 30,
    targetUnit: "minutes",
    color: COLORS.purple,
    icon: "book-outline" as keyof typeof Ionicons.glyphMap,
    isActive: true,
    completed: true,
  },

  {
    id: "habit004",
    userId: "user123",
    name: "Meditate",
    description: "Spend time meditating",
    category: "Mindfulness",
    frequency: "Daily",
    target: 15,
    targetUnit: "minutes",
    color: COLORS.green,
    icon: "leaf-outline" as keyof typeof Ionicons.glyphMap,
    isActive: true,
    completed: false,
  },

  {
    id: "habit005",
    userId: "user123",
    name: "Study TypeScript",
    description: "Practice TypeScript concepts",
    category: "Study",
    frequency: "Daily",
    target: 1,
    targetUnit: "hour",
    color: COLORS.blue,
    icon: "laptop-outline" as keyof typeof Ionicons.glyphMap,
    isActive: true,
    completed: false,
  },
];
