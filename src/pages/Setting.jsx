import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { MdDelete } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;


const DeleteConfirmationDialog = ({ message, onConfirm, onCancel }) => {

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">

            <div className="bg-white shadow-md rounded-lg p-8 w-[90%] sm:w-auto">

                <p className="text-xl mb-4">{message}</p>

                <div className="flex justify-center">

                    <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">Yes</button>

                    <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">No</button>

                </div>
            </div>
        </div>
    );
};


const ChangePasswordDialog = ({ onClose }) => {

    const [currentPassword, setCurrentPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [error, setError] = useState('');


    const handleChangePassword = () => {

        if (newPassword !== confirmNewPassword) {

            setError("New password and confirm password do not match.");

            return;
        }
        console.log('Password changed');

        onClose();
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">

            <div className="bg-4 shadow-md rounded-lg p-8 flex flex-col gap-4 w-[90%] sm:w-auto">

                <h2 className="text-xl font-bold mb-4 text-center border-b-2 pb-4 text-white">Change Password</h2>

                {
                    error &&
                    <p className="text-red-500 mb-4">{error}</p>
                }

                <div className="mb-4">
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="current-password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                </div>


                <div className="mb-4">
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="new-password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>


                <div className="mb-4">
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Confirm New Password"
                        id="confirm-new-password"
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                    />
                </div>

                <div className="flex justify-between">

                    <button onClick={handleChangePassword} className="bg-white text-blue-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change</button>

                    <button onClick={onClose} className="bg-white text-blue-800 font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline">Cancel</button>

                </div>
            </div>
        </div>
    );
};


const ChangeUserIDDialog = ({ onClose }) => {

    const [newUserID, setNewUserID] = useState('');

    const handleChangeUserID = () => {

        console.log('User ID changed');

        onClose();
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">

            <div className="bg-4 shadow-md rounded-lg p-8 flex flex-col gap-4 w-[90%] sm:w-auto">

                <h2 className="text-xl font-bold mb-4 text-center border-b-2 pb-4 text-white">Change Userid</h2>

                <div className="mb-4">
                    <input type="text" id="new-user-id" value={newUserID} onChange={e => setNewUserID(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="New User ID" />
                </div>

                <div className="flex justify-between">
                    <button onClick={handleChangeUserID} className="bg-white  text-blue-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change</button>
                    <button onClick={onClose} className="bg-white  text-blue-800 font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline">Cancel</button>
                </div>
            </div>
        </div>
    );
};


export default function Setting() {

    const navigate = useNavigate();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeUserID, setShowChangeUserID] = useState(false);

    const handleDeleteAccount = () => {

        setShowConfirmation(true);

    };

    const handleConfirmDelete = async () => {

        try {

            const userid = localStorage.getItem("userid");

            const response = await axios.delete(`${BASE_URL}/delete-account/${userid}`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setShowConfirmation(false);

            toast.success(response.data.message);

            localStorage.removeItem("token");

            navigate('/login');

        } catch (e) {

            console.log(e.response.data.message);
        }

    };

    const handleCancelDelete = () => {

        setShowConfirmation(false);
    };





    const handleChangePassword = () => {

        setShowChangePassword(true);
    };

    const handleCloseChangePassword = () => {

        setShowChangePassword(false);
    };




    const handleChangeUserID = () => {

        setShowChangeUserID(true);
    };

    const handleCloseChangeUserID = () => {

        setShowChangeUserID(false);
    };

    return (

        <div className="w-[100%] h-[100%] flex flex-col gap-2 justify-start items-center pt-24">

            <div className="sm:w-[50%] w-[98%] h-[50%] bg-white shadow-md border rounded-lg p-8 flex flex-col justify-evenly">


                <h1 className="text-3xl font-bold mb-8 text-center border-b-2 pb-4 text-slate-900">Settings</h1>


                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">


                    <button title='Delete account' onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600 text-white flex justify-center items-center gap-2 font-bold py-2 px-4 w-[180px] text-sm rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-300 hover:scale-105">
                        <span className='text-2xl'>
                            <MdDelete />
                        </span>
                    </button>

                    <button title='Change password' onClick={handleChangePassword} className="bg-green-500 hover:bg-green-600 text-white flex justify-center items-center gap-2 font-bold py-2 px-4 w-[180px] text-sm rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-300 hover:scale-105">
                        <span className='text-2xl'>
                            <MdPassword />
                        </span>
                    </button>

                    <button title='Change userid' onClick={handleChangeUserID} className="bg-blue-800 hover:bg-blue-900 text-white flex justify-center items-center gap-2 font-bold py-2 px-4 w-[180px] text-sm rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-300 hover:scale-105">
                        <span className='text-2xl'>
                            <MdEdit />
                        </span>
                    </button>

                </div>
            </div>

            {
                showConfirmation &&
                (
                    <DeleteConfirmationDialog message="Are you sure you want to delete your account?" onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
                )
            }
            {
                showChangePassword &&
                (
                    <ChangePasswordDialog onClose={handleCloseChangePassword} />
                )
            }
            {
                showChangeUserID &&
                (
                    <ChangeUserIDDialog onClose={handleCloseChangeUserID} />
                )
            }
        </div>
    );
}
