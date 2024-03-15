import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import UserPost from '../components/UserPost';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function UserProfile() {

    const { userid } = useParams();


    const [userDetails, setUserDetails] = useState(null);


    const getUserDetails = async () => {


        try {

            const myid = localStorage.getItem("userid");

            const response = await axios.get(`${BASE_URL}/user-profile-details/${userid}/${myid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setUserDetails(response.data.userDetails);

            toast.success(response.data.message);


        } catch (e) {

            console.log("Error: ", e);

            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {

        getUserDetails();

    }, []);

    return (


        <div className="w-[98%] sm:w-[60%] flex flex-col justify-start items-center gap-6 pt-24">


            <section className="w-[100%] mb-8">

                <div className="w-[100%] relative border">

                    <img className="w-[100%] h-[150px] sm:h-[300px]" src={(userDetails?.profile?.coverPhoto ? userDetails.profile.coverPhoto : 'https://www.ll-mm.com/images/placeholders/image-placeholder.jpg')} alt="coverPhoto" />



                    <div className="h-[80px] w-[80px] sm:h-[160px] sm:w-[160px]  rounded-full absolute left-1/2 transform -translate-x-1/2 -bottom-1/4 border-4 border-blue-800">

                        <img className="h-[100%] w-[100%] rounded-full object-cover" src={(userDetails?.profile?.profilePic ? userDetails.profile.profilePic : 'https://img.freepik.com/free-icon/user_318-749758.jpg')} alt="profilePic" />

                    </div>

                    <p className="bg-slate-900 text-white px-2 text-sm sm:text-xl absolute -top-3 border sm:-top-4 left-4">
                        {
                            userDetails?.userid
                        }
                    </p>

                </div>
            </section >


            <section className="w-[100%] flex flex-col justify-between text-slate-900 font-bold dark:text-white  items-center gap-8 border-b mt-8 pb-4">

                <p className="text-xl w-full text-center">
                    {
                        userDetails?.profile?.describeYourselfInOneWord
                    }
                </p>
                <p className="text-2xl w-full text-center">
                    {
                        userDetails?.firstname + " " + userDetails?.lastname
                    }
                </p>
            </section>


            <section className="w-[100%] flex justify-between items-center gap-8 my-2">

                <p className="text-slate-600 cursor-pointer dark:text-white font-semibold text-sm sm:text-xl flex gap-2 justify-center items-center">
                    <span className="w-full text-center">{userDetails?.followers.length}</span>
                    <span>Followers</span>
                </p>


                <p className="text-slate-600 cursor-pointer dark:text-white font-semibold  text-sm sm:text-xl flex gap-2 justify-center items-center">
                    <span className="w-full text-center">{userDetails?.following.length}</span>
                    <span>Following</span>
                </p>
            </section>


            <section className="w-[100%] grid grid-cols-1 justify-items-center gap-y-16 gap-x-4 py-4">
                {
                    userDetails?.posts?.map((post) => <UserPost post={post} poster={userDetails.userid} posterPic={userDetails.profile.profilePic} key={post._id} />)
                }
            </section>


        </div>

    )
}
