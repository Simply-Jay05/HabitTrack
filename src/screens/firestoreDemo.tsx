import { Button, StyleSheet, Text, View } from "react-native";
import {
  createHabitWithCustomId,
  createHabitWithAutoId,
} from "../services/habitServices";

export default function FirestoreDemo() {
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
});
