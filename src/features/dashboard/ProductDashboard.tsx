import { View, Text, Animated as RNAnimated, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import { NoticeHeight } from '@utils/Scaling';
import Visuals from './Visuals';
import CustomText from '@components/ui/CustomText';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
    const { user } = useAuthStore();
    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

    useEffect(() => {
        // Log user data when component mounts
        console.log('ProductDashboard - Current User Data:', user);
    }, [user]);

    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false,
        }).start();
    };

    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HEIGHT,
            duration: 1200,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        slideDown();
        const timeoutId = setTimeout(() => {
            slideUp();
        }, 3500);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <>
                <Visuals />
                <SafeAreaView />
                <View style={styles.container}>
                    <CustomText style={styles.title}>
                        Welcome, {user?.name || 'User'}
                    </CustomText>
                    <View style={styles.userInfo}>
                        <CustomText style={styles.label}>User Details:</CustomText>
                        <CustomText style={styles.info}>Phone: {user?.phone || 'N/A'}</CustomText>
                        <CustomText style={styles.info}>ID: {user?.id || 'N/A'}</CustomText>
                        {/* Add more user details as needed */}
                    </View>
                </View>
            </>
        </NoticeAnimation>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfo: {
        backgroundColor: '#f4f4f4',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default ProductDashboard;