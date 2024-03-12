import Activity from "../components/Activity";

import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";


const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Activities() {


    const [activities, setActivities] = useState(null);


    const getActivities = async () => {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`${BASE_URL}/get-activities/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setActivities(response.data.activities);

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }
    }


    useEffect(() => {

        getActivities();

    }, []);


    return (

        <div className="w-[98%] sm:w-[60%] max-h-max flex flex-col justify-between items-center gap-8 mt-24">

            <h2 className="w-full font-bold text-right border-b text-blue-800 text-xl pb-2 dark:text-white">
                Activities
            </h2>

            {
                activities?.map((activity) => <Activity activity={activity} key={activity._id} />)
            }
        </div>
    )
}
