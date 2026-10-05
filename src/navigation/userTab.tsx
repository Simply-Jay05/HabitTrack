import { UserTabStack } from "../utils/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import Settings from "../screens/settings";
import History from "../screens/history";
import Stats from "../screens/stats";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<UserTabStack>();

// add icons for each tab
export function UserTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <AntDesign name="home" size={24} /> }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: () => <AntDesign name="calculator" size={24} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: () => <FontAwesome5 name="clipboard-list" size={24} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => <Ionicons name="settings-sharp" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
