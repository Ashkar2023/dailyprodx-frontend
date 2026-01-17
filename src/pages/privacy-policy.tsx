import type { FC } from "react";

export const PrivacyPolicy: FC = () => {
    return (
        <div className="min-h-dvh mx-auto">
            <div className="max-w-4/5 sm:max-w-2/3 md:max-w-1/2 mx-auto pt-24 font-light flex flex-col gap-6 mb-8 [&_h2]:font-medium [&_ul]:list-disc [&_ul]:list-inside [&>*:not(h2)]:ps-6">
                <h1 className="self-center font-medium underline underline-offset-1  decoration-1">Privacy Policy</h1>

                <h2>1. Introduction</h2>
                <p>
                    DailyprodX is a social media and affiliate marketing platform that indexes
                    and shares curated internet finds. The app integrates with the Instagram
                    Graph API to enable engagement-related features.
                </p>

                <h2>2. Information We Process</h2>
                <p>
                    DailyprodX may receive the following data from Instagram through the
                    Instagram Graph API and webhooks:
                </p>
                <ul>
                    <li>Instagram user IDs</li>
                    <li>Instagram usernames</li>
                    <li>Comments on Instagram posts</li>
                    <li>Media (post) IDs</li>
                </ul>

                <h2>3. How the Information Is Used</h2>
                <p>
                    This information is used only to:
                </p>
                <ul>
                    <li>Trigger automation or engagement-related actions</li>
                </ul>

                <h2>4. Data Storage and Retention</h2>
                <p>
                    DailyprodX does not permanently store Instagram user data.
                    All data received from Instagram is processed transiently in real time
                    and discarded immediately after use.
                </p>

                <h2>5. Data Sharing</h2>
                <p>
                    DailyprodX does not sell, share, or transfer Instagram data to third
                    parties. Data is not used for profiling or advertising purposes.
                </p>

                <h2>6. Compliance</h2>
                <p>
                    DailyprodX complies with Meta Platform Terms and Instagram Graph API
                    policies. Data access and usage are limited strictly to the permissions
                    granted by the connected Instagram account.
                </p>
            </div>
        </div>
    );
};
