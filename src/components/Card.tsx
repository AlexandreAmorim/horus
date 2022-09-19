import { 
    Text, 
    HStack, 
    Pressable, 
    IPressableProps
} from 'native-base';

export type OrderProps = {
    name: string;
    title: string;
}

type Props = IPressableProps & {
    data: OrderProps;
}

export function Card({ data, ...rest }: Props) {

    return (
        <Pressable {...rest}>
            <HStack
                bg="gray.600"
                mb={4}
                rounded="sm"
            >
                
                <HStack flex={1} my={5} ml={5} justifyContent="center">
                    <Text 
                        color="gray.100" 
                        fontSize="md" 
                        alignContent="center"
                        fontWeight={600}
                    >
                        {data.title}
                    </Text>
                </HStack>
            </HStack>
        </Pressable>
    );
}