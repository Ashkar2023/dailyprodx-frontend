import { useParams } from "react-router-dom";

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="h-screen sm:pt-14 px-4 pb-4 box-border">
            <div className="max-w-4xl mx-auto h-full pt-8 pb-2">
                {/* 5×6 Bento Grid */}
                <div className="grid grid-cols-5 grid-rows-6 gap-3 md:gap-4 h-full">
                    
                    {/* Hero Tile - 3×4 (left) */}
                    <div className="col-span-3 row-span-4 rounded-3xl border border-border/50 shadow-xs shadow-black/5 bg-card overflow-hidden">
                        <img 
                            src="https://placehold.co/600x800" 
                            alt="Product hero" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Tall Tile - 2×4 (right) */}
                    <div className="col-span-2 row-span-4 rounded-3xl border border-border/50 shadow-xs shadow-black/5 bg-card p-6 flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Product #{id}</span>
                        <h1 className="text-2xl md:text-3xl font-semibold mt-2 text-gray-800">
                            Premium Wireless Headphones
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed flex-1">
                            Experience crystal-clear audio with our flagship noise-cancelling headphones. 
                            Designed for comfort during extended listening sessions with premium materials 
                            and exceptional build quality.
                        </p>
                        <div className="mt-auto space-y-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">₹12,999</span>
                                <span className="text-sm text-gray-400 line-through">₹18,999</span>
                            </div>
                            <button className="w-full bg-black text-primary font-medium py-3 rounded-2xl hover:opacity-90 transition-opacity">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Bottom Left Tile - 2×2 */}
                    <div className="col-span-2 row-span-2 rounded-3xl border border-border/50 shadow-xs shadow-black/5 bg-card p-5 flex flex-col justify-between">
                        <h3 className="font-medium text-gray-700">Specifications</h3>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• 40mm Dynamic Drivers</li>
                            <li>• 30hr Battery Life</li>
                            <li>• Bluetooth 5.3</li>
                            <li>• Active Noise Cancellation</li>
                        </ul>
                    </div>

                    {/* Bottom Right Tile - 3×2 */}
                    <div className="col-span-3 row-span-2 rounded-3xl border border-border/50 shadow-xs shadow-black/5 bg-card p-5 flex flex-col justify-between">
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

