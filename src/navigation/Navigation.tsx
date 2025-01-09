import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import { navigationRef, prepareNavigation } from '@utils/NavigationUtils';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                console.log('Navigation is ready');
                prepareNavigation(); // Mark navigation as ready
            }}
        >
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
                <Stack.Screen name="DeliveryLogin" component={DeliveryLogin} />
                <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
                <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
