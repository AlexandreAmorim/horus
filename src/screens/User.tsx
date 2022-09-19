import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Center, Text } from 'native-base';

export function User() {
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
                <Text>User</Text>
            </Center>
        </>
    );
}