import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../screens/SignIn';
import { AppTabRoutes } from './app.tab.routes';
import { useState } from 'react';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';

export function Routes() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    
    /*
    if (isLoading) {
        return <Loading />
    }
    */

    return (
        <NavigationContainer>
            {user.id ? <AppTabRoutes /> : <SignIn />}
        </NavigationContainer>
    );
}