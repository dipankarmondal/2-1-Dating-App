import axios from "axios";

export const API = axios.create({
    baseURL: "http://174.138.122.168",
    headers: { "Content-Type": "application/json" },
});

export const SocketURL = "http://174.138.122.168";