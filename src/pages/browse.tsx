import { Ellipsis, Loader } from "lucide-react";
import { Card } from "../components/card";
import { useState } from "react";
import clsx from "clsx";


export const BrowsePage = () => {
    const arr = Array.from({ length: 50 }, () => 1);
    const [isLoading, setLoading] = useState<boolean>(false);

    return (
        <div className="flow-root min-h-full sm:mt-[90px]">
            <div className="w-max mx-auto flex flex-col items-center my-4">
                <h1 className="text-lg">Curated products</h1>
                <p className="text-sm text-gray-500">Just for you!</p>
            </div>

            <div className="min-h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit mx-auto gap-3 md:gap-4 my-8">
                {
                    arr.map(() => <Card />)
                }
            </div>

            <div className="w-max mx-auto flex items-center justify-center mb-4">
                <button disabled={isLoading} className={clsx(
                    "flex text-primary bg-black py-1 px-4 text-sm leading-6 items-center gap-[6px] font-medium rounded-xl disabled:bg-black/60  disabled:text-primary/70 disabled:cursor-not-allowed"
                )}
                >
                    {
                        isLoading ?
                            (
                                <>
                                    Loading
                                    <Loader className="animate-spin" size={14} />
                                </>
                            ) :
                            (
                                <>
                                    Load more
                                    <Ellipsis size={14} />
                                </>
                            )
                    }
                </button>
            </div>
        </div>
    )
}