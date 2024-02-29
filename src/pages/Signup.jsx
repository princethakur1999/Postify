import { useState } from "react";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import Button from "../components/Button";


export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [signupDetails, setSignupDetails] = useState({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" });


    function changeHandler(e) {

        e.preventDefault();

        const { name, value } = e.target;

        setSignupDetails((prev) => ({ ...prev, [name]: value }));
    }


    function submitHandler(e) {

        e.preventDefault();

        console.log(signupDetails);
    }


    return (

        <div className="h-auto w-[100%] sm:w-[25%] py-4 bg-white dark:bg-slate-900 sm:border flex flex-col justify-start items-center gap-4 rounded-lg">


            <h2 className="text-blue-800 dark:text-white text-2xl font-bold mb-2">Signup</h2>

            <div className="w-[80%] h-[2px] bg-blue-800 dark:bg-white"></div>


            <form
                className="h-[100%] w-[80%] flex flex-col justify-center items-center mt-4 gap-y-4"
                onSubmit={submitHandler}>


                <input
                    className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none border border-slate-200 text-sm rounded-lg px-4 py-2"
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    value={signupDetails.firstname}
                    onChange={changeHandler}
                    required
                />

                <input
                    className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none border border-slate-200 text-sm rounded-lg px-4 py-2"
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={signupDetails.lastname}
                    onChange={changeHandler}
                    required
                />

                <input
                    className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none border border-slate-200 text-sm rounded-lg px-4 py-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupDetails.email}
                    onChange={changeHandler}
                    required
                />

                <div className="w-[100%] bg-slate-100 flex justify-between items-center border border-slate-200 rounded-lg px-2 py-2">

                    <input
                        className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none text-sm px-2"
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        placeholder="Password"
                        value={signupDetails.password}
                        onChange={changeHandler}
                        required
                    />


                    <span className="text-blue-800 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? (<FaEye />) : (<FaEyeSlash />)
                        }
                    </span>

                </div>

                <div className="w-[100%] bg-slate-100 flex justify-between items-center border border-slate-200 rounded-lg px-2 py-2">

                    <input
                        className="w-[100%] bg-slate-100 text-slate-600 focus-within:outline-none text-sm px-2"
                        type={`${showConfirmPassword ? 'text' : 'password'}`}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={signupDetails.confirmPassowrd}
                        onChange={changeHandler}
                        required
                    />


                    <span className="text-blue-800 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {
                            showConfirmPassword ? (<FaEye />) : (<FaEyeSlash />)
                        }
                    </span>

                </div>

                <Button text="Submit" />

            </form>

        </div>
    )
}
