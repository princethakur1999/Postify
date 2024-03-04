
export default function Comment() {

    return (

        <div className="w-[100%] p-2 flex justify-start items-start gap-4">

            <div className=" min-w-min max-w-max flex justify-between items-center gap-2">

                <img className="h-[20px] w-[20px] rounded-full bg-white border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="profile" />

                <p className="text-slate-900 dark:text-white font-bold cursor-pointer">
                    userid
                </p>
            </div>

            <p className="min-w-[40%] max-w-[80%] min-h-min  max-h-max text-left rounded-md text-slate-600 bg-slate-100 p-4">
                Very nice👍
            </p>
        </div>
    )
}
