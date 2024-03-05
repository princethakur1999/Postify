import { useEffect, useState } from "react"

import User from "../components/User"
import toast from "react-hot-toast";
import axios from "axios";

export default function Search() {

    const [users, setUsers] = useState([])

    const [id, setId] = useState('');

    const [user, setUser] = useState(false);


    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            searchUserById();
        }
    };

    async function getAllUsers() {

        try {
            const response = await axios.get('http://localhost:4000/users');

            if (!response.data.success) {

                throw new Error("Error while fetching users");
            }

            setUsers(response.data.users);
        }
        catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }
    }

    async function searchUserById() {


        try {

            const response = await axios.get(`http://localhost:4000/search-user-by-userid/${id}`);

            if (!response.data.success) {

                throw new Error("No user found");
            }

            setUser(response.data.user);

            console.log(response.data.user);


        } catch (e) {

            console.log(e.message);

            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {

        getAllUsers();

    }, []);


    return (

        <div className="w-[100%] flex flex-col gap-8 justify-center items-center">

            <form className="w-[100%] flex justify-center items-center pt-8 mb-8">

                <input
                    className="w-[80%] sm:w-[20%] bg-slate-100 px-6 py-1 rounded-full border border-slate-200 focus-within:outline-none text-slate-600"
                    type="text"
                    placeholder="userid"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyDown={handleKeyPress}

                />
            </form>


            {
                user &&
                <User user={user} key={user._id} />
            }


            {
                !user && users &&
                <div className="grid grid-cols-1 sm:grid-cols-3 justify-center gap-8">
                    {
                        users?.map((user) => <User user={user} key={user._id} />)
                    }
                </div>
            }
        </div>
    )
}
