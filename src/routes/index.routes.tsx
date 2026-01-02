import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layout/root.layout";
import { IdSearch } from "../components/idSearch";
import { NotFound } from "../components/notFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index:true,
                element: <Navigate to="/search" replace/>,                
            },
            {
                path: "search",
                element: <IdSearch />,
            },
            {
                path:"lost",
                element: <NotFound/>,                
            },
            {
                path:"*",
                element: <Navigate to="lost" replace/>,                
            }
        ]
    }
]);
