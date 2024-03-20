import { FaCamera } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import { Link } from "react-router-dom";

import Post from './../components/Post';
import AddPost from "../components/AddPost";

import { FaImage } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import Processing from '../components/Processing';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Profile() {


    const [update, setUpdate] = useState(false);


    const [isCoverPhotoChangerOpen, setIsCoverPhotoChangerOpen] = useState(false);
    const [isProfilePicChangerOpen, setIsProfilePicChangerOpen] = useState(false);



    const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
    const [selectedProfilePic, setSelectedProfilePic] = useState(null);


    const [profileDetails, setProfileDetails] = useState({});

    const [processing, setProcessing] = useState(false);


    function closeCoverPhotoChanger(e) {

        setIsCoverPhotoChangerOpen(!isCoverPhotoChangerOpen);

        setSelectedCoverPhoto(null);
    }

    function closeProfielPicChanger(e) {

        setIsProfilePicChangerOpen(!isProfilePicChangerOpen);

        setSelectedProfilePic(null);
    }


    async function updateCoverPhoto(e) {

        try {
            e.preventDefault();

            setProcessing(true);

            const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

            if (selectedCoverPhoto.size > maxSizeInBytes) {

                toast.error("File size is too large");

                throw new Error("File size is too large!");
            }

            const formData = new FormData();

            formData.append('coverPhoto', selectedCoverPhoto);

            const userid = localStorage.getItem("userid");

            const response = await axios.post(`${BASE_URL}/update-cover-photo/${userid}`, formData)

            if (!response.data.success) {

                throw new Error("Could not upload cover photo");
            }


            setUpdate(true);

            toast.success(response.data.message);


        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }
        finally {

            setSelectedCoverPhoto('');

            setIsCoverPhotoChangerOpen(!isCoverPhotoChangerOpen);

            setProcessing(false);

        }

    }

    async function updateProfilePic(e) {


        try {
            e.preventDefault();

            setProcessing(true);

            const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

            if (selectedProfilePic.size > maxSizeInBytes) {

                toast.error("File size is too large");

                throw new Error("File size is too large!");
            }

            const formData = new FormData();

            formData.append('profilePic', selectedProfilePic);

            const userid = localStorage.getItem("userid");

            const response = await axios.post(`${BASE_URL}/update-profile-pic/${userid}`, formData)

            if (!response.data.success) {

                throw new Error("Could not upload profile pic.");
            }

            setUpdate(true);


            toast.success(response.data.message);


        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);

        }
        finally {

            setSelectedProfilePic('');

            setIsProfilePicChangerOpen(!isProfilePicChangerOpen);

            setProcessing(false);
        }

    }


    async function getProfileDetails() {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`${BASE_URL}/profile/${userid}`);

            if (!response.data.success) {

                throw new Error("Server error!");
            }

            setProfileDetails(response.data.user);



        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);

        }
    }

    useEffect(() => {

        getProfileDetails();

    }, [update]);

    return (

        <div className="w-[98%] sm:w-[60%] flex flex-col justify-start items-center gap-6 pt-24">

            {
                isCoverPhotoChangerOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">


                    <form className="min-h-[300px] max-h-max w-[320px] sm:w-[360px] relative pt-8 bg-3 rounded-md flex flex-col justify-around items-center gap-8 px-4 py-4 border">

                        <span className="absolute text-2xl text-blue-800 top-2 right-2" onClick={closeCoverPhotoChanger}>
                            <FaWindowClose />
                        </span>

                        <h2 className="w-full text-center font-bold text-xl text-blue-800">
                            New cover photo
                        </h2>

                        <label
                            htmlFor="coverPhoto"
                            className="w-full cursor-pointer"
                        >

                            <span className="flex justify-center items-center gap-2 bg-blue-800 w-full rounded-md">
                                <FaImage className="text-4xl text-white" />
                            </span>

                            <input
                                className="hidden"
                                type="file"
                                id="coverPhoto"
                                name="selectedCoverPhoto"
                                onChange={(e) => setSelectedCoverPhoto(e.target.files[0])}
                            />
                        </label>

                        {
                            selectedCoverPhoto &&
                            <img
                                className="max-h-[300px] min-h-max w-full py-2 object-cover"
                                src={URL.createObjectURL(selectedCoverPhoto)}
                                alt="selectedCoverPhoto"
                            />
                        }

                        {
                            !processing &&
                            <button onClick={updateCoverPhoto} className="bg-blue-800 px-4 py-1 text-white font-bold text-center rounded-md">
                                Update
                            </button>
                        }
                        {
                            processing &&
                            <Processing />
                        }
                    </form>
                </div>
            }


            {
                isProfilePicChangerOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">

                    <form className="min-h-[300px] max-h-max w-[320px] sm:w-[360px] relative pt-8 bg-3 rounded-md flex flex-col justify-around items-center gap-8 px-4 py-4 border">

                        <span className="absolute text-2xl text-blue-800 top-2 right-2" onClick={closeProfielPicChanger}>
                            <FaWindowClose />
                        </span>

                        <h2 className="w-full text-center font-bold text-xl text-blue-800">
                            New profile picture
                        </h2>

                        <label
                            htmlFor="profilePic"
                            className="w-full cursor-pointer mt-4 bg-blue-800 rounded-md"
                        >

                            <span className="flex justify-center items-center gap-2 bg-blue w-full rounded-md">
                                <FaImage className="text-4xl text-white" />
                            </span>

                            <input
                                className="hidden"
                                type="file"
                                id="profilePic"
                                name="selectedProfilePic"
                                onChange={(e) => setSelectedProfilePic(e.target.files[0])}
                            />
                        </label>

                        {
                            selectedProfilePic &&
                            <img
                                className="max-h-[300px] min-h-max w-full py-2 object-cover"
                                src={URL.createObjectURL(selectedProfilePic)}
                                alt="selectedProfilePic"
                            />
                        }

                        {
                            !processing &&
                            <button onClick={updateProfilePic} className="bg-blue-800 px-4 py-1 text-white font-bold text-center rounded-md">
                                Update
                            </button>
                        }

                        {
                            processing &&
                            <Processing />
                        }
                    </form>
                </div>
            }



            <section className="w-[100%] mb-8">

                <div className="w-[100%] relative border">

                    <img className="w-[100%] h-[150px] sm:h-[300px]" src={(profileDetails.profile?.coverPhoto ? profileDetails.profile.coverPhoto : 'https://www.ll-mm.com/images/placeholders/image-placeholder.jpg')} alt="coverPhoto" />


                    <p onClick={() => setIsCoverPhotoChangerOpen(!isCoverPhotoChangerOpen)} className="absolute top-4 right-4 text-2xl sm:text-4xl text-white cursor-pointer" title="Add cover photo">
                        < FaCamera className="bg-4 p-1" />
                    </p>


                    <div className="h-[80px] w-[80px] sm:h-[160px] sm:w-[160px]  rounded-full absolute left-1/2 transform -translate-x-1/2 -bottom-1/4 border-4 border-blue-800">

                        <img className="h-[100%] w-[100%] rounded-full object-cover" src={(profileDetails.profile?.profilePic ? profileDetails.profile.profilePic : 'https://img.freepik.com/free-icon/user_318-749758.jpg')} alt="profilePic" />

                        <p onClick={() => setIsProfilePicChangerOpen(!isProfilePicChangerOpen)} className="text-sm sm:text-2xl absolute sm:-right-[6px] sm:bottom-[22px] -right-[10px] bottom-[10px] font-bold rounded-full bg-4 text-white p-1 cursor-pointer" title="Add profile photo">
                            < IoMdAddCircle />
                        </p>
                    </div>

                    <p className="bg-slate-900 text-white px-2 text-sm sm:text-xl absolute -top-3 border sm:-top-4 left-4">
                        {profileDetails.userid}
                    </p>

                </div>
            </section >


            <section className="w-[100%] flex flex-col justify-between text-slate-900 font-bold dark:text-white  items-center gap-8 border-b mt-8 pb-4">

                <p className="text-xl w-full text-center">
                    {
                        profileDetails.profile?.describeYourselfInOneWord
                    }
                </p>
                <p className="text-2xl w-full text-center">
                    {
                        (profileDetails?.firstname && profileDetails?.lastname) ? profileDetails.firstname + " " + profileDetails.lastname : ""
                    }
                </p>
            </section>


            <section className="w-[100%] flex justify-between items-center gap-8 my-2">

                <p className="text-slate-600 cursor-pointer dark:text-white font-semibold text-sm sm:text-xl flex gap-2 justify-center items-center">
                    <span className="w-full text-center">{profileDetails.followers?.length}</span>
                    <span>Followers</span>
                </p>


                <Link to="/about" className="flex justify-evenly p-1 items-center gap-2 w-[75px] font-bold bg-4 text-white rounded-md">
                    <p>About</p>
                </Link>


                <p className="text-slate-600 cursor-pointer dark:text-white font-semibold  text-sm sm:text-xl flex gap-2 justify-center items-center">
                    <span className="w-full text-center">{profileDetails.following?.length}</span>
                    <span>Following</span>
                </p>
            </section>

            <AddPost />


            <section className="w-[100%] grid grid-cols-1 justify-items-center gap-y-16 gap-x-4 py-4 border mb-8 rounded-md">
                {
                    profileDetails.posts?.map((post) => <Post post={post} userid={profileDetails.userid} profilePic={profileDetails.profile.profilePic} key={post._id} />)
                }
            </section>

        </div >
    )
}
