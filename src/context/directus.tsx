import { createContext, type ReactNode } from "react";
import { createDirectus, rest } from "@directus/sdk";
import type { Product, Ranking } from "../types/product.types";

const directus = createDirectus<{
    products: Product[],
    rankings: Ranking[]
}>(import.meta.env.VITE_API_BASE_URL).with(rest());

export type DirectusClient = typeof directus;

export const DirectusContext = createContext<DirectusClient | null>(null);

export const DirectusProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DirectusContext.Provider value={directus}>
            {children}
        </DirectusContext.Provider>
    );
};