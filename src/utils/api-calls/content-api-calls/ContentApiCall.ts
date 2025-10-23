import { toast } from "../../helpers/responsive";
import { API } from "../url";

//search user
export const SearchUser = async (token: any, search: any, limit: any, online: any) => {

    try {
        const endpoint = "/users";
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
export const UploadSingleContent = async (token: any, data: any) => {
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
export const GetMediaLibrary = async (token: any, id: any, type: any, source: any, limit: any, page: any) => {
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
        const errorData = error?.response;
        console.log("object", errorData)

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
export const GetAllAlbums = async (token: any, limit: any, page: any) => {
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

//Get albums by id 
export const GetAlbumById = async (token: any, album_id: any,) => {
    try {
        const res = await API.get(`/albums/${album_id}`, {
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

// upload album 
export const UploadAlbum = async (token: any, data: any, albumId: any) => {
    try {
        const res = await API.post(`/albums/${albumId}/upload`, data,
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

// remove media 
export const RemoveMedia = async (token: any, album_id: any, media_id: any,) => {
    try {
        const res = await API.delete(`/albums/${album_id}/media/${media_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
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

//Update Album
export const UpdateAlbum = async (token: any, album_id: any, data: any,) => {
    try {
        const res = await API.put(`/albums/${album_id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
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

// edit album media 
export const EditAlbumMedia = async (token: any, album_id: any, data: any,) => {
    try {
        const res = await API.put(`/albums/${album_id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
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

//Get Profile Viewers
export const GetProfileViewers = async (token: any) => {
    try {
        const res = await API.get("users/profile-views", {
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

// Get hot date
export const GetHotDate = async (token: any) => {
    try {
        const res = await API.get("/speed-dates", {
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

//Create Speed Date
export const CreateSpeedDate = async (token: any, data: any,) => {
    try {
        const res = await API.post("/speed-dates", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data?.message);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Send Friend Request
export const SendFriendRequest = async (token: any, data: any,) => {
    console.log("object", token, data)
    try {
        const res = await API.post("/friend-requests", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Create Chat Room
export const CreateChatRoom = async (token: any, data: any,) => {
    try {
        const res = await API.post("/chatrooms", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Get chatrooms
export const GetChatRooms = async (token: any) => {
    try {
        const res = await API.get("/chatrooms", {
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

// List All Users
export const ListAllUsers = async (token: any, page: any, limit: any) => {
    try {
        const res = await API.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                limit: limit
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

//Get Global Videos
export const GetGlobalVideos = async (token: any, audlt: any, rating: any, visibility: any, page: any, limit: any) => {
    try {
        const res = await API.get("/media-library/global/videos", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                ...(audlt ? { adultContent: audlt } : {}),
                ...(rating ? { contentRating: rating } : {}),
                ...(visibility ? { visibility: visibility } : {}),
                page: page,
                limit: limit
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

//Create Interaction
export const CreateInteraction = async (token: any, data: any,) => {
    try {
        const res = await API.post("/interactions", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Create Group
export const CreateNewGroup = async (token: any, data: any,) => {
    try {
        const res = await API.post("/groups", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("adsfasd", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Get All Groups
export const GetAllGroups = async (token: any) => {
    try {
        const res = await API.get("/groups", {
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

// Get Single Group
export const GetSingleGroup = async (token: any, id: any) => {
    try {
        const res = await API.get(`/groups/${id}`, {
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

// Get Group Members
export const GetGroupMembers = async (token: any, id: any) => {
    try {
        const res = await API.get(`/groups/${id}/members`, {
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

//Get My Groups
export const GetMyGroups = async (token: any) => {
    try {
        const res = await API.get("/groups/my-groups", {
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