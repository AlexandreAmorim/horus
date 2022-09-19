import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../screens/Dashboard";
import { Details } from "../screens/Details";

import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
      
            <Screen
                name="dashboard" component={Dashboard}
            />
                  <Screen
                name="home" component={Home}
            />
             <Screen
                name="details" component={Details}
            />
        </Navigator>
    );
}