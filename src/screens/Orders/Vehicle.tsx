import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { VStack, FormControl, HStack, Modal, Text, Heading, IconButton, useTheme } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useHttp } from '../../hooks/http';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Car, ListDashes, SignOut } from 'phosphor-react-native';
import { useAuth } from '../../hooks/auth';

interface ICoord {
    coord: {
        latitude: any;
        longitude: any;
    }
}

export function Vehicle({ coord }: ICoord) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { httpGet } = useHttp();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { signOut } = useAuth();
    const { colors } = useTheme();
    
    const onSubmit = useCallback(async (data) => {
        const params = data;
        setLoading(true)
        Keyboard.dismiss()
        const response: any = await httpGet('/orders/autocomplete/vehicle', { params });

        if (response.status === 200) {
            const { data } = response;
            console.log("DATA ", data)
            setShowModal(true)
            setLoading(false)
        }

        if (response.response?.status === 400) {
            console.log("Erro ", response.response)
            setLoading(false)
        }
        setLoading(false)

    }, [httpGet]);

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
                    Veículo
                </Heading>
                
                <Car size={32} color={colors.gray[200]} />
            </HStack>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <VStack flex={1} alignItems="center" px={8} pt={24}>
                    <FormControl isInvalid={'plate' in errors}>
                        <FormControl.Label>Placa</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={(val) => onChange(val)}
                                    value={value}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            )}
                            name="plate"
                            rules={{ required: 'Field is required', minLength: 3 }}
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {errors.plate?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button
                        mt={8}
                        title='Buscar'
                        w="full"
                        onPress={handleSubmit(onSubmit)}
                        isLoading={loading}
                    />
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                        <Modal.Content maxWidth="350">
                            <Modal.CloseButton />
                            <Modal.Header>Veículo</Modal.Header>
                            <Modal.Body>
                                <VStack space={3}>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="medium">Sub Total</Text>
                                        <Text color="blueGray.400">$298.77</Text>
                                    </HStack>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="medium">Tax</Text>
                                        <Text color="blueGray.400">$38.84</Text>
                                    </HStack>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="medium">Total Amount</Text>
                                        <Text color="green.500">$337.61</Text>
                                    </HStack>
                                </VStack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button title='Salvar 'flex="1" onPress={() => {
                                    setShowModal(false);
                                }}/>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </VStack>
            </TouchableWithoutFeedback>
        </VStack>
    );
}