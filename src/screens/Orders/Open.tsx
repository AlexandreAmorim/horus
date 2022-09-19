import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Center, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import { Map } from './Map';
import { Vehicle } from './Vehicle';
import { StyleSheet, Dimensions } from 'react-native';
import { MapPin, SignOut } from 'phosphor-react-native';
import { useAuth } from '../../hooks/auth';
import Horusvg from '../../assets/horus.svg';

interface ICoord {
    latitude: any;
    longitude: any;
    latitudeDelta: any
    longitudeDelta: any;
}

export function Open() {
    const [coord, setCoords] = useState<ICoord>({} as ICoord);
    const { signOut } = useAuth();
    const { colors } = useTheme();

    return (
        <VStack flex={1} pb={6} bg="gray.700">
                {!coord.latitude && (
                    <>
                    <HStack
                        w="full"
                        justifyContent="space-between"
                        alignItems="center"
                        pt={16}
                        pb={2}
                        px={6}
                    >
                        <Heading size="xl" color="gray.100">
                            Maps
                        </Heading>

                        <MapPin size={32} color={colors.gray[200]} />
                    </HStack> 
                        <Center alignItems="center" style={styles.container}>
                            <Text color={colors.gray[200]} my={8} >Selecione o local da abordagem</Text>
                            <Map 
                                handleCoord={(coord: ICoord) => {
                                    setCoords(coord);
                                }}
                            />
                        </Center>
                    </>
                )}
                {coord.latitude && (
                    <Vehicle coord={coord} />
                )}
        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
