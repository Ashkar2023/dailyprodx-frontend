import { Ellipsis, Loader } from "lucide-react";
import { Card } from "../components/card";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useDirectus } from "../hooks/useDirectus";
import { readItems } from "@directus/sdk";
import type { Product } from "../types/product";


export const BrowsePage = () => {
    const arr = Array.from({ length: 50 }, () => 1);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const directusClient = useDirectus();

    const LIMIT = 12

    useEffect(() => {
        const request = directusClient.request(
            readItems("products", {
                limit: LIMIT,
                offset: 0 * LIMIT,
                filter: { status: { _eq: "published" } },
                // @ts-ignore 
                fields: ["*","images.directus_files_id"]
            })
        );

        ; (async () => {
            const response = await request;
            if (response.length < LIMIT) {
                setShowLoadMore(false);
            }
            setProducts(response);
        })()


        return () => { }
    }, []);

    return (
        <div className="flow-root min-h-[calc(100vh-90px)] sm:mt-[90px]">
            <div className="w-max mx-auto flex flex-col items-center my-4">
                <h1 className="text-lg">Curated products</h1>
                <p className="text-sm text-gray-500">Just for you!</p>
            </div>

            <div className="min-h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit mx-auto gap-3 md:gap-4 my-8">
                {
                    products.map((p) => <Card product={p} key={p.public_id}/>)
                }
            </div>

            <div className="w-max mx-auto flex items-center justify-center mb-4">
                {
                    showLoadMore &&
                    <button disabled={isLoading} className={clsx(
                        "flex text-primary bg-black py-1 px-4 text-sm leading-6 items-center gap-[6px] font-medium rounded-xl disabled:bg-black/60 cursor-pointer disabled:text-primary/70 disabled:cursor-not-allowed"
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
                }

            </div>
        </div>
    )
}