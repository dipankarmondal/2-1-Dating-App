import { toast } from "../../helpers/responsive";
import { API } from "../url";

//search user
export const SearchUser = async (token: any, search: any, limit: any, online: any) => {

    try {
        const endpoint = "users";
        const params = {
            ...(search ? { search } : {}),
            ...(limit ? { limit } : {}),
            ...(online !== undefined ? { online } : {}),
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

// get user
export const GetUser = async (token: any) => {
    try {
        const res = await API.get(`auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

//Update Profile
export const UpdateProfile = async (token: any, data: any,) => {
    try {
        const res = await API.put("profile", data,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Upload Profile Photos
export const UploadProfilePhotos = async (token: any, data: any,) => {
    try {
        const res = await API.post("/media/upload/profile-photo", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};
//Upload Profile Photos
export const UploadSingleContent = async (token: any, data: any,) => {
    try {
        const res = await API.post("/media/upload/single", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//get media-library
export const GetMediaLibrary = async (token: any, id: any, type: any, source: any, limit: any,page: any) => {
    try {
        const res = await API.get(`/media-library/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                ...(type ? { type } : {}),
                ...(source ? { source } : {}),
                limit: limit,
                page
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

// delete signle file
export const DeleteSingleFile = async (token: any, data: any) => {
    try {
        const res = await API.delete(`/media/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data, // ✅ send data in config under "data"
        });

        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};


// create albums
export const CreateAlbum = async (token: any, data: any,) => {
    try {
        const res = await API.post("albums", data,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response);

        let firstMessage = "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

// get all albums
export const GetAllAlbums = async (token: any,limit: any, page: any) => {
    try {
        const res = await API.get("/albums", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit: limit,
                page: page
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

// delete albums
export const DeleteAlbum = async (token: any, album_id: any,) => {
    try {
        const res = await API.delete(`/albums/${album_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};
