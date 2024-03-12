import { useEffect, useState } from "react"

import toast from "react-hot-toast";
import axios from "axios";

import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";


import User from "../components/User"
import ReceivedRequestUser from '../components/ReceivedRequestUser';
import SentRequestUser from "../components/SentRequestUser";


export default function Search() {

    const [users, setUsers] = useState(false)

    const [id, setId] = useState('');

    const [user, setUser] = useState(false);

    const [sentRequest, setSentRequest] = useState(false);

    const [receivedRequest, setReceivedRequest] = useState(false);


    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            searchUserById();
        }
    };


    const handleApiError = (error) => {

        console.error(error);

        toast.error(error.response?.data?.message || 'An error occurred');

        setId('');
        setUser(null);
        setUsers(null);
        setSentRequest(null);
        setReceivedRequest(null);
    };

    const setCommonStates = () => {

        setId('');
        setUser(null);
        setUsers(null);
        setSentRequest(null);
        setReceivedRequest(null);
    };

    const getAllUsers = async (e) => {

        try {

            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`http://localhost:4000/users/${userid}`);

            if (!response.data.success) {

                throw new Error("Error while fetching users");
            }

            setCommonStates();

            setUsers(response.data.users);

        }
        catch (e) {

            handleApiError(e);
        }
    }

    const searchUserById = async () => {


        try {

            const response = await axios.get(`http://localhost:4000/search-user-by-userid/${id}`);

            if (!response.data.success) {

                throw new Error("No user found");
            }


            setCommonStates();

            setUser(response.data.user);

            console.log(response.data.user);


        } catch (e) {

            handleApiError(e);
        }
    }

    const viewSentRequests = async (e) => {

        try {
            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`http://localhost:4000/view-sent-requests/${userid}`);

            if (!response.data.success) {

                throw new Error("Server error!");
            }

            setCommonStates();

            setSentRequest(response.data.data);

            toast.success(response.data.message);



        } catch (e) {

            handleApiError(e);


        }
    }


    const viewReceivedRequests = async (e) => {

        try {
            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`http://localhost:4000/view-received-requests/${userid}`);

            if (!response.data.success) {

                throw new Error("Server error!");
            }

            setCommonStates();

            setReceivedRequest(response.data.data);

            toast.success(response.data.message);


        } catch (e) {

            handleApiError(e);

        }
    }



    return (


        <div className="w-[100%] h-[100%] flex flex-col gap-2 justify-start items-center pt-24">

            <div className="w-[90%] sm:w-[60%] flex justify-between items-center py-2 text-2xl sm:text-4xl text-blue-800 dark:text-white ">

                <div className="cursor-pointer" onClick={viewSentRequests}>
                    <FaArrowCircleUp />
                </div>

                <div className="cursor-pointer" onClick={getAllUsers}>
                    <FaUsersRectangle />
                </div>

                <div className="cursor-pointer" onClick={viewReceivedRequests}>
                    <FaArrowCircleDown />
                </div>
            </div>


            <form className="w-[100%] flex justify-center items-center pt-8 mb-8 mt-6">

                <input
                    className="w-[90%] sm:w-[20%] bg-slate-100 px-6 py-1 rounded-md border border-slate-200 focus-within:outline-none text-slate-600"
                    type="text"
                    placeholder="userid"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyDown={handleKeyPress}

                />
            </form>


            <h4 className="text-left font-bold text-2xl text-white">


                {
                    user ? "Search result" : null
                }

                {
                    users ? "All users" : null
                }

                {
                    sentRequest ? "Sent requests" : null
                }

                {
                    receivedRequest ? "Received requests" : null
                }


            </h4>



            {
                sentRequest &&
                <div className="w-[98%] sm:w-[60%] h-full rounded-md grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-12 pt-12 py-4">
                    {
                        sentRequest.map((user) => <SentRequestUser user={user} key={user._id} />)
                    }
                </div>
            }



            {
                receivedRequest &&
                <div className="w-[98%] sm:w-[60%] h-full rounded-md grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-12 pt-12 py-4">

                    {
                        receivedRequest.map((user) => <ReceivedRequestUser user={user} key={user._id} />)
                    }
                </div>
            }

            {
                user &&
                <User user={user} key={user._id} />
            }


            {
                users &&
                <div className="w-[98%] sm:w-[60%] h-full rounded-md grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-12 py-4 my-4">

                    {
                        users.map((user) => <User user={user} key={user._id} />)
                    }
                </div>
            }
        </div>
    )
}
