import axios from "axios";

export const API = axios.create({
    // baseURL: "http://174.138.122.168",
    baseURL: "https://api.desicouplesz.com",
    headers: { "Content-Type": "application/json" },
});

export const SocketURL = "https://api.desicouplesz.com";
// export const SocketURL = "http://174.138.122.168";