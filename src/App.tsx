import { RouterProvider } from "react-router-dom"
import { router } from "./index.routes"
import { DirectusProvider } from "./context/directus"
import { Toaster } from "react-hot-toast"

export const App = () => {
    return (
        <DirectusProvider>
            <Toaster
                containerStyle={{
                    zIndex: 45,
                    top: 80
                }}
                toastOptions={{
                    style: {
                        background: "rgba(253, 246, 224, 0.7)",
                        backdropFilter: "blur(12px)",
                        color: "#000",
                        fontWeight: "500",
                        border: "1px solid var(--color-border)",
                        borderRadius: "0.7rem",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        padding: "2px 8px"
                    }
                }}
            />
            <RouterProvider router={router} />
        </DirectusProvider>
    )
}