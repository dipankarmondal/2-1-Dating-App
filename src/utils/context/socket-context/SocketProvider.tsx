/** React Imports */
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";

/** Libraries */
import { io, Socket } from "socket.io-client";

/** Local Imports */
import { useAuth } from "../auth-context/AuthContext";
import { SocketURL } from "../../api-calls/url";

/** Types */
interface SocketContextType {
    socket: Socket | null;
    socketConnected: boolean;
    handleLogout: () => void;
}

interface SocketProviderProps {
    children: ReactNode;
}

/** Create Context */
const SocketContext = createContext<SocketContextType | undefined>(undefined);

/** Main Export */
const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const { Token, logout } = useAuth();

    useEffect(() => {
        let socketInstance: Socket | null = null;

        if (Token) {
            console.log("Creating a new socket instance", SocketURL);
            socketInstance = io(SocketURL, {
                transports: ["websocket","polling"],
                auth: {
                    token: Token,
                },
            });

            // Connection established
            socketInstance.on("connect", () => {
                setSocketConnected(true);
                console.log("Connected to the server", socketInstance?.id);
            });

            // Connection error handling
            socketInstance.on("connect_error", (err: any) => {
                console.error("Connection error:", err);
                setSocketConnected(false);
            });

            socketInstance.on("error", (err: any) => {
                console.error("Socket error:", err);
                setSocketConnected(false);
            });

            // Disconnect handling
            socketInstance.on("disconnect", () => {
                setSocketConnected(false);
            });

            // Custom event: logout
            socketInstance.on("logout", () => {
                socketInstance?.disconnect();
                logout();
            });

            setSocket(socketInstance);
        }

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
                setSocket(null);
                setSocketConnected(false);
            }
        };
    }, [Token, logout]);

    /** Manual Logout Handler */
    const handleLogout = () => {
        if (socket) {
            console.log("Manual logout initiated");
            socket.disconnect();
        }
        logout();
    };

    return (
        <SocketContext.Provider value={{ socket, handleLogout, socketConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

/** Hook */
const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export { SocketProvider, useSocket };
