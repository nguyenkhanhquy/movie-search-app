import { ExpoRoot } from "expo-router";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { UserProvider } from "./context/UserContext";

export default function App() {
    const ctx = require.context("./app/_tabs");
    return (
        <UserProvider>
            <ExpoRoot context={ctx} />
        </UserProvider>
    );
}

AppRegistry.registerComponent(appName, () => App);
