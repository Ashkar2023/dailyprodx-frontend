import clsx from "clsx";
import { useEffect, useLayoutEffect, useState, type FC } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import type { Product } from "../types/product.types";
import { readItems } from "@directus/sdk";
import { useDirectus } from "../hooks/useDirectus";
import gsap from "gsap";
import { CopyButton } from "../components/copy.button";
import { Search, TriangleAlert, X } from "lucide-react";
import { LoadingScreen } from "../components/loading";

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation();
    const directusClient = useDirectus();
    const [product, setProduct] = useState<Product>();
    const [allLinksOpen, setAllLinksOpen] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const productFromState = state?.product as Product | null;

        if (productFromState) {
            setProduct(productFromState);
            setFetching(false);
        } else {
            const request = directusClient.request(
                readItems("products", {
                    filter: { status: { _eq: "published" }, public_id: { _eq: parseInt(id!) } },
                    limit: 1,
                    // @ts-ignore 
                    fields: ["*", "images.directus_files_id", "tags.tags_id.name"]
                })
            );

            ; (async () => {
                const response = await request;
                setProduct(response[0]);
                setFetching(false);
            })()
        }

        return () => { };
    }, [])

    useLayoutEffect(() => {
        gsap.fromTo(".product-info",
            {
                opacity: 0,
                scale: 0.85,
                stagger: 0.12,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
                stagger: {
                    each: 0.1
                }
            }
        );
    }, [product]);

    const handleAllLinks = () => {
        if (allLinksOpen) {
            gsap.to("#all-links",
                {
                    top: "100%",
                    duration: 0.6,
                    ease: "power2.in"
                },
            );

            setAllLinksOpen(false);
        } else {
            gsap.to("#all-links",
                {
                    top: "0",
                    duration: 0.6,
                    ease: "power2.out"
                },
            );

            setAllLinksOpen(true);
        }
    };

    /* WRITE an error page for product not found */
    if (product === undefined && !fetching) {
        return <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <TriangleAlert className="w-12 h-12 text-red-600" />
                <h2 className="text-2xl font-semibold text-red-700">Product Not Found</h2>
                <p className="text-base text-red-500">
                    Sorry, we couldn't find the product you're looking for.<br />
                    Please check the ID and try again.
                </p>
                <NavLink to="/search" className="flex justify-center items-center gap-2 ">
                    Go to Search <Search size={16} />
                </NavLink>
            </div>
        </div>
    }

    return fetching ?
        <LoadingScreen />
        :
        <div className="h-dvh pt-14 px-4 pb-4">
            <div className="max-w-[332px] sm:max-w-4xl mx-auto h-full pt-8 pb-2">
                {/* 5×6 Bento Grid */}
                <div className="flex flex-col sm:grid grid-rows-7 sm:grid-rows-6 grid-cols-6 gap-3 md:gap-4 h-full">

                    {/* Image Tile - 3×4 (left) */}
                    <div className="h-[320px] sm:h-auto sm:col-span-3 sm:row-span-4 rounded-3xl bg-card-70 overflow-hidden product-info shadow-md shadow-black/20">
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/assets/${product?.thumbnail}`}
                            alt="Product hero"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Details Tile - 2×4 (right) */}
                    <div className="relative overflow-hidden grow min-h-0 flex flex-col row-span-3 sm:col-span-3 sm:row-span-4 rounded-3xl border border-border/50 shadow-xs shadow-black/10 bg-card-70 py-2 px-4 sm:p-6 product-info">
                        <span className="hidden sm:inline-block text-xs font-medium text-gray-400 uppercase tracking-wide">DPX #{id}</span>
                        <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold mt-2 text-gray-800 shrink-0">
                            {product?.title}
                        </h1>
                        <p className="text-gray-500 sm:mt-3 text-sm leading-relaxed flex-1 min-h-0 overflow-y-auto">
                            {product?.description}
                        </p>
                        <div className="mt-2 space-y-3">
                            <span className="text-xl sm:text-3xl font-bold text-gray-900"><span className="text-lg me-1">min</span>₹{product?.min_price}</span>
                            <div className="flex gap-2 sm:mt-2">
                                <CopyButton
                                    url={product?.affiliate_urls[0].url!}
                                    className="flex-4/6 bg-black text-primary font-semibold py-3 rounded-2xl"
                                >
                                    Copy link to Best deal
                                </CopyButton>
                                <button
                                    className="flex-2/6 bg-slate-300/40 border border-border/50 font-semibold py-3 rounded-2xl hover:opacity-90 transition-all active:scale-95 cursor-pointer"
                                    onClick={handleAllLinks}
                                >
                                    All links
                                </button>
                            </div>
                        </div>

                        {/* URL list */}
                        <div
                            className="w-full h-full z-20 top-full border border-border/50 left-0 absolute bg-card rounded-3xl flex flex-col p-4"
                            id="all-links"
                        >
                            <div className="flex justify-between mb-3">
                                <h3 className="font-semibold text-gray-800 items-center">All Links</h3>
                                <button onClick={handleAllLinks} className="cursor-pointer"><X size={20} /></button>
                            </div>
                            <ul className="flex-1 overflow-y-auto space-y-2">
                                {product?.affiliate_urls.map((link, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-border"
                                    >
                                        <img src={`/${link.platform.toLowerCase()}-icon.svg`} alt="" className="size-5" />
                                        <span className="font-medium text-gray-700 flex-1">
                                            {link.platform}
                                        </span>
                                        {link.label && (
                                            <span className="px-2 py-0.5 text-xs font-medium bg-slate-200/70 text-gray-700 rounded-full">
                                                {link.label}
                                            </span>
                                        )}
                                        <CopyButton
                                            url={link.url}
                                            className="px-3 py-1.5 text-sm bg-black text-primary font-medium rounded-xl"
                                        >
                                            Copy
                                        </CopyButton>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Tags Tile - 2×2 */}
                    <div className="hidden sm:col-span-2 sm:row-span-2 rounded-3xl border border-border/50 shadow-xs shadow-black/10 bg-card-70 p-5 sm:flex flex-col gap-3 product-info">
                        <h3 className="font-medium text-gray-700">Tags</h3>
                        <div className="flex flex-wrap gap-2 overflow-y-scroll h-full items-start content-start">
                            {product?.tags.map(t => {
                                const tagname = t.tags_id.name;
                                return (
                                    <NavLink
                                        to={`/browse/${tagname}`}
                                        className="items-center px-3 py-1.5 text-xs font-medium bg-slate-200 text-gray-600 rounded-full border border-slate-200 hover:bg-gray-300 "
                                    >
                                        {tagname}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>

                    {/* Bottom Right Tile - 3×2 */}
                    <div className="hidden sm:col-span-4 sm:row-span-2 rounded-3xl border border-border/50 shadow-xs shadow-black/10 bg-card-70 p-5 sm:flex justify-center items-center product-info">
                        <h3 className="text-sm text-gray-700">No suggested products found</h3>
                    </div>

                </div>
            </div>
        </div>
};

