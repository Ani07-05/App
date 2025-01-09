import axios from "axios"
import { BASE_URL } from "./config"
import { tokenStorage } from "@state/storage"
import { useAuthStore } from "@state/authStore"
import { resetAndNavigate } from "@utils/NavigationUtils"
import { appAxios } from "./apiInterceptors"

export const deliveryLogin = async(email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, {email, password})
        const {accessToken, refreshToken, deliveryPartner} = response.data
        
        if (!accessToken || !refreshToken || !deliveryPartner) {
            throw new Error('Invalid response data');
        }
        
        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)
        return deliveryPartner;
        
    } catch (error) {
        console.error("Delivery Login Error", error);
        throw error;
    }
}

export const customerLogin = async(phone: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, {phone})
        const {accessToken, refreshToken, customer} = response.data
        
        if (!accessToken || !refreshToken || !customer) {
            throw new Error('Invalid response data');
        }
        
        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)
        return customer;
        
    } catch (error) {
        console.error("Customer Login Error", error);
        throw error;
    }
}

export const refetchUser = async () => {
    try {
        const response = await appAxios.get(`/user`);
        if (!response.data) {
            throw new Error('No user data received');
        }
        return response.data;
        
    } catch (error) {
        console.error("Refetch User Error", error);
        throw error;
    }
}

export const refresh_tokens = async() => {
    try {
        const refreshToken = tokenStorage.getString('refreshToken')
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`${BASE_URL}/refresh-token`, {refreshToken})
        const {accessToken: new_access_token, refreshToken: new_refresh_token} = response.data

        if (!new_access_token || !new_refresh_token) {
            throw new Error('Invalid token refresh response');
        }

        tokenStorage.set("accessToken", new_access_token)
        tokenStorage.set("refreshToken", new_refresh_token)
        return new_access_token;
        
    } catch (error) {
        console.error("Refresh Token Error", error);
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
        throw error;
    }
}