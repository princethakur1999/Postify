import toast from "react-hot-toast";
import axios from "axios";

export default function SentRequestUser({ user }) {

    async function cancelSentRequest(e) {

        try {

            e.preventDefault();

            const userid = localStorage.getItem("userid");

            const response = await axios.delete(`http://localhost:4000/cancel-sent-request/${user._id}/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success("Canceled!");

            window.location.reload();

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }

    }


    return (

        <div className="h-[60px] w-[300px] border bg-3 p-2 flex justify-around items-center rounded-md">

            <img className="h-[30px] w-[30px] rounded-full" src={user.profile.profilePic} alt="user-photo" />

            <p className="text-slate-900">@{user.userid}</p>

            <p onClick={cancelSentRequest} className="w-[40%] text-center font-bold text-sm cursor-pointer bg-4 text-white rounded-full py-1">Cancel</p>

        </div>
    )
}
