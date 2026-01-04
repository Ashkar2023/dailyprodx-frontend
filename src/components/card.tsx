import type { FC } from "react"

const copySvg = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>;


export const Card: FC = () => {
    const seed = Math.floor(Math.random() * 100);
    return (
        <div className="flex flex-col w-[160px] sm:max-w-none sm:w-[200px] h-60 sm:h-64 p-2 space-y-2 bg-white/80 rounded-3xl border border-border shadow-xs shadow-black/10 hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer" data-card>
            <img className="h-2/3 w-full object-cover rounded-2xl" src={"https://picsum.photos/id/" + seed + "/600/800"} alt="" data-card-image />
            <div data-card-body className="flex flex-col grow">
                <div className="" data-card-content>
                    <h3 className="text-sm sm:text-base leading-5 text-gray-700 line-clamp-2 mb-1">Heading is to be done for now and i am not</h3>
                </div>
                <div className="flex items-stretch grow gap-1" data-card-footer>
                    <p className="rounded-xl sm:rounded-2xl border border-border/70 flex grow justify-center items-center text-xs font-medium text-gray-500 ">₹1k - ₹5k</p>
                    <button className="rounded-full bg-black px-2 text-primary font-medium gap-2 flex justify-center items-center">{copySvg}</button>
                </div>
            </div>
        </div>
    )
}