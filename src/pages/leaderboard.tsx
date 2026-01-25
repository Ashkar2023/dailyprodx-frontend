import React, { useEffect, useState } from 'react';
import type { Ranking } from '../types/product.types';
import { useDirectus } from '../hooks/useDirectus';
import { useLocation, useNavigate } from 'react-router';
import { customEndpoint } from '@directus/sdk';

interface ModifiedRanking extends Ranking {
    total: number
}

export const RankingsTable: React.FC = () => {
    const [rankings, setRankings] = useState<ModifiedRanking[]>([]);
    const directusClient = useDirectus();
    const { search } = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(search);
    let token: string | null = null;

    useEffect(() => {
        const request = directusClient.request(customEndpoint<Ranking[]>({
            method: "GET",
            path: "/items/rankings",
            params: {
                token,
                fields: "*,image.directus_files_id"
            },
        }));

        (async () => {
            try {
                const response = await request;
                const sortedRankings: ModifiedRanking[] = response.map(u => ({
                    ...u,
                    total: u.product_count * 15
                })).sort((a, b) => b.total - a.total);
                setRankings(sortedRankings);
            } catch {
                navigate("/browse", { replace: true });
            }
        })();
    }, []);

    return (
        <div className="h-dvh flex flex-col pt-22 pb-4">
            {/* Title */}
            <div className="py-4 text-center font-medium text-xl shrink-0">
                Leaderboard
            </div>

            {/* Card */}
            <div className="max-w-[332px] sm:max-w-lg mx-auto flex-1 min-h-0 flex flex-col rounded-3xl bg-card-70 border border-border shadow-sm shadow-black/10 overflow-hidden">

                {/* Table header */}
                <div className="flex items-center gap-4 px-6 py-2 bg-[#FBF3DA]/30 backdrop:blur-sm border-b border-border text-sm sm:text-base font-medium shrink-0">
                    <div className="w-24 h-1"></div>
                    <div className="w-24 text-center">Products</div>
                    <div className="w-32 text-center text-green-400">Total</div>
                </div>

                {/* Scrollable list */}
                <div className="flex-1 min-h-0 overflow-y-scroll ranking-list relative over">
                    {rankings.map((person) => (
                        <div
                            key={person.id}
                            className="flex items-center gap-4 px-6 py-4 border-b border-gray-700/10 last:border-0"
                        >
                            <div className='h-16 md:h-14 avatar-wrapper'>
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}/assets/${person.avatar}?key=thumb-sm`}
                                    alt={person.name}
                                    className="h-full object-contain scale-150"
                                />
                            </div>
                            <div className="grow"></div>
                            <div className="w-24 text-center">{person.product_count}</div>
                            <div className="w-24 text-center font-semibold text-green-500">
                                ₹{person.total}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
