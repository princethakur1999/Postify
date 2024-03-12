import { format } from 'date-fns';

export default function Activity({ activity }) {


    return (

        <div className="w-[98%] flex flex-col justify-between items-stretch gap-1 bg-blue-800 px-2 py-1 rounded-md">

            <div className="flex gap-4 justify-between items-center p-1">


                <p className="font-bold  text-white">
                    {activity.posterid}
                </p>


                <p className="text-white font-bold w-full text-right">
                    {
                        format(new Date(activity?.createdAt), 'dd/MM/yyyy')
                    }
                </p>

            </div>


            <p className="text-white text-sm w-full flex justify-between items-center pl-2">

                <span>
                    {activity.text}
                </span>


                <img className="h-[100px] w-[100px] rounded-md" src={activity.post.image} alt="post" />
            </p>


        </div>
    )
}
