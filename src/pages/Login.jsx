import { useState } from "react";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


import Button from "../components/Button";



export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });


    function changeHandler(e) {

        const { name, value } = e.target;

        e.preventDefault();

        setLoginDetails((prev) => ({ ...prev, [name]: value }));
    }


    async function submitHandler(e) {

        e.preventDefault();
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
                    name="email"
                    placeholder="Email"
                    value={loginDetails.email}
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

                <Button text="Login" />

            </form>
        </div>
    )
}
