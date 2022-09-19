import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Center, IconButton, Text, useTheme } from 'native-base';
import { SignOut, Alien, ChatTeardropText } from 'phosphor-react-native';
import { useAuth } from '../hooks/auth';

export function Settings() {
    const { signOut } = useAuth();
    const { colors } = useTheme();

    return (
        <>
            <StatusBar
                style="dark"
                translucent
                backgroundColor="transparent"
            />
            <Center
                h="full"
            >
                <Text>Settings</Text>
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                    onPress={signOut}
                />
            </Center>
        </>
    );
}