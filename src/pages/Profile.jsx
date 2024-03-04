import { FaCamera } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import Post from './../components/Post';
import AddPost from "../components/AddPost";


export default function Profile() {



    return (

        <div className="w-[60%] flex flex-col justify-start items-center gap-6">

            <section className="w-[100%]">

                <div className="w-[100%] relative border">

                    <img className="w-[100%] h-[300px]" src="https://www.systemcenterdudes.com/wp-content/themes/scd/assets/images/post-default.jpg" alt="coverPhoto" />

                    <p className="absolute bottom-8 right-8 text-4xl text-blue-800 cursor-pointer" title="Add cover photo">
                        < FaCamera />
                    </p>
                </div>
            </section >


            <section className="w-[100%] flex justify-between items-center gap-8 border-b">

                <div className="h[150px] w-[150px] rounded-full relative">
                    <img className="h-[100%] w-[100%] object-cover" src="https://img.freepik.com/free-icon/user_318-749758.jpg" />

                    <p className="text-2xl absolute right-[18px] bottom-[18px] font-bold rounded-full bg-black text-white p-1 cursor-pointer" title="Add profile photo">
                        < IoMdAddCircle />
                    </p>
                </div>

                <p className="text-slate-900 dark:text-white font-bold text-2xl">
                    Prince Kumar
                </p>

                <p className="text-slate-900 dark:text-white text-xl">
                    100  Followers
                </p>

                <p className="text-slate-900 dark:text-white text-xl">
                    100  Following
                </p>

                <button className="flex justify-evenly items-center gap-2 w-[75px] font-bold bg-blue-800 text-white dark:bg-white dark:text-slate-900 rounded-md">
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
