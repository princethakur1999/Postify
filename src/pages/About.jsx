import { useEffect, useState } from "react";

import { RiVerifiedBadgeLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";


import toast from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function About() {

    const navigate = useNavigate();


    const [editOpen, setEditOpen] = useState(false);

    const userid = localStorage.getItem("userid");

    const [myInfo, setMyInfo] = useState(null);

    const [availableUserid, setAvailableUserid] = useState(false);


    const [newDetails, setNewDetails] = useState({

        firstname: "",
        lastname: "",
        email: "",
        userid: "",
        isPublicAccount: "",
        phoneNumber: "",
        joinedOn: "",
        gender: "",
        describeYourselfInOneWord: "",
    });


    const getMyInfo = async () => {

        try {

            const response = await axios.get(`${BASE_URL}/profile/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setMyInfo(response.data.user);

            setNewDetails({

                firstname: response.data.user?.firstname || "",
                lastname: response.data.user?.lastname || "",
                email: response.data.user?.email || "",
                userid: response.data.user?.userid || "",
                isPublicAccount: response.data.user.isPublicAccount || "",
                phoneNumber: response.data.user.profile?.phoneNumber || "",
                gender: response.data.user.profile?.gender || "",
                describeYourselfInOneWord: response.data.user.profile?.describeYourselfInOneWord || "",
            })

            console.log(response.data.user);


        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }
    }


    const handleInputChange = async (e) => {

        e.preventDefault();

        const { name, value } = e.target;

        if (name === "userid" && value.length >= 8) {

            try {

                const response = await axios.get(`${BASE_URL}/check-userid/${value}`);

                if (!response.data.success) {

                    toast.error(response.data.message);

                    setAvailableUserid(false);

                } else {

                    toast.success(response.data.message);

                    setAvailableUserid(true);
                }

            } catch (error) {

                toast.error(error.response.data.message);

                setAvailableUserid(false);
            }
        }

        setNewDetails((prev) => ({ ...prev, [name]: value }));
    };


    const submitHandler = async (e) => {

        try {

            e.preventDefault();

            console.log(newDetails);


            const response = await axios.put(`${BASE_URL}/edit-profile/${userid}`, newDetails);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            localStorage.setItem("userid", response.data.userid);

            toast.success(response.data.message);

            navigate('/profile');

        } catch (error) {

            console.log(error);

            toast.error(e.response.data.message);

        }
    };


    const editBoxOpen = (e) => {

        e.preventDefault();

        console.log("Wait: ", myInfo);

        setEditOpen(!editOpen);

    }


    useEffect(() => {

        getMyInfo();

    }, []);


    return (

        <div className="w-[95%] sm:w-[60%] h-auto text-2xl flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-start sm:py-10 mt-24">

            {
                !editOpen &&
                <div className="w-[100%] h-auto flex flex-col justify-center items-center gap-8 bg-4 px-4 py-12 rounded-md mb-8">

                    <img className="w-[100px] h-[100px] rounded-full" src={myInfo?.profile?.profilePic ? myInfo.profile.profilePic : 'https://img.freepik.com/free-icon/user_318-749758.jpg'} alt="profilePic" />

                    <p className="text-white font-bold">About</p>

                    <div className="bg-white w-full h-[1px]"></div>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Firstname
                        </span>
                        <span className="font-semibold">
                            {myInfo?.firstname}
                        </span>
                    </p>


                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Lastname
                        </span>
                        <span className="font-semibold">
                            {myInfo?.lastname}
                        </span>
                    </p>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Email
                        </span>
                        <span className="font-semibold">
                            {myInfo?.email}
                        </span>
                    </p>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Userid
                        </span>
                        <span className="font-semibold">
                            {myInfo?.userid}
                        </span>
                    </p>


                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Public
                        </span>
                        <span className="font-semibold">
                            {myInfo?.isPublicAccount}
                        </span>
                    </p>
                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Report
                        </span>
                        <span className="font-semibold">
                            {myInfo?.reportCount}
                        </span>
                    </p>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Number
                        </span>
                        <span className="font-semibold">
                            {myInfo?.profile?.phoneNumber}
                        </span>
                    </p>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Joined On
                        </span>
                        <span className="font-semibold">

                            {
                                new Date(myInfo?.profile?.joinedOn).toLocaleString()
                            }

                        </span>
                    </p>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            Gender
                        </span>
                        <span className="font-semibold">
                            {myInfo?.profile?.gender}
                        </span>
                    </p>

                    <p className="flex justify-between items-center text-white text-left w-full text-lg">
                        <span>
                            One word
                        </span>
                        <span className="font-semibold">
                            {myInfo?.profile?.describeYourselfInOneWord}
                        </span>
                    </p>


                    <div onClick={editBoxOpen} className="flex justify-evenly px-2 py-1 mt-4 items-center gap-2 w-[120px] font-bold text-lg cursor-pointer bg-white text-slate-900 hover:text-blue-800 rounded-md">
                        <p>Edit</p>
                        <FaEdit />
                    </div>


                </div>
            }


            {
                editOpen &&
                <form onSubmit={submitHandler} className="w-[100%] bg-4 px-8 h-full grid grid-cols-1 justify-items-center gap-y-6 items-baseline relative pb-28 mb-8 py-6 rounded-md">

                    <h2 className="w-full py-2 flex justify-center items-center text-right gap-2 font-bold text-2xl text-white dark:text-white">
                        <span>
                            Edit
                        </span>

                        <span>
                            <FaEdit />
                        </span>
                    </h2>

                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="firstname">
                            Firstname
                        </label>
                        <input
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={newDetails.firstname}
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="lastname">Lastname</label>
                        <input
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={newDetails.lastname}
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="email">Email</label>
                        <input
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            type="email"
                            name="email"
                            id="email"
                            readOnly
                            value={newDetails.email}
                        />
                    </div>


                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="isPublicAccount">
                            Public account?
                        </label>
                        <select
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            name="isPublicAccount"
                            id="isPublicAccount"
                            value={newDetails.isPublicAccount}
                            onChange={handleInputChange}
                        >
                            <option value={newDetails.isPublicAccount}>{newDetails.isPublicAccount}</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>





                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="firstname">Number</label>
                        <input
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={newDetails.phoneNumber}
                            onChange={handleInputChange}

                        />
                    </div>



                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            name="gender"
                            id="gender"
                            value={newDetails.gender}
                            onChange={handleInputChange}
                        >
                            <option value={newDetails.gender}>{newDetails.gender}</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>



                    <div className="flex flex-col gap-1 justify-center items-start h-auto w-[100%] sm:w-[60%]">
                        <label className="text-white dark:text-white text-lg" htmlFor="describeYourselfInOneWord">Describe yourself in one word</label>
                        <input
                            className="w-full rounded-md p-1 text-lg focus-within:outline-none bg-white text-slate-600 border"
                            type="text"
                            name="describeYourselfInOneWord"
                            id="describeYourselfInOneWord"
                            value={newDetails.describeYourselfInOneWord}
                            onChange={handleInputChange}
                        />
                    </div>



                    <div className="flex justify-center items-center h-auto w-[100%] absolute bottom-4">
                        <button className="bg-white text-slate-900 hover:text-blue-800 w-[40%] sm:w-[20%] focus-within:outline-none text-lg font-bold text-center rounded-md py-1">
                            Save
                        </button>
                    </div>


                </form>

            }

        </div>
    )
}