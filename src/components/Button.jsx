
export default function Button({ text }) {

    return (

        <button className="bg-blue-800 w-[100%] focus-within:outline-none text-lg text-white font-bold text-center rounded-full mt-6 py-1">
            {text}
        </button>
    )
}
