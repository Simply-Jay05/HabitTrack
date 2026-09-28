import { View, Text, StyleSheet, Button } from "react-native";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppStack, UserTabStack } from "../utils/types";

type HomeType = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabStack, "Home">,
  NativeStackNavigationProp<AppStack>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeType>();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Firstore Demo"
        onPress={() => navigation.navigate("FirestoreDemo")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
