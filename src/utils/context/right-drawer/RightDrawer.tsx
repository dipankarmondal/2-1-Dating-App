// RightDrawerContext.tsx
import React, { createContext, useContext, useState } from "react";

type RightDrawerContextType = {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
};

const RightDrawerContext = createContext<RightDrawerContextType | undefined>(undefined);

export const RightDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);
    const toggleDrawer = () => setIsOpen((prev) => !prev);

    return (
        <RightDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
            {children}
        </RightDrawerContext.Provider>
    );
};

export const useRightDrawer = () => {
    const context = useContext(RightDrawerContext);
    if (!context) throw new Error("useRightDrawer must be used inside RightDrawerProvider");
    return context;
};
