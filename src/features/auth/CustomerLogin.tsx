import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Image,
    SafeAreaView,
    Keyboard,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import { customerLogin } from '@service/authService';
import { useAuthStore } from '@state/authStore';

const bottomColors = [...lightColors].reverse();

function CustomerLogin() {
    const [phoneNumber, setPhoneNumber] = useState(''); // User input for phone number
    const [loading, setLoading] = useState(false); // Loader state for button
    const keyboardOffsetHeight = useKeyboardOffsetHeight(); // Hook to manage keyboard offset
    const { setUser } = useAuthStore(); // Zustand store to manage user state
    const animatedValue = useRef(new Animated.Value(0)).current; // Animation reference

    // Animate the input container based on keyboard state
    useEffect(() => {
        const animation = Animated.timing(animatedValue, {
            toValue: keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.84,
            duration: 300,
            useNativeDriver: true,
        });
        animation.start();
    }, [keyboardOffsetHeight]);

    // Handle login authentication
    const handleAuth = async () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Invalid Input', 'Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true); // Show loader
        Keyboard.dismiss();

        try {
            const response = await customerLogin(phoneNumber);
            console.log('Login response:', response); // Debug log

            if (response) {
                setUser(response); // Save user to global state
                console.log('User set. Navigating to ProductDashboard...');
                resetAndNavigate('ProductDashboard'); // Navigate to ProductDashboard
            } else {
                Alert.alert('Error', 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error); // Debug log
            Alert.alert('Error', 'Login failed. Please try again.');
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <CustomSafeAreaView>
                <ProductSlider />
                <Animated.ScrollView
                    bounces={false}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.subContainer}
                    style={{ transform: [{ translateY: animatedValue }] }}
                >
                    <LinearGradient colors={bottomColors} style={styles.gradient} />
                    <View style={styles.content}>
                        <Image
                            source={require('@assets/images/logo.png')}
                            style={styles.logo}
                        />
                        <CustomText variant="h5" fontFamily={Fonts.Bold}>
                            Fastest Cloth App
                        </CustomText>
                        <CustomText
                            variant="h5"
                            fontFamily={Fonts.SemiBold}
                            style={styles.text}
                        >
                            Login or Sign Up
                        </CustomText>

                        {/* Input Field for Phone Number */}
                        <CustomInput
                            onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                            onClear={() => setPhoneNumber('')}
                            value={phoneNumber}
                            left={
                                <CustomText
                                    style={styles.phoneText}
                                    variant="h5"
                                    fontFamily={Fonts.SemiBold}
                                >
                                    +91
                                </CustomText>
                            }
                            placeholder="Enter mobile number"
                            inputMode="numeric"
                        />
                        {/* Button to Trigger Login */}
                        <CustomButton
                            disabled={phoneNumber?.length !== 10}
                            onPress={handleAuth}
                            loading={loading}
                            title="Continue"
                        />
                    </View>
                </Animated.ScrollView>
            </CustomSafeAreaView>

            <View style={styles.footer}>
                <SafeAreaView>
                    <CustomText fontSize={RFValue(6)}>
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </CustomText>
                </SafeAreaView>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    phoneText: {
        marginLeft: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10,
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fc',
        width: '100%',
    },
    gradient: {
        paddingTop: 60,
        width: '100%',
    },
});

export default CustomerLogin;
