import { Link } from "react-router-dom"

export const NotFoundPage = () => {
    return (
        <div className="w-full h-dvh flex flex-col justify-center items-center">
           <p className="">You are lost in the upside down</p>
           <h1 className="text-9xl text-black rotate-180 scale-x-[-1]">404</h1>
           <Link to="/browse" className="h-10 content-end text-sm text-gray-800 hover:underline underline-offset-2">Go back to browse</Link>
        </div>
    )
}