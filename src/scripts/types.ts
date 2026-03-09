// =============================================
// Shared Type Definitions — GymHub
// =============================================

interface UserData {
    username: string;
    email: string;
    password?: string;
    fullname?: string;
    age?: number;
    gender?: string;
    position?: 'member' | 'trainer' | 'admin';
    phone?: string;
    weight?: number;
    height?: number;
    profileImg?: string;
    profileBackgroundImg?: string;
}

interface Review {
    rating: number;
    text: string;
    date: string;
}

interface MiniProfile {
    name: string;
    role: string;
    img: string;
    online: boolean;
}
