import { tokenStorage } from '../state/storage';
import { useAuthStore } from '../state/authStore';
import { AuthResponse } from '../types/auth';

export const handleAuthResponse = (response: AuthResponse) => {
    const { user, accessToken, refreshToken } = response;
    
    // Store tokens
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    
    // Set user in store
    useAuthStore.getState().setUser(user);
    
    return user;
};

export const isAuthenticated = () => {
    const accessToken = tokenStorage.getString('accessToken');
    const user = useAuthStore.getState().user;
    return !!accessToken && !!user;
};