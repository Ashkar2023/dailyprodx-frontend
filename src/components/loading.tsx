import { Loader2 } from "lucide-react";
import type { FC } from "react";

interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-gray-600 animate-spin" />
                <h2 className="text-2xl font-semibold text-gray-700">{message}</h2>
                <p className="text-base text-gray-500">
                    Please wait while we fetch the deal.
                </p>
            </div>
        </div>
    );
};