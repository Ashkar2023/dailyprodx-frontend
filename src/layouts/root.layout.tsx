import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/navbar";

export const RootLayout = () => {
    const { pathname } = useLocation();

    const isNotFound = pathname === "/lost";

    return (
        <div className={"flow-root w-full bg-primary " + (isNotFound ? "animate-turn-red" : "")}>
            <Navbar />
            <Outlet />
        </div>
    )
};
