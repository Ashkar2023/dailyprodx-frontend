import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/root.layout";
import { IdSearch } from "../components/idSearch";
import { NotFoundPage } from "../pages/notFound";
import { BrowsePage } from "../pages/browse";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "search",
                element: <IdSearch />,
            },
            {
                path: "browse",
                element: <BrowsePage/>
            },
            {
                path:"lost",
                element: <NotFoundPage/>,                
            },
            {
                path:"*",
                element: <Navigate to="lost" replace/>,                
            }
        ]
    }
]);
