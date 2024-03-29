import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Processing from '../components/Processing';

import axios from "axios";

import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loginDetails, setLoginDetails] = useState({ userid: "", password: "" });

    const [processing, setProcessing] = useState(false);

    function changeHandler(e) {

        const { name, value } = e.target;

        e.preventDefault();

        setLoginDetails((prev) => ({ ...prev, [name]: value }));
    }


    async function submitHandler(e) {

        try {

            e.preventDefault();

            setProcessing(true);

            const response = await axios.post(`${BASE_URL}/login`, loginDetails);

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

            console.log("DIKKAT HI BHAI!");
        }
        finally {
            setProcessing(false);
        }
    }


    return (

        <div className="h-auto w-[98%] sm:w-[25%] py-12 bg-3 border flex flex-col justify-start items-center gap-4 rounded-lg mt-28">

            <h2 className="text-blue-800  text-2xl font-bold mb-2">Login</h2>

            <div className="w-[80%] h-[2px] bg-blue-800"></div>


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


                {
                    !processing &&
                    <button className="bg-4 w-[100%] cursor-pointer focus-within:outline-none text-lg text-white font-bold text-center rounded-full mt-6 py-1">
                        Login
                    </button>
                }


                {
                    processing &&
                    <Processing />
                }
            </form>
        </div>
    )
}
