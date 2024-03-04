import { TbFaceIdError } from "react-icons/tb";

export default function Error() {

    return (

        <div className="min-w-min flex flex-col justify-center items-center gap-4 p-4 rounded-md shadow-lg max-w-md mx-auto bg-blue-100">

            <p className="font-bold text-4xl text-slate-900">
                <TbFaceIdError />
            </p>

            <p className="text-center">
                Oops!
            </p>

            <p className="text-center">
                The requested page is not available!
            </p>
        </div>
    );
}
