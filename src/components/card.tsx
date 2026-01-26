import type { FC } from "react";
import type { Product } from "../types/product.types";
import { Sparkles, SquareArrowOutUpRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useState } from "react";

type Props = {
    product: Product
}

export const Card: FC<Props> = ({ product }) => {
    const { copyToClipboard } = useCopyToClipboard();
    const [isLoading, setIsLoading] = useState(false);
    const bestUrl = product.affiliate_urls.filter(l => l.best)[0] || product.affiliate_urls[0];

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!bestUrl) return;
        
        // Copy to clipboard
        await copyToClipboard(bestUrl.url);
        
        // Show toast with Sparkles icon
        toast.success("Link copied!", {
            icon: <Sparkles size={16} />,
            id: product.public_id.toString()
        });

        // Start loading state
        setIsLoading(true);

        // Wait 2 seconds then open link in new tab
        setTimeout(() => {
            window.open(bestUrl.url, '_blank', 'noopener,noreferrer');
            setIsLoading(false);
        }, 2000);
    };


    const images = product.images.map(i => i.directus_files_id);

    return (
        <div
            className="flex flex-col h-60 sm:h-64 w-[140px] xs:w-[160px] sm:w-[200px] p-2 space-y-2 bg-card-70 rounded-3xl border border-border shadow-xs shadow-black/10 hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer"
            data-card
            data-public-id={product.public_id}
        >
            <img
                className="h-2/3 w-full object-cover rounded-2xl bg-black/35"
                src={`${import.meta.env.VITE_API_BASE_URL}/assets/${product.thumbnail}?key=thumb-md`}
                alt={product.title}
                data-card-image
            />
            <div data-card-body className="flex flex-col grow">
                <div className="" data-card-content>
                    <h3 className="text-sm sm:text-base font-medium px-1 leading-5 text-gray-700 line-clamp-2 mb-1">{product.title}</h3>
                </div>
                <div className="flex items-stretch grow gap-1" data-card-footer>
                    <p className="rounded-xl sm:rounded-2xl border border-border/70 flex grow justify-center items-center text-xs font-medium text-gray-500 ">min&nbsp;&nbsp;₹{product.min_price}</p>
                    <button
                        className="rounded-full bg-[#cdd4e5] min-w-7 relative text-primary font-medium gap-2 flex justify-center items-center cursor-pointer hover:grow hover:bg-amber-600/60 transition-all active:scale-90 disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={handleCopy}
                        disabled={isLoading}
                        data-copy
                    >
                        {isLoading ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            // <SquareArrowOutUpRight size={14} />
                            <img src={`/${bestUrl.platform.toLowerCase()}-icon.svg`} width={14} alt="" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}