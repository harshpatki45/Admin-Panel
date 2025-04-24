import React, { useEffect, useState } from 'react';
import MasterLayout from '../masterLayout/MasterLayout';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const USER_LIST_API =
    "http://localhost:3001/2025/butler_hospitality/server/webservice/user_list";

// const members = Array.from({ length: 10 }, (_, i) => `User ${i + 1}`);

const MessageForm = () => {
    const [selectedMember, setSelectedMember] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMesssage] = useState('');
    const [activeSection, setActiveSection] = useState("default");
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to an API
        console.log('Selected Member:', selectedMember);
        console.log('Title:', title);
        console.log('Message:', message);
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem("Token");
        setLoading(true);
        try {
            const response = await axios.get(USER_LIST_API, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: { user_id: 1 },
            });

            console.log("Fetched users:", response.data.users);

            if (response.data && response.data.users && Array.isArray(response.data.users)) {
                const list = response.data.users;
                const mappedOptions = list.map(item => ({
                    label: item.name,
                    value: item.user_id
                }));
                console.log("Mapped dropdown options:", mappedOptions);
                setOptions(mappedOptions);
            } else {
                console.warn("Unexpected API structure");
            }
        } catch (error) {
            console.error("Error Occurred", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <MasterLayout>
                <div className="d-flex align-items-center text-white justify-content-center gap-3">
                    <button
                        className="btn text-white text-md px-15 py-8 radius-8"
                        style={{ backgroundColor: activeSection === "default" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)"  }}
                        onClick={() => setActiveSection("default")}
                    >
                        All Members
                    </button>
                    <button
                        className="btn text-white text-md px-15 py-8 radius-8"
                        style={{ backgroundColor: activeSection === "select" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)"  }}
                        onClick={() => setActiveSection("select")}
                    >
                        Select Members
                    </button>
                </div>

                {activeSection === "default" && (
                    <div style={{ borderRadius: "10px", padding: "10px" }}>
                        <h2 className="text-xl font-semibold mb-4">Broadcast</h2>
                        <form onSubmit={handleSubmit} className=" mx-auto p-4 bg--vanilla-200 rounded-lg shadow-md">
                            <div className="mb-4">
                                <p htmlFor="member" className="block text-gray-700 font-bold mb-2">
                                    Select Members
                                </p>
                                <select
                                    id="member"
                                    value={selectedMember}
                                    onChange={(e) => setSelectedMember(e.target.value)}
                                    className="form-control border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    style={{ backgroundColor: '#fff' }}
                                >
                                    <option value="">Select members </option>
                                    {options.length > 0 ? (
                                        options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No users found</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-4">
                                <p htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                    Title
                                </p>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                // style={{ backgroundColor : '#FAE9AE'}}
                                />
                            </div>
                            <div className="mb-6">
                                <p htmlFor="message" className="block text-gray-700 font-bold mb-2">
                                    Message
                                </p>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMesssage(e.target.value)}
                                    rows="4"
                                    className="form-control border  border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                // style={{ backgroundColor : '#FAE9AE'}}
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-center">
                                <Button
                                    type="submit"
                                    className="btn manage-btn text-sm text-white btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2 border border-[#938552] "
                                   
                                >
                                    Send
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {activeSection === "select" && (
                    <div
                        className=""
                        style={{ borderRadius: "10px", padding: "10px", }}
                    >
                        <h6 className="text-xl font-semibold mb-4 text-black">Broadcast</h6>
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto p-4 text-black rounded-lg shadow-md"
                        >
                            <div className="mb-4">
                                <p htmlFor="title" className="block text-black font-bold mb-2">Title</p>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                    className="form-control border border-black rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    style={{ backgroundColor: "white" }}
                                />
                            </div>
                            <div className="mb-6">
                                <p htmlFor="message" className="block text-black font-bold mb-2">
                                    Message
                                </p>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMesssage(e.target.value)}
                                    rows="4"
                                    placeholder="Enter message"
                                    className="form-control border border-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                                    style={{ backgroundColor: "white" }}
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-center">
                                <Button
                                    type="submit"
                                    className="btn text-sm text-white btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2 border border-[#938552]"
                                    style={{ backgroundColor: "rgb(28, 81, 214)" }}
                                >
                                    Send
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </MasterLayout>
        </>
    );
};

export default MessageForm;