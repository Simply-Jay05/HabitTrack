import { useEffect } from "react";
import * as Font from "expo-font";
import * as splashScreen from "expo-splash-screen";
import { RootNavigator } from "./src/navigation/rootnavigator";
import { UserProvider } from "./src/context/UserContext";
import { AuthProvider } from "./src/context/AuthContext";
import { PaystackProvider } from "react-native-paystack-webview";

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
      <PaystackProvider publicKey="pk_test_3fffc989a997456bf3b18b8498948a69ad86534b">
        <UserProvider>
          <RootNavigator />
        </UserProvider>
      </PaystackProvider>
    </AuthProvider>
  );
}
