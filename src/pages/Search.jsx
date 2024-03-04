
const users = [
    {
        id: 1,
        name: "Prince",
        photo: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },
    {
        id: 2,
        name: "Setu",
        photo: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },
    {
        id: 3,
        name: "Arun",
        photo: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },
    {
        id: 4,
        name: "Pallavi",
        photo: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    }
]

import User from "../components/User"

export default function Search() {

    return (

        <div className="w-[100%] flex flex-col gap-8 justify-center items-center">

            <form className="w-[100%] flex justify-center items-center pt-8 mb-8">

                <input
                    className="w-[80%] sm:w-[20%] bg-slate-100 px-6 py-1 rounded-full border border-slate-200 focus-within:outline-none text-slate-600"
                    type="text"
                    placeholder="userid"
                />
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 justify-center gap-8">
                {
                    users.map((user) => <User user={user} id={user.id} />)
                }
            </div>
        </div>
    )
}
