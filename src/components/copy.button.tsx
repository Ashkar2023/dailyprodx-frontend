import clsx from "clsx";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useState, type FC } from "react";
import { Sparkles, SquareArrowOutUpRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface CopyButtonProps {
    url: string;
    children: React.ReactNode;
    className?: string;
    platform?: string;
    hideCopiedAnimation?: boolean;
    showIconInstead?: boolean;
}

export const CopyButton: FC<CopyButtonProps> = ({ url, children, className, platform, hideCopiedAnimation = false, showIconInstead = false }) => {
    const { copied, copyToClipboard } = useCopyToClipboard();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        // Copy to clipboard
        await copyToClipboard(url);
        
        // Show toast with Sparkles icon
        toast.success("Link copied!", {
            icon: <Sparkles size={16} />,
        });

        // Start loading state
        setIsLoading(true);

        // Wait 2 seconds then open link in new tab
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
            setIsLoading(false);
        }, 700);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={clsx(
                "relative cursor-pointer transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                !hideCopiedAnimation && "after:content-['Copied!'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:bg-inherit after:rounded-[inherit] after:transition-opacity after:duration-300 after:z-15",
                !hideCopiedAnimation && (copied ? "after:opacity-100" : "after:opacity-0 after:pointer-events-none"),
                className
            )}
        >
            {platform && (
                <img 
                    src={`/${platform.toLowerCase()}-icon.svg`} 
                    alt={platform} 
                    className="size-5" 
                />
            )}
            {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
            ) : showIconInstead ? (
                <SquareArrowOutUpRight size={14} />
            ) : (
                children
            )}
        </button>
    );
};