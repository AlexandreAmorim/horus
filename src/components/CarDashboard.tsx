import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Box, Pressable, Icon, IIconProps } from 'native-base';
import { FontAwesome5 } from "@expo/vector-icons";

interface IProps {
    name: string;
    title: string;
    icon: IIconProps;
}

export function CardHome({ name, title, icon }: IProps) {

    const navigation = useNavigation();

    function handleCar(name: string) {
    }

    return (
        <Box alignItems="center">
            <Pressable onPress={() => handleCar(name)}>
                {({
                    isHovered,
                    isPressed
                }) => {
                    return <Box
                        w="96"
                        borderWidth="1"
                        borderColor="coolGray.300"
                        shadow="3"
                        bg={isPressed ? "coolGray.200" :
                            isHovered ? "coolGray.200" : "coolGray.700"}
                        p="5"
                        rounded="8"
                        alignItems="center"
                        style={{
                            transform: [{
                                scale: isPressed ? 0.96 : 1
                            }]
                        }}>
                        <Box flexDirection="row" alignItems="center">
                            <Icon
                                color="white"
                                as={<FontAwesome5 name={icon} />}
                                size={6}
                            />
                            <Text ml="2" color="white">{title}</Text>
                        </Box>

                    </Box>
                }}
            </Pressable>
        </Box>
    );
}