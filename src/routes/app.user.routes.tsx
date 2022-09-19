import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { User } from '../screens/User';
const { Navigator, Screen } = createNativeStackNavigator();

export function AppUserRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="user"
                component={User}
            />
        </Navigator>
    )
}