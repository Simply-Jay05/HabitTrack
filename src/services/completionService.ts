import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

type Completion = {
  id: string;
  habitId: string;
  userId: string;
  completedAt: string;
  date: string;
};

export const getTodayCompletions = (
  userId: string,
  today: string,
  callback: (completionIds: string[]) => void,
) => {
  const completionRef = collection(db, "habitCompletions");
  const q = query(
    completionRef,
    where("userId", "==", userId),
    where("date", "==", today),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const completedHabitIds = snapshot.docs.map((doc) => doc.id);
    callback(completedHabitIds);
  });

  return unsubscribe;
};
