
export default function Comment({ comment }) {

    return (

        <div className="w-[100%] p-2 flex flex-col sm:flex-row justify-start items-start gap-4">

            <div className=" min-w-[150px] max-w-max flex justify-start items-center gap-2">

                <img className="h-[20px] w-[20px] rounded-full bg-white border" src={comment.user.profile.profilePic} alt="profile" />

                <p className="text-white font-bold cursor-pointer">
                    {comment.user.userid}
                </p>
            </div>

            <p className="w-full sm:min-w-[40%] sm:max-w-[80%] min-h-min max-h-max text-left rounded-md text-slate-600 bg-slate-200 p-4">
                <span>
                    {comment.comment}
                </span>
            </p>

            <span className="text-white w-full text-right">
                {
                    new Date(comment.createdAt).toLocaleString()
                }
            </span>
        </div>
    )
}
