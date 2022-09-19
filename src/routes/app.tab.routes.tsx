import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppDashboardRoutes } from './app.dashboard.routes';
import { AppUserRoutes } from './app.user.routes';
import { AppSettingsRoutes } from './app.settings.routes';
import { Gear, ListDashes, User } from 'phosphor-react-native';
import { useTheme } from 'native-base';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    const { colors } = useTheme();

    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.gray[400],
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: 'transparent',
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88,
                    backgroundColor: colors.gray[700]
                }
            }}
        >
            <Screen
                name="Dashboard"
                component={AppDashboardRoutes}
                options={{
                    headerShown: false,
                    tabBarIcon: (() => (
                        <ListDashes color={colors.gray[300]} size={35} />
                    ))
                }}
            />
            <Screen
                name="User"
                component={AppUserRoutes}
                options={{
                    headerShown: false,
                    tabBarIcon: (() => (
                        <User color={colors.gray[300]} size={35} />
                    ))
                }}
            />
            <Screen
                name="Settings"
                component={AppSettingsRoutes}
                options={{
                    headerShown: false,
                    tabBarIcon: (() => (
                        <Gear color={colors.gray[300]} size={35} />
                    ))
                }}
            />
        </Navigator>
    )
}