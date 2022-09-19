import React from 'react';
import { VStack, HStack, IconButton, useTheme, Heading, FlatList, Flex } from 'native-base';
import { Card } from '../components/Card';
import { useAuth } from '../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { ListDashes, SignOut } from 'phosphor-react-native';

export function Dashboard() {
    const { signOut } = useAuth();
    const { colors } = useTheme();
    const navigation = useNavigation();

    const orders = [{
            id: '1',
            name: 'veiculos',
            title: 'Consultar Veículos',
            icon: 'Car',
        },
        {
            id: '2',
            name: 'pessoas',
            title: 'Consultar Pessoas',
            icon: 'car',
        },
        {
            id: '3',
            name: 'bdtd',
            title: 'Bdtd',
            icon: 'car',
        }];

    function handleOpenDetails(name: string) {
        navigation.navigate('open', { name });
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                pt={16}
                pb={2}
                px={6}
            >
                <Heading size="xl" color="gray.50"> 
                    Dashboard
                </Heading>
                
                <ListDashes size={32} color={colors.gray[200]} />
            </HStack>
            <HStack flex={1} px={6} pt={6} alignItems='center' justifyContent='center'>
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={(
                        { item }
                    ) => <Card 
                        data={item} 
                        onPress={() => handleOpenDetails(item.name)} 
                    />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </HStack>
        </VStack> 
    );
}