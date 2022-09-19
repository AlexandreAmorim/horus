import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Vehicle } from '../screens/Orders/Vehicle';
import { Open } from '../screens/Orders/Open';
import { Dashboard } from '../screens/Dashboard';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppDashboardRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        > 
            <Screen
                name="dashboard" 
                component={Dashboard}
            />
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="open"
                component={Open}
            />
            <Screen
                name="vehicle"
                component={Vehicle}
            />
        </Navigator>
    )
}