import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/navbar";

export const RootLayout = () => {
    const { pathname } = useLocation();

    const isNotFound = pathname === "/lost";

    return (
        <div className={"h-dvh w-screen bg-primary " + (isNotFound ? "animate-turn-red":"")}>
            <Navbar />
            <Outlet />
        </div>
    )
};
