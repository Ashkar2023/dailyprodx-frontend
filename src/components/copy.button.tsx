import clsx from "clsx";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import type { FC } from "react";

interface CopyButtonProps {
    url: string;
    children: React.ReactNode;
    className?: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ url, children, className }) => {
    const { copied, copyToClipboard } = useCopyToClipboard();

    return (
        <button
            onClick={() => copyToClipboard(url)}
            className={clsx(
                "relative cursor-pointer transition-all active:scale-95",
                "after:content-['Copied!'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:bg-inherit after:rounded-[inherit] after:transition-opacity after:duration-300 ",
                copied ? "after:opacity-100" : "after:opacity-0 after:pointer-events-none",
                className
            )}
        >
            {children}
        </button>
    );
};