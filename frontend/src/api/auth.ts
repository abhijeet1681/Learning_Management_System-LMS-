import api from "@/axios/auth/authInterceptors";
import { config } from "@/config/config";
import { RegisterInstructorFormValues } from "@/types/instructor";

export const login = async (email : string, password: string, role: string) => {
    const response = await api.post(`/auth/login`, {email, password, role}, {withCredentials: true});
    return response.data;
}

export const logout = async() => {
    const response = await api.post(`/auth/logout`, {}, {withCredentials: true});
    return response.data;
}

export const getUserDataAPI = async(userId: string) => {
    const response = await api.get(`/auth/user-data/${userId}`,{withCredentials: true});
    return response.data;
}

export const adminLogout = async() => {
    const response = await api.post(`/auth/admin-logout`, {}, {withCredentials: true});
    return response.data;
}

export const register = async( firstName : string, lastName : string, email : string, password : string, phone :string) => {
    const response = await api.post(`/auth/signup`, {firstName, lastName, email, password, phone})
    return response.data;
}

export const verifyAccount = async( email: string, otp : string ) => {
    const response = await api.post(`/auth/verify-otp`, {email, otp})
    return response.data;
}

export const updateEmailUserProfileAPI = async( email: string, otp : string ) => {
    const response = await api.patch(`/auth/profile/edit/email`, {email, otp})
    return response.data;
}

export const sendOtp = async( email: string ) => {
    const response = await api.post(`/auth/send-otp`, {email})
    return response.data;
}

export const validateUserAuth = async( ) => {
    try {
        const response = await api.post(`/auth/verify-user-token`,{ withCredentials: true })
        return response.data;
    } catch (error) {
        throw error
    }
}

export const forgotPassword = async (email: string) => {
    const response = await api.post(`/auth/forgot-password`, {email})
    return response.data;
}

export const resetPasswordAPI = async (email: string, otp: string, password : string) => {
    const response = await api.post(`/auth/reset-password`, {email, otp, password});
    return response.data;
}

export const handleChangePasswordAPI = async (oldPassword: string, newPassword : string) => {
    const response = await api.post(`/auth/profile/change-password`, {oldPassword, newPassword});
    return response.data;
}

export const handleEditUserAPI = async (firstName: string, lastName : string, email: string, phone: string) => {
    const response = await api.post(`/auth/profile/edit`, {firstName,lastName, email, phone});
    return response.data;
}

export const handleGoogleLogin = async (token: string) => {
    try {
        const response = await api.post(`/auth/google`, { token });
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error
    }
}

export const handleRegisterToInstructor = async (data : RegisterInstructorFormValues, userId: string) => {
    try {
        const response = await api.post(`/auth/instructor-register`, {formData: data, userId})
        return response.data;
    } catch (error: any) {
        console.error('Instructor registration failed', error.response?.data || error.message)
        throw error
    }
}

export const changeProfileImage = async(userId:string, formData: FormData) => {
    try {
        const response = await api.post(`/student/profile/${userId}/update-image`, formData, { 
            headers: { 'Content-Type': "multipart/form-data" }, 
            withCredentials: true 
        })
        return response.data;
    } catch (error) {
        throw error
    }
}