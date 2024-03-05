import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


import axios from "axios";

import toast from 'react-hot-toast';

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loginDetails, setLoginDetails] = useState({ userid: "", password: "" });


    function changeHandler(e) {

        const { name, value } = e.target;

        e.preventDefault();

        setLoginDetails((prev) => ({ ...prev, [name]: value }));
    }


    async function submitHandler(e) {

        try {

            e.preventDefault();

            const response = await axios.post('http://localhost:4000/login', loginDetails);

            if (!response.data.success) {

                console.log("ARE: ", response.data.message);

                throw new Error("Invalid Credentials");
            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userid", response.data.userid);


            toast.success(response.data.message);

            navigate('/profile');

        } catch (e) {

            toast.error(e.response.data.message);

            console.log(e.response.data.message);
        }
    }


    return (

        <div className="h-auto w-[100%] sm:w-[25%] py-4 bg-white dark:bg-slate-900 sm:border flex flex-col justify-start items-center gap-4 rounded-lg">

            <h2 className="text-blue-800 dark:text-white text-2xl font-bold mb-2">Login</h2>

            <div className="w-[80%] h-[2px] bg-blue-800 dark:bg-white"></div>


            <form
                className="h-[100%] w-[80%] flex flex-col justify-center items-center mt-4 gap-y-4"
                onSubmit={submitHandler}>

                <input
                    className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none border border-slate-200 text-sm rounded-lg px-4 py-2"
                    type="text"
                    name="userid"
                    placeholder="Userid"
                    value={loginDetails.userid}
                    onChange={changeHandler}
                    required
                />


                <div className="w-[100%] bg-slate-100 flex justify-between items-center border border-slate-200 rounded-lg px-2 py-2">

                    <input
                        className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none text-sm px-2"
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        placeholder="Password"
                        value={loginDetails.password}
                        onChange={changeHandler}
                        required
                    />


                    <span className="text-blue-800 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? (<FaEye />) : (<FaEyeSlash />)
                        }
                    </span>

                </div>


                <button className="bg-blue-800 w-[100%] cursor-pointer focus-within:outline-none text-lg text-white font-bold text-center rounded-full mt-6 py-1">
                    Login
                </button>

            </form>
        </div>
    )
}
