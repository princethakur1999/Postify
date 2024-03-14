import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import OtpInput from 'react-otp-input';

import Processing from '../components/Processing';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Signup() {

    const navigate = useNavigate();

    const [signupDetails, setSignupDetails] = useState({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" });

    const [otp, setOtp] = useState(false);

    const [processing, setProcessing] = useState(false);

    const [isOtpSent, setIsOtpSent] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    function changeHandler(e) {

        e.preventDefault();

        const { name, value } = e.target;

        setSignupDetails((prev) => ({ ...prev, [name]: value }));
    }


    async function signupHandler(e) {

        try {

            e.preventDefault();

            setProcessing(true);

            const response = await axios.post(`${BASE_URL}/otp/${signupDetails.email}`);


            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setIsOtpSent(true);

            toast.success(response.data.message);

            console.log(response.data);

        } catch (e) {

            toast.error(e.response.data.message);

            console.log("Error in SignUp", e);
        }
        finally {
            setProcessing(false);
        }
    }


    async function verifyOtp() {

        try {

            setProcessing(true);

            const formData = new FormData();

            formData.append('firstname', signupDetails.firstname);
            formData.append('lastname', signupDetails.lastname);
            formData.append('email', signupDetails.email);
            formData.append('password', signupDetails.password);
            formData.append('confirmPassword', signupDetails.confirmPassword);
            formData.append('otp', otp);

            const response = await axios.post(`${BASE_URL}/signup`, formData);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            navigate('/login');

        } catch (e) {

            window.location.reload();

            toast.error(e.response.data.message);

            console.log(e.message);
        }
        finally {

            setProcessing(false);
        }

    }


    return (

        <div className="bg-3 h-auto w-[98%] sm:w-[25%] border bg-white dark:bg-slate-900 sm:border flex flex-col justify-start items-center gap-4 rounded-lg mt-24 py-8">


            <h2 className="text-blue-800 text-2xl font-bold mb-2">
                {
                    !isOtpSent ? "Create an Account" : "Enter OTP"
                }
            </h2>

            <div className="w-[80%] h-[2px] bg-blue-800"></div>



            {
                !isOtpSent ?
                    (
                        <form
                            className="h-[100%] w-[80%] flex flex-col justify-center items-center mt-4 gap-y-4"
                            onSubmit={signupHandler}>


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
                                    value={signupDetails.confirmPassword}
                                    onChange={changeHandler}
                                    required
                                />


                                <span className="text-blue-800 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {
                                        showConfirmPassword ? (<FaEye />) : (<FaEyeSlash />)
                                    }
                                </span>

                            </div>


                            {
                                !processing &&
                                <button className="bg-4 w-[100%] cursor-pointer focus-within:outline-none text-lg text-white font-bold text-center rounded-full mt-6 py-1">
                                    Signup
                                </button>
                            }

                            {
                                processing &&
                                <Processing />
                            }

                        </form>
                    )
                    :
                    (
                        <div className="w-[80%] flex flex-col justify-center items-center gap-8">

                            <OtpInput
                                value={otp}
                                onChange={(newOtp) => setOtp(newOtp)}
                                numInputs={4}
                                inputType="text"
                                renderSeparator={<span className="mx-4"></span>}
                                placeholder="----"
                                renderInput={(inputProps) => (

                                    <input {...inputProps} className="text-4xl text-blue-800 text-center border rounded-md focus:outline-none focus:border-blue-500" />
                                )}
                            />


                            <p onClick={signupHandler} className="w-[100%] text-slate-900 underline font-bold text-center cursor-pointer" >
                                Resend OTP
                            </p>

                            {
                                !processing &&
                                <button onClick={verifyOtp} className="bg-4 w-[100%] cursor-pointer focus-within:outline-none text-lg text-white font-bold text-center rounded-full mt-6 py-1">Verify</button>
                            }
                            {
                                processing &&
                                <Processing />
                            }
                        </div>



                    )
            }

        </div >
    )
}
