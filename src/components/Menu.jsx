import { Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { LuActivity } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { setToken } from "../slices/userSlice";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export default function Menu() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function logoutHandler(e) {

        e.preventDefault();

        localStorage.removeItem("token");

        setToken(null);

        navigate('/login');

        toast.success("Logged out successfully.");
    }

    return (

        <div className="h-[100vh] w-[60vw] md:w-[12vw] bg-blue-800 flex flex-col justify-center items-center gap-6 shadow-md fixed right-0 top-0 bottom-0 -z-40">


            {
                token &&
                <>
                    <Link to="/" className="text-white text-2xl">
                        <FaHome />
                    </Link>

                    <Link to="/search" className="text-white text-2xl">
                        <FaSearch />
                    </Link>

                    <Link to="/profile" className="text-white text-2xl">
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

                    <p className="text-white text-2xl cursor-pointer" onClick={logoutHandler}>
                        <FaPowerOff />
                    </p>

                    <Link to="/setting" className="text-white text-2xl">
                        <IoSettingsSharp />
                    </Link>
                </>
            }

            {
                !token &&
                <>
                    <Link to="/signup" className="w-[60%] text-center text-blue-800 font-bold text-md bg-white rounded-full px-2">
                        Signup
                    </Link>

                    <Link to="/login" className="w-[60%] text-center text-blue-800 font-bold text-md bg-white rounded-full px-2">
                        Login
                    </Link>
                </>
            }

        </div>

    )
}
