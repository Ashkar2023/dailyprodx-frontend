import { Link } from "react-router-dom"

const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>

export const Navbar = () => {
    return (
        <div className="fixed flex justify-between gap-8 px-4 py-3 md:top-4 md:max-w-4/12 border border-gray-300 bg-gray-200/10 backdrop-blur-xl rounded-2xl translate-x-1/2 right-1/2 shadow-sm shadow-black/5">
            <h3 className="text-2xl font-medium self-center selection:bg-black selection:text-primary">DailyprodX</h3>
            <ul className="flex items-center gap-2 font-medium *:hover:underline">
                <li><Link to="/search">search</Link></li>
                <li><Link to="/browse">browse</Link></li>
                <li><Link to="/about">about</Link></li>
            </ul>
        </div>
    )
}