import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function SentRequestUser({ user }) {

    const navigate = useNavigate();


    const [isCancelled, setIsCancelled] = useState(false);


    async function cancelSentRequest(e) {

        try {

            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.delete(`${BASE_URL}/cancel-sent-request/${user._id}/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success("Canceled!");


            setIsCancelled(true);

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }

    }

    const viewProfile = () => {

        navigate(`/user/${user.userid}`);
    }


    return (

        <div className="h-[60px] w-[300px] border bg-3 p-2 flex justify-around items-center rounded-md">

            <img className="h-[30px] w-[30px] rounded-full" src={user.profile.profilePic} alt="user-photo" />

            <p className="text-slate-900 cursor-pointer font-semibold" onClick={viewProfile}>@{user.userid}</p>

            <p onClick={cancelSentRequest} className="w-[40%] text-center font-bold text-sm cursor-pointer bg-4 text-white rounded-full py-1">{isCancelled ? "Cancelled" : "Cancel"}</p>

        </div>
    )
}
