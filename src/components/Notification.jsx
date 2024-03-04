
export default function Notification() {

    return (

        <div className="w-[98%] flex flex-col justify-between items-start gap-2 bg-slate-900 dark:bg-white p-2 rounded-md">

            <div className="flex gap-4 justify-between items-center p-1">

                <img className="h-8 w-8 rounded-full" src="https://img.freepik.com/free-icon/user_318-749758.jpg" alt="user-photo" />

                <p className="font-bold dark:text-slate-900 text-white">
                    userid
                </p>

            </div>

            <p className="dark:text-slate-600 text-white text-sm w-full text-left">
                Someone has liked your post.
            </p>

            <p className=" dark:text-slate-600 text-white font-bold w-full text-right">
                date
            </p>
        </div>
    )
}
