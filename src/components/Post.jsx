import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";


import { useState } from "react";


import Comment from "./Comment";




export default function Post() {

    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

    return (

        <div className="w-[100%] h-[540px] flex flex-col justify-between gap-2 p-2 border rounded-md">

            <div className="w-[100%] h-[80%] flex flex-col justify-center items-center gap-4">

                <div className="w-[100%] h-auto flex justify-between items-center py-2 border-b">

                    <div className="w-max flex justify-between items-center gap-4">

                        <img className="h-[40px] w-[40px] rounded-full bg-white border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="profile" />

                        <p className="text-slate-900 dark:text-white font-bold cursor-pointer">
                            userid
                        </p>

                        <p className="text-slate-900 dark:text-white ">
                            time
                        </p>

                    </div>

                    <p className="text-slate-900 dark:text-white text-2xl cursor-pointer hover:text-red-500 dark:hover:text-red-500">
                        <MdDelete />
                    </p>
                </div>



                <div className="h-[80%] w-[100%] flex justify-center items-center">
                    <img className="h-[100%] w-auto object-cover" src="https://english.cdn.zeenews.com/sites/default/files/2023/04/12/1182381-gallerydhoni.jpg" alt="post" />
                </div>
            </div>


            <div className="w-[100%] flex justify-between py-2 border-t">

                <p className="dark:text-white text-slate-900 text-xl cursor-pointer">
                    100
                </p>

                <p className="dark:text-white text-slate-900 text-xl cursor-pointer">
                    002
                </p>
            </div>


            <div className="w-[100%] flex justify-between py-2">

                <p className="dark:text-white text-slate-900 text-3xl cursor-pointer">
                    <BiSolidLike />
                </p>

                <p className="dark:text-white text-slate-900 text-2xl cursor-pointer" onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
                    <FaCommentAlt />
                </p>
            </div>

            {
                isCommentBoxOpen &&
                <div className="h-[100vh] w-[100vw] flex flex-col justify-start items-center mt-16 bg-white dark:bg-slate-900 fixed top-0 bottom-0 left-0 right-0 z-42">

                    <div className="w-[98%] sm:w-[50%] h-[78vh] flex flex-col justify-between p-2 sm:border rounded-md overflow-y-auto">

                        <div className="w-[100%] h-[80%]  flex flex-col justify-between items-center">

                            <div className="w-[100%] h-auto flex justify-between items-center py-2 border-b">

                                <div className="w-max flex justify-between items-center gap-4">

                                    <img className="h-[40px] w-[40px] rounded-full bg-white border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="profile" />

                                    <p className="text-slate-900 dark:text-white font-bold cursor-pointer">
                                        userid
                                    </p>

                                    <p className="text-slate-900 dark:text-white ">
                                        time
                                    </p>

                                </div>


                                <p className="text-slate-900 dark:text-white text-2xl cursor-pointer" onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
                                    <FaWindowClose />
                                </p>
                            </div>


                            <div className="h-[80%] w-[100%] flex justify-center items-center">
                                <img className="h-[100%] w-auto object-cover" src="https://english.cdn.zeenews.com/sites/default/files/2023/04/12/1182381-gallerydhoni.jpg" alt="post" />
                            </div>
                        </div>


                        <div className="w-[100%] flex justify-between border-y py-2 my-2">

                            <p className="dark:text-white text-slate-900 text-xl cursor-pointer">
                                100
                            </p>

                            <p className="dark:text-white text-slate-900 text-xl cursor-pointer">
                                002
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />

                        </div>

                    </div>

                    <form className="bg-white w-[98%] sm:w-[50%] rounded-md fixed bottom-4 flex justify-between px-2 border">

                        <input
                            className="w-[100%] p-2 focus-within:outline-none text-slate-600"
                            type="text"
                            placeholder="Enter a comment..."
                        />

                        <button className="text-2xl text-blue-800">
                            <IoSend />
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}
