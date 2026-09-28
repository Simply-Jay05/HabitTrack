import { useEffect } from "react";
import * as Font from "expo-font";
import * as splashScreen from "expo-splash-screen";
import { RootNavigator } from "./src/navigation/rootnavigator";
import { UserProvider } from "./src/context/UserContext";
import { AuthProvider } from "./src/context/AuthContext";

splashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Light: require("./assets/font/Scoutie_Sans/static/ScoutieSans-Light.ttf"),
        Medium: require("./assets/font/Scoutie_Sans/static/ScoutieSans-Medium.ttf"),
        Regular: require("./assets/font/Scoutie_Sans/static/ScoutieSans-Regular.ttf"),
        Bold: require("./assets/font/Scoutie_Sans/static/ScoutieSans-Bold.ttf"),
        Italic: require("./assets/font/Scoutie_Sans/static/ScoutieSans-Italic.ttf"),
      });
      await splashScreen.hideAsync();
    };

    loadFonts();
  }, []);
  return (
    <AuthProvider>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </AuthProvider>
  );
}
