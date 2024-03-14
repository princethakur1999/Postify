import { useState, useEffect } from "react"

import { Link } from "react-router-dom";


import { MdLightMode, MdDarkMode } from "react-icons/md";
import { TfiMenu } from "react-icons/tfi";
import { FaWindowClose } from "react-icons/fa";

import Menu from "./../components/Menu";


export default function Header() {

    const [isDark, setIsDark] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {

        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark") {

            document.documentElement.classList.add("dark");

            setIsDark(true);

        } else {

            document.documentElement.classList.remove("dark");

            setIsDark(false);
        }

    }, []);

    function handleLightDarkMode() {

        const newTheme = isDark ? "light" : "dark";

        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.toggle("dark");

        setIsDark(!isDark);
    }

    function handleMenu(e) {

        e.preventDefault();

        setIsMenuOpen(!isMenuOpen);
    }


    return (


        <nav className="h-[64px] w-[100%] bg-4 flex justify-between items-center px-2 z-40 fixed top-0 right-0 left-0">



            <div className="h-[60%] w-[30%] sm:w-[10%] flex justify-center items-center bg-blue-800 text-white">
                <Link to="/" className="text-xl sm:text-2xl text-center">Postify</Link>
            </div>




            <div className="w-[30%] sm:w-[14%] h-[60%] flex justify-between items-center">

                <div className="text-2xl text-white cursor-pointer" onClick={handleLightDarkMode}>
                    {
                        isDark ? <MdLightMode /> : <MdDarkMode />
                    }
                </div>


                <div className={`text-2xl text-white cursor-pointer`} onClick={handleMenu}>
                    {
                        isMenuOpen ? (<FaWindowClose />) : (<TfiMenu />)
                    }
                </div>
            </div>

            {
                isMenuOpen && <Menu />
            }


        </nav>
    );
}
