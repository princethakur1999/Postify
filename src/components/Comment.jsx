export default function Comment({ comment }) {

    return (

        <div className="flex items-start space-x-4 py-2">

            <img
                className="w-10 h-10 rounded-full"
                src={comment?.user?.profile?.profilePic ? comment?.user?.profile?.profilePic : 'https://img.freepik.com/free-icon/user_318-749758.jpg'}
                alt="profile"
            />

            <div className="flex flex-col">
                <div className="bg-gray-200 rounded-lg p-2">
                    <p className="text-sm text-gray-800 font-semibold">
                        {comment?.user?.userid}
                    </p>
                    <p className="text-sm text-gray-900">{comment?.comment}</p>
                </div>
                <p className="text-xs text-gray-200 mt-1">
                    {new Date(comment?.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
