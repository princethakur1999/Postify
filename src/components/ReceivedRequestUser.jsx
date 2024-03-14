import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function ReceivedRequestUser({ user }) {

    const [cancelled, setCancelled] = useState(false);
    const [confirm, setConfirm] = useState(false);


    async function cancelReceivedRequest(e) {

        try {

            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.delete(`${BASE_URL}/cancel-received-request/${user._id}/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            setCancelled(true);

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }

    }


    async function confirmRequest(e) {

        try {

            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.post(`${BASE_URL}/confrim-request/${user._id}/${userid}`)

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            setConfirm(true);

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }

    }


    return (

        <div className="h-max w-[300px] border bg-3 p-2 flex flex-col justify-between items-center gap-4 rounded-md">

            <img className="h-[50px] w-[50px] rounded-full" src={user.profile.profilePic} alt="user-photo" />

            <p className="text-slate-900">@{user.userid}</p>

            {
                confirm || cancelled &&
                <p className="w-[40%] cursor-pointer text-center font-bold text-sm bg-4 text-white rounded-full py-1">Cancelled</p>
            }
            {
                confirm || !cancelled &&
                <p onClick={cancelReceivedRequest} className="w-[40%] cursor-pointer text-center font-bold text-sm bg-4 text-white rounded-full py-1">Cancel</p>
            }
            {
                cancelled || !confirm &&
                <p onClick={confirmRequest} className="w-[40%] cursor-pointer text-center font-bold text-sm bg-4 text-white rounded-full py-1">Accept</p>
            }

            {
                cancelled || confirm &&
                <p className="w-[40%] cursor-pointer text-center font-bold text-sm bg-4 text-white rounded-full py-1">Accepted</p>
            }
        </div>
    )
}
