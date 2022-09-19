import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home as HomeScreen } from '../screens/Home';
import { User as UserScreen } from '../screens/User';
import { Settings } from '../screens/Settings';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="home"
                component={HomeScreen}
            />
            <Screen
                name="user"
                component={UserScreen}
            />
            <Screen
                name="settings"
                component={Settings}
            />
        </Navigator>
    )
}