import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/root.layout";
import { IdSearch } from "../components/idSearch";
import { NotFoundPage } from "../pages/notFound";
import { BrowsePage } from "../pages/browse";
import { ProductPage } from "../pages/product";

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
                path: "browse",
                element: <BrowsePage/>
            },
            {
                path: "p/:id",
                element: <ProductPage/>
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
