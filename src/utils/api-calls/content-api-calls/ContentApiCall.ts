import { toast } from "../../helpers/responsive";
import { API } from "../url";

//search user
export const SearchUser = async (token: any, search: any, limit: any) => {

    try {
        const endpoint = "users";
        const params = {
            search,
            limit
        };

        console.log(
            "Full URL:",
            `${API.defaults.baseURL}${endpoint}?${new URLSearchParams(params).toString()}`
        );

         const res = await API.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });

        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        // If it's an array of objects
        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};