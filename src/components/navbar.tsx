import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
    const navRef = useRef(null);
    const lastDirection = useRef(0);

    useEffect(() => {
        const navTween = gsap.fromTo(navRef.current,
            { y: "-150%" },
            {
                y: "0%",
                duration: 0.5,
                ease:"power3.inOut"
            }
        )

        return () => { navTween.kill(); };
    }, [])

    useEffect(() => {
        const nav = navRef.current;

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                // Only animate when direction changes
                if (self.direction === lastDirection.current) return;
                lastDirection.current = self.direction;

                if (self.direction === 1) {
                    gsap.to(nav, {
                        y: "-150%",
                        scale: 0.7,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    });
                } else {
                    gsap.to(nav, {
                        y: "0%",
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    });
                }
            }
        });

        return () => ScrollTrigger.killAll();
    }, []);

    return (
        <nav
            className="fixed z-50 flex justify-between gap-8 px-4 py-3 top-4 max-w-2/3 md:w-auto border border-border bg-gray-300/10 backdrop-blur-md rounded-2xl translate-x-1/2 right-1/2 shadow-sm shadow-black/5"
            ref={navRef}
        >
            <h3 className="text-2xl font-medium self-center selection:bg-black selection:text-primary">DailyprodX</h3>
            <ul className="flex items-center gap-2 font-medium *:hover:underline *:hover:decoration-1 *:hover:underline-offset-2 ">
                <li><Link to="/search">search</Link></li>
                <li><Link to="/browse">browse</Link></li>
                <li><Link to="/about">about</Link></li>
            </ul>

        </nav>
    )
}