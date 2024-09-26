import { ExpoRoot } from "expo-router";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "react-native-paper";

export default function App() {
    const ctx = require.context("./app/_tabs");
    return (
        <ThemeProvider>
            <UserProvider>
                <ExpoRoot context={ctx} />
            </UserProvider>
        </ThemeProvider>
    );
}

AppRegistry.registerComponent(appName, () => App);
