import { FaCamera } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import Post from './../components/Post';
import AddPost from "../components/AddPost";


export default function Profile() {

    return (

        <div className="w-[98%] sm:w-[60%] flex flex-col justify-start items-center gap-6">

            <section className="w-[100%] mb-8">

                <div className="w-[100%] relative border">

                    <img className="w-[100%] h-[300px]" src="https://rezista.in/wp-content/uploads/2020/07/Hero-Banner-Placeholder-Dark-1024x480-1.png" alt="coverPhoto" />

                    <p className="absolute top-4 right-4 text-4xl text-blue-800 cursor-pointer" title="Add cover photo">
                        < FaCamera />
                    </p>

                    <div className="h[100px] w-[100px]  rounded-full absolute left-1/2 transform -translate-x-1/2 bottom-0">

                        <img className="h-[100%] w-[100%] object-cover" src="https://img.freepik.com/free-icon/user_318-749758.jpg" />

                        <p className="text-xl absolute right-[2px] bottom-[12px] font-bold rounded-full bg-black text-white p-1 cursor-pointer" title="Add profile photo">
                            < IoMdAddCircle />
                        </p>
                    </div>

                    <p className="text-white bg-blue-800 px-2 font-bold text-sm sm:text-2xl absolute top-4 left-4">
                        Username
                    </p>

                </div>
            </section >


            <section className="w-[100%] flex justify-between items-center gap-8 border-b py-2">

                <p className="text-slate-900 dark:text-white text-sm sm:text-2xl flex gap-2 justify-center items-center">
                    <span className="w-full text-center">0</span>
                    <span>Followers</span>
                </p>

                <p className="text-slate-900 dark:text-white text-sm sm:text-2xl flex gap-2 justify-center items-center">
                    <span className="w-full text-center">0</span>
                    <span>Following</span>
                </p>

                <button className="flex justify-evenly p-1 items-center gap-2 w-[75px] font-bold bg-blue-800 text-white dark:bg-white dark:text-slate-900 rounded-md">
                    <p>Edit</p>
                    <FaUserEdit />
                </button>

            </section>

            <AddPost />


            <section className="w-[100%] grid grid-cols-1 justify-items-center gap-y-16 gap-x-4 py-4">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </section>

        </div >
    )
}
