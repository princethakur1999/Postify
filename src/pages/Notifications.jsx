

import Notification from "../components/Notification"

export default function Notifications() {

    return (

        <div className="w-[100%] sm:w-[60%] max-h-max flex flex-col justify-between items-center gap-8">

            <h2 className="w-full font-bold text-center border-b text-slate-900 text-2xl pb-2 dark:text-white">
                Notifications
            </h2>

            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </div>
    )
}
