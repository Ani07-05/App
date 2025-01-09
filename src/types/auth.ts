export interface User {
    id?: string; // Unique identifier for the user
    phone?: string; // User's phone number
    email?: string; // User's email address
    name?: string; // User's name
    role?: 'Customer' | 'Delivery' | 'Admin'; // Role of the user in the system
    createdAt?: string; // Timestamp when the user was created
    updatedAt?: string; // Timestamp when the user was last updated
    [key: string]: any; // Allow additional dynamic properties
}

export interface Order {
    orderId?: string; // Unique identifier for the order
    items?: Array<any>; // Array of items in the order
    totalPrice?: number; // Total price of the order
    status?: string; // Current status of the order (e.g., 'Pending', 'Completed')
    customerId?: string; // ID of the customer who placed the order
    createdAt?: string; // Timestamp when the order was created
    updatedAt?: string; // Timestamp when the order was last updated
    [key: string]: any; // Allow additional dynamic properties
}

export interface AuthResponse {
    user: User; // User object returned from the API
    accessToken: string; // Access token for authenticated requests
    refreshToken: string; // Refresh token for renewing the session
}
