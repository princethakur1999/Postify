import { useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";



export default function AddPost() {


    const navigate = useNavigate();


    const [post, setPost] = useState(null);


    async function createPost(e) {

        try {

            e.preventDefault();

            const formData = new FormData();

            formData.append('post', post);

            const userid = localStorage.getItem("userid");

            const response = await axios.post(`http://localhost:4000/create-post/${userid}`, formData);

            if (!response.data.success) {

                throw new Error("Something went wrong!");
            }

            toast.success(response.data.message);


            navigate('/profile');


        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }

    }

    return (


        <div className="w-full p-1 sm:p-4 border rounded-md bg-blue-800 dark:bg-white">


            <form className="rounded-lg flex justify-between items-center space-x-4">

                <label className="flex-shrink-0">

                    <input
                        className="hidden"
                        type="file"
                        name="image"
                        onChange={(e) => setPost(e.target.files[0])}
                    />

                    <div className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 flex justify-between items-center gap-4">

                        <FaImage className="text-4xl text-blue-800" />

                    </div>
                </label>


                <button onClick={createPost} className="text-2xl dark:text-blue-800 text-white">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}
