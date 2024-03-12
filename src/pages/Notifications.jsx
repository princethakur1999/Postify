import Notification from "../components/Notification";

import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";


const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function Notifications() {


    const [notifications, setNotifications] = useState(null);


    const getNotifications = async () => {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`${BASE_URL}/get-notifications/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setNotifications(response.data.notifications);

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }
    }


    useEffect(() => {

        getNotifications();

    }, []);


    return (

        <div className="w-[98%] sm:w-[60%] max-h-max flex flex-col justify-between items-center gap-8 mt-24 mb-8">

            <h2 className="w-full font-bold text-right border-b text-blue-800 text-xl pb-2 dark:text-white">
                Notifications
            </h2>

            {
                notifications?.map((notification) => <Notification notification={notification} key={notification._id} />)
            }
        </div>
    )
}
