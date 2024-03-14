import { FaSpinner } from "react-icons/fa";


export default function Processing() {

    return (

        <div className="bg-4 w-[100%] rounded-full mt-6 py-1">

            <FaSpinner className="text-2xl mx-auto text-white font-bold text-center animate-spin" />

        </div>
    )
}
