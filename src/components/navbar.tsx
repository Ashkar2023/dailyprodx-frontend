import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
    const navRef = useRef(null);
    const lastDirection = useRef(0);
    const { pathname } = useLocation();

    useEffect(() => {
        const navTween = gsap.fromTo(navRef.current,
            {
                y: "-150%",
                scale: 0.7,
            },
            {
                y: "0%",
                scale: 1,
                duration: 0.5,
                ease: "power3.inOut"
            }
        )

        return () => { navTween.kill(); };
    }, [])

    useEffect(() => {
        let st: ScrollTrigger;

        if (pathname === "/browse") {
            const nav = navRef.current;

            st = ScrollTrigger.create({
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
        }

        return () => {
            if(st){
                st.kill();
            }
        };
    }, []);

    return (
        <nav
            className="fixed z-50 flex justify-between gap-8 px-4 py-3 top-4 max-w-2/3 md:w-fit border border-border bg-[#FBF3DA]/30 backdrop-blur-md rounded-2xl translate-x-1/2 right-1/2 shadow-sm shadow-black/5"
            ref={navRef}
        >
            <h3 className="text-2xl font-medium self-center selection:bg-black selection:text-primary">DailyprodX</h3>
            <ul className="flex items-center gap-2 font-medium [&_a:hover]:underline [&_a:hover,&_a.active]:decoration-1 [&_a:hover,&_a.active]:underline-offset-2 [&_a.active]:underline">
                <li><NavLink to="/search">search</NavLink></li>
                <li><NavLink to="/browse">browse</NavLink></li>
                <li><NavLink to="/about">about</NavLink></li>
            </ul>

        </nav>
    )
}