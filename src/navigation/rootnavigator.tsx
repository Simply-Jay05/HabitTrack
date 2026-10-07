import { AppStack, AuthStack } from "../utils/types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/auth/welcome";
import Signup from "../screens/auth/signup";
import { UserTab } from "./userTab";
import AddHabit from "../screens/addHabit";
import Details from "../screens/details";
import Login from "../screens/auth/login";
import { useAuth } from "../context/AuthContext";
import FirestoreDemo from "../screens/firestoreDemo";
import Premium from "../screens/Premium";
import ImagePicker from "../screens/imagePicker";

const AuthNav = createNativeStackNavigator<AuthStack>();

const AppNav = createNativeStackNavigator<AppStack>();

function AuthScreens() {
  return (
    <AuthNav.Navigator>
      <AuthNav.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthNav.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthNav.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </AuthNav.Navigator>
  );
}

function AppScreens() {
  return (
    <AppNav.Navigator screenOptions={{ headerShown: false }}>
      <AppNav.Screen
        name="UserTab"
        component={UserTab}
        options={{ headerShown: false }}
      />
      <AppNav.Screen name="AddHabit" component={AddHabit} />
      <AppNav.Screen name="Details" component={Details} />
      <AppNav.Screen name="FirestoreDemo" component={FirestoreDemo} />
      <AppNav.Screen name="Premium" component={Premium} />
      <AppNav.Screen name="ImagePicker" component={ImagePicker} />
    </AppNav.Navigator>
  );
}

// condition ? true (run) : false (run)
// if (codition) {run} else {run}
export function RootNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <AppScreens /> : <AuthScreens />}
    </NavigationContainer>
  );
}
