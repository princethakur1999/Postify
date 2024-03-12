export default function Activity({ activity }) {


    return (

        <div className="w-[98%] flex flex-col justify-between items-start gap-2 bg-4 p-2 rounded-md">

            <div className="flex gap-4 justify-between items-center p-1">


                <p className="font-bold  text-white">
                    {activity.posterid}
                </p>


                <p className="text-white font-bold w-full text-right">
                    {
                        new Date(activity.createdAt).toLocaleString()
                    }
                </p>

            </div>


            <p className="text-white text-sm w-full flex justify-between items-center pl-2">

                <span>
                    {activity.text}
                </span>


                <img className="h-[100px] w-[100px] rounded-sm" src={activity.post.image} alt="post" />
            </p>


        </div>
    )
}
