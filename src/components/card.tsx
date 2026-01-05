import type { FC } from "react";
import type { Product } from "../types/product.types";
import { Check, ClipboardCheck, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

type Props = {
    product: Product
}

export const Card: FC<Props> = ({ product }) => {
    const { copied, copyToClipboard } = useCopyToClipboard();

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await copyToClipboard(product.affiliate_urls.filter(l => l.best)[0].url);
        toast.success("Best Link copied to clipboard.", {
            icon: <Check />,
            id: product.public_id.toString()
        });
    };


    const images = product.images.map(i => i.directus_files_id);

    return (
        <div
            className="flex flex-col w-[160px] sm:max-w-none sm:w-[200px] h-60 sm:h-64 p-2 space-y-2 bg-white/80 rounded-3xl border border-border shadow-xs shadow-black/10 hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer"
            data-card
            data-public-id={product.public_id}
        >
            <img className="h-2/3 w-full object-cover rounded-2xl bg-black/35" src={`${import.meta.env.VITE_API_BASE_URL}/assets/${product.thumbnail}`} alt="" data-card-image />
            <div data-card-body className="flex flex-col grow">
                <div className="" data-card-content>
                    <h3 className="text-sm sm:text-base font-medium px-1 leading-5 text-gray-700 line-clamp-2 mb-1">{product.title}</h3>
                </div>
                <div className="flex items-stretch grow gap-1" data-card-footer>
                    <p className="rounded-xl sm:rounded-2xl border border-border/70 flex grow justify-center items-center text-xs font-medium text-green-600 ">{product.price_range}</p>
                    <button
                        className="rounded-full bg-black min-w-7 relative text-primary font-medium gap-2 flex justify-center items-center cursor-pointer hover:grow hover:bg-black/85 transition-all active:scale-90"
                        onClick={handleCopy}
                        data-copy
                    >
                        <Copy
                            className="absolute transition-[stroke-dashoffset] duration-200"
                            size={12}
                            strokeDasharray={80}
                            strokeDashoffset={copied ? 80 : 0}
                        />
                        <ClipboardCheck
                            className="absolute transition-[stroke-dashoffset] duration-500"
                            size={14}
                            strokeWidth={2}
                            strokeDasharray={60}
                            strokeDashoffset={copied ? 0 : -60}
                            color="limegreen"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}