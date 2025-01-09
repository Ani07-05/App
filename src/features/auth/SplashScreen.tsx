import { View, Image, StyleSheet } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.png';
import Geolocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { refetchUser } from '@service/authService';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
});

const SplashScreen: FC = () => {
    const { setUser } = useAuthStore();

    const checkAuthAndNavigate = async () => {
        try {
            const accessToken = tokenStorage.getString('accessToken');
            const refreshToken = tokenStorage.getString('refreshToken');

            if (!accessToken || !refreshToken) {
                resetAndNavigate('CustomerLogin');
                return;
            }

            const userData = await refetchUser();
            if (userData) {
                setUser(userData);
                resetAndNavigate('ProductDashboard');
                return;
            }
            
            resetAndNavigate('CustomerLogin');
        } catch (error) {
            console.error('Auth check failed:', error);
            resetAndNavigate('CustomerLogin');
        }
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                await Promise.all([
                    Geolocation.requestAuthorization(),
                    checkAuthAndNavigate()
                ]);
            } catch (error) {
                console.error('Initialization failed:', error);
                resetAndNavigate('CustomerLogin');
            }
        };

        initialize();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        height: screenHeight * 0.2,
        width: screenHeight * 0.2,
        resizeMode: 'contain'
    }
});

export default SplashScreen;
