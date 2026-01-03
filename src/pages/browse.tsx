import { Card } from "../components/card"

export const BrowsePage = () => {
    return (
        <div className="min-h-full sm:pt-[90px]">
            <div className="w-max mx-auto flex flex-col items-center my-4">
                <h1 className="text-lg">Curated products</h1>
                <p className="text-sm text-gray-500">Just for you!</p>
            </div>

            <div className="min-h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit mx-auto gap-3 md:gap-4 my-8">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}