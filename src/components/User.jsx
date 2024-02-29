
export default function User({ user }) {

    return (

        <div className="h-[60px] w-[240px] bg-blue-800 p-2 flex justify-around items-center rounded-md">

            <img className="h-[30px] w-[30px] rounded-full" src={user.photo} alt="user-photo" />

            <p className="text-white">@{user.name}</p>

            <p className="w-[40%] text-center font-bold text-sm bg-white text-slate-900 rounded-md py-1">Follow</p>

        </div>
    )
}
