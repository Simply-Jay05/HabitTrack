import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Firestore References
// collection() — Reference a collection.
// doc() — Reference a specific document.

// Firestore Operations
// setDoc() — Create a document with a custom document ID.
// addDoc() — Create a document with an automatically generated document ID.
// updateDoc() — Update specific fields in an existing document.
// deleteDoc() — Delete an existing document.
// getDoc() — Get one specific document.
// getDocs() — Get multiple documents from a collection.
// onSnapshot() — Get data and listen for real-time changes.

// Create a Habit with a custom Id
export const createHabitWithCustomId = async () => {
  try {
    const habitsRef = doc(db, "habits", "habit001");

    await setDoc(habitsRef, {
      user: "user001",
      title: "Drink Water",
      category: "Healthy",
      target: "5 glasses",
      frequency: "Daily",
    });
    console.log("Created document with custom Id successfully");
  } catch (error) {
    console.error("Erorr creating auto Id Document: ", error);
  }
};

// Create a Habit with a custom Id
export const createHabitWithAutoId = async () => {
  console.log("Processed Started");
  try {
    const habitsRef = collection(db, "habits");

    const result = await addDoc(habitsRef, {
      user: "user001",
      title: "Drink Water",
      category: "Healthy",
      target: "5 glasses",
      frequency: "Daily",
    });
    console.log("Created document with auto Id successfully:", result.id);
  } catch (error) {
    console.error("Erorr creating auto Id Document: ", error);
  }
};
