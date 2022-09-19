import { Heading, VStack, Icon, useTheme } from "native-base";
import { Input } from "../components/Input";
import { LockSimple, User, Alien } from "phosphor-react-native";
import { Button } from "../components/Button";
import { useState } from "react";
import { useAuth } from '../hooks/auth';
import * as Yup from 'yup';
import {
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();
    const { signIn } = useAuth();

    async function handleSignin() {
        try {
            const schema = Yup.object().shape({
                document: Yup.string()
                    .required('Cpf e obrigatório'),
                password: Yup.string()
                    .required('A senha é obrigatória')
            });

            await schema.validate({ document, password });
            setIsLoading(true);
            signIn({ document, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
                setIsLoading(false);
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                )
                setIsLoading(false);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
                <Alien size={42} color={colors.gray[300]} />

                <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                    Entrar no Sistema
                </Heading>

                <Input
                    placeholder="digite seu Cpf"
                    mb={4}
                    keyboardType="numeric"
                    autoCorrect={false}
                    autoCapitalize="none"
                    InputLeftElement={
                        <Icon as={<User color={colors.gray[300]} />} ml={4} />
                    }
                    onChangeText={setDocument}
                />
                <Input
                    placeholder="digite sua Senha"
                    mb={8}
                    InputLeftElement={
                        <Icon as={<LockSimple color={colors.gray[300]} />} ml={4} />
                    }
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Button
                    title="Entrar"
                    w="full"
                    isLoading={isLoading}
                    onPress={handleSignin}
                />
            </VStack>
        </TouchableWithoutFeedback>
    )
}