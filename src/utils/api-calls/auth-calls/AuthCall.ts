import { toast } from "../../helpers/responsive";
import { API } from "../url";

export const VerifayPhone = async (data: any) => {
    try {
        const NewData = {
            target: data?.phone,
            type: "signup",
        };

        const res = await API.post("otp/request", NewData);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;

        // If it's an array of objects
        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        console.log("adsfasd", errorData);
        throw error;
    }
};
export const VerifayOtp = async (data: any) => {
      console.log("adfasd", data);
    try {

        const res = await API.post("otp/verify", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;

        // If it's an array of objects
        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        console.log("adsfasd", errorData);
        throw error;
    }
};
export const CreateUser = async (data: any) => {
    console.log("adfad", data);
    try {

        const res = await API.post("auth/signup", data);
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;

        // If it's an array of objects
        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        console.log("adsfasd", errorData);
        throw error;
    }
};
