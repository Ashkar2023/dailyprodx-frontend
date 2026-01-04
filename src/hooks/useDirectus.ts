import { useContext } from "react";
import { DirectusContext, type DirectusClient } from "../context/directus";

export const useDirectus = (): DirectusClient => {
    const context = useContext(DirectusContext);
    if (!context) {
        throw new Error("useDirectus must be used within a DirectusProvider");
    }
    return context;
};