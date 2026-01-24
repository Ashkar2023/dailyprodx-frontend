import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts/root.layout";
import { IdSearch } from "./components/idSearch";
import { NotFoundPage } from "./pages/notFound";
import { BrowsePage } from "./pages/browse";
import { ProductPage } from "./pages/product";
import { SearchPage } from "./pages/search";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { RankingsTable } from "./pages/leaderboard";

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
                element: <SearchPage />,
            },
            {
                path: "browse",
                element: <BrowsePage/>
            },
            {
                path: "products",
                element: <Navigate to="browse" replace/>
            },
            {
                path: "products/:id",
                element: <ProductPage/>
            },
            {
                path:"lost",
                element: <NotFoundPage/>,                
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />,
            },
            {
                path:"leaderboard",
                element: <RankingsTable/>
            },
            {
                path:"*",
                element: <Navigate to="lost" replace/>,                
            }
        ]
    }
]);
