import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function AddPost() {

    return (

        <div className="w-full p-1 sm:p-4 border rounded-md bg-blue-800 dark:bg-white">

            <form className="rounded-lg flex justify-between items-center space-x-4">

                <label className="flex-shrink-0">

                    <input
                        className="hidden"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => console.log(e.target.files[0])}
                    />

                    <div className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 flex justify-between items-center gap-4">

                        <FaImage className="text-4xl text-blue-800" />

                    </div>
                </label>


                <button className="text-2xl dark:text-blue-800 text-white">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}
