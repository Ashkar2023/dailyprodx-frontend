import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";


export const IdSearch = () => {
    const searchWrapperRef = useRef(null);
    const [searchValue, setSearchVvalue] = useState<string>("");

    useEffect(() => {
        const fadeAndScale = gsap.fromTo(searchWrapperRef.current,
            {
                scale: 0.85,
                opacity: 0,
                filter: "blur(3px)"
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                delay: 0.3,
                filter: "blur(0px)",
                ease: "power2.out"
            }
        )

        return () => { fadeAndScale.kill() };
    }, []);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || /^\d+$/.test(e.target.value)) {
            setSearchVvalue(e.target.value);
        } else {
            toast.error("Enter a number. Genius", {
                id:"id-validation-error",
                icon:"😏"
            });
        }
    }

    return (
        <div ref={searchWrapperRef}>
            <div className="mb-6 text-center bloom">
                <p className="text-xl font-medium text-black">
                    Enter product ID
                </p>
                <p className="text-[15px] text-gray-500">
                    You would've found it in our Instagram reels
                </p>
            </div>

            <div className="flex max-h-32 items-center justify-center">
                <p className="text-9xl text-black select-none">#</p>
                <input
                    type="text"
                    name="id"
                    maxLength={2} 
                    className="text-8xl text-center font-bold max-w-[120px] h-[100px] outline-none uppercase border-b"
                    value={searchValue}
                    onChange={onChangeHandler}
                />
            </div>

            <div className="flex justify-center mt-6">
                <button className={clsx(
                    "bg-black text-primary font-semibold py-2 px-8 rounded-xl hover:opacity-90 transition-all active:scale-95 cursor-pointer",
                    (searchValue.length < 1) && "opacity-0 invisible"
                )}
                >Find</button>
            </div>
        </div>
    )
}