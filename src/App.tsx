import { RouterProvider } from "react-router-dom"
import { router } from "./routes/index.routes"
import { DirectusProvider } from "./context/directus"

export const App = () => {
    return (
        <DirectusProvider>
            <RouterProvider router={router} />
        </DirectusProvider>
    )
}