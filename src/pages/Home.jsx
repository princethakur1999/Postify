
import { useEffect, useState } from "react"

import axios from "axios";

import { useNavigate } from "react-router-dom";

import AddPost from "../components/AddPost";
import AllUsers from "../components/AllUsers";
import FollowingPost from '../components/FollowingsPost';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Home() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState(null);

    const getFollowingsPosts = async () => {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.get(`${BASE_URL}/followers-posts/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setPosts(response.data.posts);


        } catch (e) {


            console.log(e);

            navigate('/login');

        }
    }

    useEffect(() => {

        getFollowingsPosts();

    }, []);

    return (

        <div className="w-[98%] sm:w-[60%] flex flex-col justify-start items-center gap-2 py-24">

            <AddPost />


            <AllUsers />


            <section className="w-[100%] grid grid-cols-1 justify-items-center gap-y-16 gap-x-4 rounded-md py-8 border my-8">
                {
                    posts?.map((post) => <FollowingPost post={post} key={post._id} />)
                }
            </section>


        </div>
    )
}
