import { Button, StyleSheet, Text, View } from "react-native";
import {
  createHabitWithCustomId,
  createHabitWithAutoId,
  updateHabit,
  deleteHabit,
  getSingleHabit,
  getAllHabits,
  getByQuery,
} from "../services/habitServices";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function FirestoreDemo() {
  const [habits, setHabits] = useState<any[]>([]); // let habits = [];

  useEffect(() => {
    const habitRef = collection(db, "habits");

    // To create our listener
    const unsubscirbe = onSnapshot(habitRef, (snapshot) => {
      // temporary array to hold our habit data
      let arrTemp: any[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        arrTemp.push({ id: id, ...data });
      });

      setHabits(arrTemp);
    });

    // To disable listener when screen unmount
    return unsubscirbe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firestore Operations</Text>

      <View style={styles.btnView}>
        <Button
          title="Create Habit with custome Id"
          onPress={createHabitWithCustomId}
        />
        <Button
          title="Create Habit with auto Id"
          onPress={createHabitWithAutoId}
        />
        <Button title="Update Habit" onPress={updateHabit} />
        <Button title="Delete Habit" onPress={deleteHabit} />
        <Button title="Get single Habit" onPress={getSingleHabit} />
        <Button title="Get all Habits" onPress={getAllHabits} />
        <Button title="Query Database" onPress={getByQuery} />
      </View>

      <View style={styles.outputView}>
        <Text style={styles.outputHeader}>Real Time Listening</Text>
        {habits.map((habit) => (
          <Text key={habit?.id} style={styles.outputText}>
            ID: {habit?.id} | Title: {habit?.title} |
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Bold",
    marginBottom: 20,
  },
  btnView: {
    gap: 10,
  },
  outputView: {
    backgroundColor: "grey",
    padding: 20,
    marginTop: 30,
    width: "80%",
  },
  outputHeader: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 26,
    textAlign: "center",
  },
  outputText: {
    color: "white",
    fontFamily: "Regular",
    fontSize: 18,
  },
});
