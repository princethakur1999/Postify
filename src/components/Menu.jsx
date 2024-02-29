import { Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { LuActivity } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";


export default function Menu() {

    return (

        <div className="h-[100vh] w-[60vw] md:w-[12vw] bg-blue-800 flex flex-col justify-center items-center gap-6 shadow-md fixed right-0 top-0 bottom-0 -z-50">

            <Link to="/" className="text-white text-2xl">
                <FaHome />
            </Link>

            <Link to="/search" className="text-white text-2xl">
                <FaSearch />
            </Link>

            <Link to="user" className="text-white text-2xl">
                <FaUser />
            </Link>

            <Link to="/message" className="text-white text-2xl">
                <FaMessage />
            </Link>

            <Link to="/notifications" className="text-white text-2xl">
                <IoIosNotifications />
            </Link>

            <Link to="/activity" className="text-white text-2xl">
                <LuActivity />
            </Link>

            <Link to="/logout" className="text-white text-2xl">
                <FaPowerOff />
            </Link>

            <Link to="/setting" className="text-white text-2xl">
                <IoSettingsSharp />
            </Link>

            <Link to="/signup" className="w-[60%] text-center text-blue-800 font-bold text-md bg-white rounded-full px-2">
                Signup
            </Link>

            <Link to="/login" className="w-[60%] text-center text-blue-800 font-bold text-md bg-white rounded-full px-2">
                Login
            </Link>

        </div>

    )
}
