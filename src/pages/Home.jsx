
import { useEffect, useState } from "react"

import toast from "react-hot-toast";
import axios from "axios";

import AddPost from "../components/AddPost";

import FollowingPost from '../components/FollowingsPost';


export default function Home() {

    const [posts, setPosts] = useState(null);

    const getFollowingsPosts = async () => {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`http://localhost:4000/followers-posts/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setPosts(response.data.posts);


        } catch (e) {

            console.log(e);

            toast.error(e.response.data.message);

        }
    }

    useEffect(() => {

        getFollowingsPosts();

    }, []);

    return (

        <div className="w-[98%] sm:w-[60%] flex flex-col justify-start items-center gap-2 py-24">
            <AddPost />



            <section className="w-[100%] grid grid-cols-1 justify-items-center gap-y-16 gap-x-4 py-4">
                {
                    posts?.map((post) => <FollowingPost post={post} key={post._id} />)
                }
            </section>


        </div>
    )
}
