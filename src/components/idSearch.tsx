

export const IdSearch = () => {
    return (
        <div className="h-dvh w-full flex flex-col justify-center items-center">
            <div className="mb-6 text-center">
                <p className="text-xl font-medium text-black">
                    Enter product ID
                </p>
                <p className="text-sm text-gray-500">
                    You would've found it in our IG reels
                </p>
            </div>

            <div className="flex items-end">
                <p className="text-9xl text-black self-center-safe select-none">#</p>
                <input type="text" name="id" maxLength={4} className="text-[100px] min-w-[200px] w-[230px] max-w-[500px] leading-none outline-none uppercase border-b" />
            </div>
        </div>
    )
}