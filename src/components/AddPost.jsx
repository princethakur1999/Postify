import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function AddPost() {

    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const [processing, setProcessing] = useState(false);

    async function createPost(e) {

        try {

            e.preventDefault();

            setProcessing(true);

            const formData = new FormData();

            formData.append('post', post);

            const userid = localStorage.getItem("userid");

            const response = await axios.post(`${BASE_URL}/create-post/${userid}`, formData);

            if (!response.data.success) {

                throw new Error("Something went wrong!");
            }

            toast.success(response.data.message);

            navigate('/profile');

        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);
        }
        finally {

            setProcessing(false);

            setPost(null);

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
                    !processing && post &&
                    <div className="h-[300px] w-[60%] flex justify-center items-center py-8">
                        <img className="h-[100%] w-full object-cover aspect-square rounded-lg" src={URL.createObjectURL(post)} alt="post" />
                    </div>
                }

                {
                    processing &&
                    <div className="w-[100px] h-auto flex justify-center items-center animate-bounce">
                        <RiUploadCloud2Fill className="text-blue-800 text-4xl" />
                    </div>
                }


                <button onClick={createPost} className="text-2xl text-blue-800">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}
