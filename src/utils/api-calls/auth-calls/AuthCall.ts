import { toast } from "../../helpers/responsive";
import { API } from "../url";

export const VerifayPhone = async (data: any) => {
    try {
        const NewData = {
            target: data?.phone,
            type: "signup",
        };

        const res = await API.post("/otp/request", NewData);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        console.log("adsfasd", errorData);
        throw error;
    }
};
export const VerifayOtp = async (data: any) => {
    try {

        const res = await API.post("/otp/verify", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", errorData);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};
export const CreateUser = async (data: any) => {
    try {

        const res = await API.post("/auth/signup", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("sdfgsdf", errorData);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};
export const LoginUser = async (data: any) => {
    try {

        const res = await API.post("/auth/login", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;

        console.log("adsfasd", error?.response);
        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

// Get profile
export const GetProfile = async (token: any) => {
    try {
        const res = await API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};


// Profile setup
export const UpdateProfileSetup = async (token: any, data: any,) => {
    try {
        const res = await API.post("/onboarding/complete", data, { headers: { Authorization: `Bearer ${token}` } });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};


//business-request
export const BusinessRequest = async (token: any, data: any,) => {
    try {
        const res = await API.post("/business-request", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data?.message);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//forgot-password 
export const ForgotPasswordRequest = async (data: any) => {
    try {
        const res = await API.post("/auth/forgot-password", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data?.message);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//verify-reset-otp

export const VerifyResetOtp = async (data: any) => {
    try {
        const res = await API.post("/auth/verify-reset-otp", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data?.message);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//reset-password
export const ResetPassword = async (data: any) => {
    try {
        const res = await API.post("/auth/reset-password-with-token", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data);

        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//create livestreams
export const CreateLivestream = async (token: any, data: any,) => {
    try {
        const res = await API.post("/livestreams", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data?.message);
        // If it's an array of objects
        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};
