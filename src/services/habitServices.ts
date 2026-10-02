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
  getDoc,
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
      user: "user002",
      title: "Eat fruit",
      category: "Healthy",
      target: "3 fruits",
      frequency: "Daily",
    });
    console.log("Created document with auto Id successfully:", result.id);
  } catch (error) {
    console.error("Erorr creating auto Id Document: ", error);
  }
};

// To Update a Habit
export const updateHabit = async () => {
  console.log("Processed Started");
  try {
    const habitRef = doc(db, "habits", "habit001");

    await updateDoc(habitRef, {
      title: "Drink Fruit Juice",
      target: "10 glasses",
      frequency: "Weekly",
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document", error);
  }
};

// To Delete a Dcument
export const deleteHabit = async () => {
  try {
    console.log("Process Started");

    const habitRef = doc(db, "habits", "habit001");

    await deleteDoc(habitRef);

    console.log("Document deleted succesfully");
  } catch (error) {
    console.error("Error deleting document", error);
  }
};

// To get a single document
export const getSingleHabit = async () => {
  try {
    const habitRef = doc(db, "habits", "habit001");

    const result = await getDoc(habitRef);

    if (result.exists()) {
      console.log(result.id, result.data());
    } else {
      console.log("Document doesn't exist");
    }
  } catch (error) {
    console.error("Error fetching one document", error);
  }
};

// To get all the Documents in the collection
export const getAllHabits = async () => {
  console.log("Process Started");

  try {
    const habitRef = collection(db, "habits");

    const result = await getDocs(habitRef);

    result.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } catch (error) {
    console.error("Error fetching all the documents", error);
  }
};

// Query Operation - is a request to tell firestore the kind documents you want fetch and how you want it
// Syntax: Query(Loca Ref, Query_Rules)
// Query Rules:
// 1. where() - fetches any document that meets a condition that you condition [Filters our document based on a condition]
// 2. orderBy() - sorts our documents based on requirement
// 3. limit() - set the number you want to be shown

export const getByQuery = async () => {
  console.log("Process Started");
  try {
    const habitRef = collection(db, "habits");
    const q = query(
      habitRef,
      where("category", "!=", "Health"),
      // orderBy("title", "desc"),
      limit(1),
    );
    const result = await getDocs(q);
    result.forEach((doc) => {
      console.log("Document fetched Succesfully", doc.data());
    });
  } catch (error) {
    console.error("Error Querying the database: ", error);
  }
};

// npm install react-native-paystack-webview
// npx expo install react-native-webview
