"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { utils, writeFile } from "xlsx";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    }

    const downloadExcel = () => {
        const worksheet = utils.json_to_sheet(users);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Users");
        writeFile(workbook, "Users.xlsx");
    };

    async function handleVerification(userId, isVerified) {
        try {
            await axios.put("/api/users", { userId, isVerified: !isVerified });
            fetchUsers();
        } catch (error) {
            console.error("Error updating verification", error);
        }
    }

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 shadow-lg rounded-lg overflow-x-auto">
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Admin Panel</h1>

                <button
                    onClick={downloadExcel}
                    className="mb-4 px-3 py-2 text-sm md:text-base bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
                >
                    Download Excel
                </button>

                {/* Responsive Table Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-xs md:text-sm">
                                <th className="border p-2">Image</th>
                                <th className="border p-2">First Name</th>
                                <th className="border p-2">Last Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Transaction ID</th>
                                <th className="border p-2">Events Registered</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border text-xs md:text-sm">
                                    <td className="border p-2 flex justify-center">
                                        <img
                                            src={user.image}
                                            alt="User"
                                            className="w-10 h-10 md:w-16 md:h-16 rounded-full cursor-pointer"
                                            onClick={() => setSelectedImage(user.image)}
                                        />
                                    </td>
                                    <td className="border p-2">{user.firstname}</td>
                                    <td className="border p-2">{user.lastname}</td>
                                    <td className="border p-2 truncate max-w-[100px]">{user.email}</td>
                                    <td className="border p-2 truncate max-w-[100px]">{user.transaction_id || "N/A"}</td>
                                    <td className="border p-2 truncate max-w-[150px]">
                                        {user.event?.length > 0 ? user.event.join(", ") : "No Events"}
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleVerification(user._id, user.isVerified)}
                                            className={`px-3 py-1 text-xs md:text-sm text-white rounded w-full ${user.isVerified ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                                                }`}
                                        >
                                            {user.isVerified ? "Verified" : "Verify"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-full max-h-[80vh]">
                        <img src={selectedImage} alt="User" className="w-full max-h-[80vh] object-contain" />
                    </div>
                </div>
            )}
        </div>

    );
}
