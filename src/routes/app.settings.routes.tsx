import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Settings } from '../screens/Settings';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppSettingsRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="settings"
                component={Settings}
            />
        </Navigator>
    )
}