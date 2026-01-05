import clsx from "clsx";
import { useEffect, useLayoutEffect, useState, type FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Product } from "../types/product.types";
import { readItems } from "@directus/sdk";
import { useDirectus } from "../hooks/useDirectus";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import gsap from "gsap";

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation();
    const directusClient = useDirectus();
    const [product, setProduct] = useState<Product>();
    const { copied, copyToClipboard } = useCopyToClipboard();

    useEffect(() => {
        const productFromState = state?.product as Product | null;

        if (productFromState) {
            // setProduct(productFromState);
        } else {
            const request = directusClient.request(
                readItems("products", {
                    filter: { status: { _eq: "published" }, public_id: { _eq: parseInt(id!) } },
                    // @ts-ignore 
                    fields: ["*", "images.directus_files_id", "tags.tags_id.name"]
                })
            );

            ; (async () => {
                const response = await request;
                setProduct(response[0]);
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
    }, []);


    return (
        <div className="h-screen sm:pt-14 px-4 pb-4 box-border">
            <div className="max-w-4xl mx-auto h-full pt-8 pb-2">
                {/* 5×6 Bento Grid */}
                <div className="grid grid-cols-5 grid-rows-6 gap-3 md:gap-4 h-full">

                    {/* Hero Tile - 3×4 (left) */}
                    <div className="col-span-3 row-span-4 rounded-3xl bg-card overflow-hidden product-info shadow-md shadow-black/20">
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/assets/${product?.thumbnail}`}
                            alt="Product hero"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Tall Tile - 2×4 (right) */}
                    <div className="col-span-2 row-span-4 rounded-3xl border border-border/50 shadow-xs shadow-black/10 bg-card p-6 flex flex-col product-info">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">DPX #{id}</span>
                        <h1 className="text-2xl md:text-2xl font-semibold mt-2 text-gray-800">
                            {product?.title}
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed flex-1">
                            {product?.description}
                        </p>
                        <div className="mt-auto space-y-3">
                            <span className="text-3xl font-bold text-gray-900">{product?.price_range}</span>
                            <button
                                onClick={() => product && copyToClipboard(product.affiliate_urls.filter(l => l.best)[0].url)}
                                className={clsx(
                                    "relative w-full bg-black text-primary font-semibold py-3 rounded-2xl hover:opacity-90 transition-all active:scale-95 cursor-pointer",
                                    "after:content-['Copied!'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:bg-black after:rounded-2xl after:transition-opacity after:duration-300 after:z-10",
                                    copied ? "after:opacity-100" : "after:opacity-0 after:pointer-events-none"
                                )}
                            >
                                Copy link to Best deal
                            </button>
                        </div>
                    </div>

                    {/* Bottom Left Tile - 2×2 */}
                    <div className="col-span-2 row-span-2 rounded-3xl border border-border/50 shadow-xs shadow-black/10 bg-card p-5 flex flex-col justify-between product-info">
                        <h3 className="font-medium text-gray-700">Specifications</h3>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• 40mm Dynamic Drivers</li>
                            <li>• 30hr Battery Life</li>
                            <li>• Bluetooth 5.3</li>
                            <li>• Active Noise Cancellation</li>
                        </ul>
                    </div>

                    {/* Bottom Right Tile - 3×2 */}
                    <div className="col-span-3 row-span-2 rounded-3xl border border-border/50 shadow-xs shadow-black/10 bg-card p-5 flex flex-col justify-between product-info">
                        <h3 className="font-medium text-gray-700">Customer Reviews</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <span className="text-2xl font-bold text-gray-900">4.8</span>
                                <span className="text-yellow-500 text-lg">★★★★★</span>
                            </div>
                            <span className="text-sm text-gray-400">Based on 1,247 reviews</span>
                        </div>
                        <p className="text-sm text-gray-500 italic line-clamp-2">
                            "Absolutely stunning sound quality. The noise cancellation is top-notch
                            and the comfort is unmatched for long listening sessions."
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

