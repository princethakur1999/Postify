import { useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";


const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AddPost() {


    const navigate = useNavigate();


    const [post, setPost] = useState(null);


    async function createPost(e) {

        try {

            e.preventDefault();

            const formData = new FormData();

            formData.append('post', post);

            const userid = localStorage.getItem("userid");

            const response = await axios.post(`${BASE_URL}/create-post/${userid}`, formData);

            if (!response.data.success) {

                throw new Error("Something went wrong!");
            }

            toast.success(response.data.message);

            window.location.reload();

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }

    }

    return (


        <div className="w-full h-auto p-1 sm:p-4 border rounded-md bg-3 dark:bg-white">


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

                {
                    post &&
                    <div className="h-[300px] w-[60%] flex justify-center items-center py-8">
                        <img className="h-[100%] w-full object-cover aspect-square rounded-lg" src={URL.createObjectURL(post)} alt="post" />
                    </div>
                }


                <button onClick={createPost} className="text-2xl text-blue-800">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}
