import {
  collection,
  addDoc,
  where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  category: string;
  frequency: string;
  target: string;
  targetUnit: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  createdAt: Date;
  isActive: boolean;
};

export const createHabit = async (data: object) => {
  try {
    const habitsRef = collection(db, "habits");
    await addDoc(habitsRef, data);
  } catch (error) {
    console.error("ERROR Creating Habit:", error);
    throw error;
  }
};

export const getActiveHabits = (
  userId: string,
  callback: (habits: Habit[]) => void,
) => {
  const habitsRef = collection(db, "habits");
  const q = query(
    habitsRef,
    where("userId", "==", userId),
    where("isActive", "==", true),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const habits = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Habit;
    });

    callback(habits);
  });

  return unsubscribe;
};
