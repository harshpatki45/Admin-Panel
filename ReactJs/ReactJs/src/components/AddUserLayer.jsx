import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import axios from 'axios';

const ADD_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/add_user";

const AddUserLayer = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fullName, setFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [createtime, setCreatetime] = useState(new Date().toISOString().slice(0, 19).replace('T', ' ')); // Set default createtime
    const [users, setUsers] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        try {
            const response = await axios.post(ADD_API, {
                name: fullName,
                email: userEmail,
                mobile: mobile,
                active_flag: 1, // Assuming active_flag is always 1 for new users
                user_type: 1,
                createtime: createtime
            }, {
                headers: {
                    "Authorization": `Bearer ${token}` // Include the token in the headers
                }
            });
            console.log("Response", response);
            if (response.data.success) {
                // Reset form fields after successful submission
                setFullName("");
                setUserEmail("");
                setMobile("");
                setJoinDate("");
                setCreatetime(new Date().toISOString().slice(0, 19).replace('T', ' '));
                setImagePreviewUrl('');
                alert("User  added successfully!");

            
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-10 col-xl-10 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <h4 className="text-lg text-center text-primary-light mb-16">Enter User Details</h4>
                                {/* Upload Image Start */}
                                {/* <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',
                                                }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* Upload Image End */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Full Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8 border"
                                            id="name"
                                            placeholder="Enter Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Email <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8 border"
                                            id="email"
                                            placeholder="Enter email address"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="number"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8 border"
                                            id="number"
                                            placeholder="Enter phone number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="joinDate"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Joining Date
                                        </label>
                                        <input
                                            className="form-control border radius-8"
                                            id="joinDate"
                                            type="date"
                                            value={joinDate}
                                            onChange={(e) => setJoinDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            type="button"
                                            className=" bg-hover-danger text-white text-md px-50 py-11 radius-8"
                                            style={{ backgroundColor: "#720403" }}>
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white text-md px-56 py-12 radius-8"
                                            style={{ backgroundColor: "#03045e" }}
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                    {error && <div className="text-danger">{error}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserLayer;