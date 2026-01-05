import { useEffect, useState } from "react";

export const useCopyToClipboard = (resetDelay = 3000) => {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
        }, resetDelay);

        return () => clearTimeout(timeout);
    }, [copied, resetDelay]);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
    };

    return { copied, copyToClipboard };
};

