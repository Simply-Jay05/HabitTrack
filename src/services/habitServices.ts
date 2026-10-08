import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Alert } from "react-native";

export const createHabit = async (data: object) => {
  try {
    const habitRef = collection(db, "habits");
    await addDoc(habitRef, data);
  } catch (error) {
    Alert.alert("A error Occurred", "Error creating Habit");
    console.error("ERROR Creating Habit: ", error);
  }
};
