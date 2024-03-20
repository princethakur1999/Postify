import { useState, useEffect } from "react";

import axios from 'axios';
import User from './../components/User';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;


function AllUsers() {

    const [users, setUsers] = useState(null);


    const fetchAllUsers = async () => {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`${BASE_URL}/users/${userid}`);

            if (!response.data.success) {

                throw new Error("Error while fetching users");
            }

            setUsers(response.data.users);


        } catch (error) {

            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {

        fetchAllUsers();

    }, []);

    return (

        <div className="w-[98%] sm:w-[100%] h-auto rounded-md py-4 my-4 flex flex-wrap sm:justify-between justify-center gap-6">

            {
                users?.map((user) => (

                    <User user={user} key={user._id} />
                ))
            }
        </div>
    );
};

export default AllUsers;
