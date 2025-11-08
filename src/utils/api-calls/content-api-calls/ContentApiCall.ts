import { showToast, toast } from "../../helpers/responsive";
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
export const GetProfileViewers = async (token: any, search: string) => {
    try {
        const res = await API.get("users/profile-views", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                ...(search ? { search } : {})
            }
        });

        // Log full API URL (baseURL + endpoint)
        console.log("Full API URL:", res?.config?.baseURL + res?.config?.url);

        return res?.data;
    } catch (error: any) {
        // Log full API URL in case of error
        console.log("Full API URL:", error?.config?.baseURL + error?.config?.url);
        console.log("Response:", error?.response);

        toast("error", { title: "Something went wrong" });
        throw error;
    }
};


// Get hot date
export const GetHotDate = async (token: any, date: any, distance: any, location: any, filter: any) => {
    try {
        const params: any = {
            ...(date ? { startDate: date } : {}),
            ...(filter?.speed_date_type ? { preferredWith: filter?.speed_date_type } : {}),
            ...(filter?.place_type ? { type: filter?.place_type } : {}),
            ...(distance ? { "location[maxDistance]": distance } : {}),
        };

        // Construct query string manually
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `/speed-dates${queryString ? `?${queryString}` : ""}`;

        console.log("🔗 Full API URL:", API.defaults.baseURL + fullUrl);

        const res = await API.get("/speed-dates", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });

        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        console.log("object", error?.response)
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
        console.log("adsfasd", error?.response?.data?.message);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData?.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        showToast("error", firstMessage);
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
export const GetChatRooms = async (token: any, URL: string) => {
    try {
        const res = await API.get(`${URL}`, {
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
export const ListAllUsers = async (token: any, page: any, limit: any, search: any,gender: any) => {
    try {
        const params = {
            page: page,
            limit: limit,
            ...(search ? { search: search } : {}),
            ...(gender ? { gender: gender } : {})
        };

        // Construct full URL for debugging
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `${API.defaults.baseURL}/users?${queryString}`;

        console.log("📡 Full API URL:", fullUrl);

        const res = await API.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params
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
        console.log("adsfasd", error?.response?.data?.message);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        showToast("error", firstMessage);
        throw error;
    }
};

//Send Remember Me

export const SendRememberMe = async (token: any, data: any,) => {
    try {
        const res = await API.post("/remember-me", data,
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

//Update Group
export const UpdateGroup = async (token: any, id: any, data: any,) => {
    try {
        const res = await API.put(`/groups/${id}`, data,
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
export const GetAllGroups = async (token: any, search: any, limit: any, page: any, filter: any) => {
    try {
        const res = await API.get("/groups", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                ...(search ? { search } : {}),
                ...(filter?.category ? { category: filter.category } : {}),
                ...(filter?.groupType ? { groupType: filter.groupType } : {}),
                ...(filter?.targetAudience ? { targetAudience: filter.targetAudience } : {}),
                ...(filter?.sortBy ? { sortBy: filter.sortBy } : {}),
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

//Delete Group
export const DeleteGroup = async (token: any, id: any,) => {
    try {
        const res = await API.delete(`/groups/${id}`, {
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

//Join Group
export const JoinGroup = async (token: any, id: any,) => {
    try {
        const res = await API.post(`/groups/${id}/join`, {},
            {
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

//Leave Group 
export const LeaveGroup = async (token: any, id: any) => {
    try {
        const fullUrl = `${API.defaults.baseURL}/groups/${id}/leave`;
        console.log("Full API URL:", fullUrl);

        const res = await API.post(`/groups/${id}/leave`, {}, {
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

//Update Account
export const UpdateAccount = async (token: any, data: any,) => {
    try {
        const res = await API.put("/account/info", data,
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

//Get User Details
export const GetUserDetails = async (token: any, id: any) => {
    try {
        const res = await API.get(`/users/${id}`, {
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

// Get My Friends List
export const GetMyFriendsList = async (token: any, search: any) => {
    try {
        // Build the URL manually to log it
        const baseURL = API.defaults.baseURL || ""; // Axios base URL
        const endpoint = "/friends";

        const params = new URLSearchParams();
        if (search) params.append("search", search);

        const fullUrl = `${baseURL}${endpoint}${params.toString() ? `?${params.toString()}` : ""}`;
        console.log("Full API URL:", fullUrl);

        // Make the API call
        const res = await API.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: search ? { search } : {}
        });

        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

// Get Friend Requests
export const GetFriendRequests = async (token: any, type: any, status: any) => {
    try {
        const res = await API.get("/friend-requests", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                type: type,
                status: status
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

// Friend Request action 
export const FriendRequestAction = async (token: any, id: any, data: any) => {
    try {
        const endpoint = `/friend-requests/${id}/respond`;
        const fullUrl = `${API.defaults.baseURL}${endpoint}`; // construct full URL
        // console.log("Full API URL:", fullUrl);
        // console.log("Request Data:", data);

        const res = await API.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error: any) {
        const errorData = error?.response?.data?.error;
        console.log("Error Response Data:", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};


// Send Broadcast Message
export const SendBroadcastMessage = async (token: any, data: any,) => {
    try {
        const res = await API.post("/personal-messages/broadcast", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("Error Response Data:", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

//Get Personal Conversations List

export const GetPersonalConversationsList = async (token: any, url: any) => {
    try {
        const res = await API.get(url, {
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


//Get Group Conversations List

export const GetGroupConversationsList = async (token: any) => {
    try {
        const res = await API.get("/group-messages/conversations", {
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

//Get Conversation with User

export const GetConversationWithUser = async (token: any, id: any, limit: any, page = 1, type: any) => {
    try {
        const URL = type === "group" ? `/group-messages/${id}` : `/personal-messages/conversations/${id}`;

        const fullUrl = `/personal-messages/conversations/${id}?page=${page}&limit=${limit}`;
        console.log("📡 Full API URL:", fullUrl);

        const res = await API.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
                limit: limit
            }
        });

        return res?.data;
    } catch (error) {
        console.log("❌ API Error:", error?.response?.data || error);
        toast("error", { title: "pratik" });
        throw error;
    }
};


// Delete Personal Message
export const DeletePersonalMessage = async (token: any, id: any, type: any) => {
    try {
        const URL = type === "group" ? "/group-messages" : "/personal-messages";
        const res = await API.delete(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("Error Response Data:", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

// Edit Personal Message
export const EditPersonalMessage = async (token: any, id: any, data: any, type: any) => {
    try {
        const URL = type === "group" ? "/group-messages" : "/personal-messages";
        const res = await API.put(`${URL}/${id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("Error Response Data:", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

// Upload Message Media
export const UploadMessageMedia = async (token: any, data: any,) => {
    try {
        const res = await API.post("/media/upload/message-media", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("Error Response Data:", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        if (error.response.status === 413) {
            toast("error", { title: "Having a problem with file size" });
        } else {
            toast("error", { title: firstMessage });
        }
        throw error;
    }
};

//My Profile Views

export const MyProfileViews = async (token: any,search: any) => {
    try {
        const res = await API.get("/users/my-profile-views", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                ...(search ? { search } : {})
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};


// Users I Liked
export const UsersInteractions = async (token: any, endPoint: any) => {
    try {
        const res = await API.get(`/interactions/${endPoint}`, {
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

//Get Remember

export const GetRemember = async (token: any, url: any) => {
    try {
        const res = await API.get(`remember-me/${url}`, {
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

//Delete Remember Me

export const DeleteRemember = async (token: any, id: any) => {
    try {
        const res = await API.delete(`remember-me/${id}`, {
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

//Get User's Friends List

export const GetUserFriends = async (token: any, id: any) => {
    try {
        const res = await API.get(`/friends/${id}`, {
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

//Get Feed

export const GetFeed = async (token: any) => {
    try {
        const res = await API.get(`/feed`, {
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

//Get global Feed

export const GetGlobalFeed = async (token: any) => {
    try {
        const res = await API.get(`/global-feed`, {
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

//Get My Rooms
export const GetRoom = async (token: any, URL: string, search: string, type: string, singleMale: boolean) => {
    try {
        const params: any = {
            ...(search ? { search } : {}),
            ...(type ? { type } : {}),
            ...(singleMale ? { singleMaleBlocked: singleMale } : {})
        };

        // Build full URL with query params
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `${URL}${queryString ? `?${queryString}` : ''}`;

        console.log("Full Request URL:", fullUrl);

        const res = await API.get(fullUrl, {
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

//Join Room

export const JoinRoom = async (token: any, id: any) => {
    try {
        const fullUrl = `https://api.desicouplesz.com/chatrooms/${id}/join`; // 👈 full URL
        console.log("Full URL:", fullUrl);

        const res = await API.post(fullUrl, {}, {   // 👈 second arg = body (empty)
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        toast("error", { title: "Something went wrong" });
        console.log("Error response:", error?.response);
        throw error;
    }
};

//Get Room Messages
export const GetRoomMessages = async (token: any, id: any) => {
    try {
        const res = await API.get(`/chatrooms/${id}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res?.data;
    } catch (error: any) {
        // console.log("Full API URL:", error?.config?.baseURL + error?.config?.url);
        toast("error", { title: "Something went wrong" });
        throw error;
    }
};

// Detele chatroom
export const DeleteChatRoom = async (token: any, id: any) => {
    try {
        const res = await API.delete(`/chatrooms/${id}`, {
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

//Leave Room
export const LeaveChatRoom = async (token: any, id: any) => {
    try {
        const res = await API.post(`/chatrooms/${id}/leave`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        const errorData = error?.response?.data?.error;
        console.log("Error Response Data:", error?.response?.data);

        let firstMessage = error?.response?.data?.message ?? "Something went wrong";
        if (Array.isArray(errorData) && errorData.length > 0) {
            firstMessage = errorData[0]?.message || firstMessage;
        }
        toast("error", { title: firstMessage });
        throw error;
    }
};

// Get Room Details
export const GetRoomDetails = async (token: any, id: any) => {
    try {
        const res = await API.get(`/chatrooms/${id}`, {
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