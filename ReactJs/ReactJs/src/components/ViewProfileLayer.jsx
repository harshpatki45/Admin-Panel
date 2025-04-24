import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const PROFILE_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/profile_details"

const CHANGE_PASSWORD = "http://localhost:3001/2025/butler_hospitality/server/webservice/change_password"


const ViewProfileLayer = () => {
    const [imagePreview, setImagePreview] = useState('assets/images/user-grid/88756468.jpeg');
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [profileDetails, setProfileDetails] = useState(null)
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Change Password 
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setMessage("New Password and Confirm Password should match ")
            return
        }

        const payload = {
            oldPassword,
            newPassword
        }

        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(CHANGE_PASSWORD, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            });
            setMessage(response.data.message || "Password changed successfully");
            // alert("Password changed successfully")
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');


        } catch (error) {
            console.error('Error changing password:', error);
            setMessage(error.response?.data?.message || "An error occurred while changing password.");
        } finally {
            setLoading(false)
        }
    }




    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(PROFILE_API, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { users_id: userId },
                });

                if (response.data.success) {
                    setProfile(response.data.user_details);
                } else {
                    setError("User not found");
                }
            } catch (err) {
                setError("Error fetching profile details");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };
    return (
        <div className="row gy-4">
            <div className="col-lg-4">
                <div className="user-grid-card position-relative  radius-16 overflow-hidden  h-100 bg-white">
                    <img
                        src="assets/images/user-grid/user-grid-bg1.png"
                        alt=""
                        className="w-100 object-fit-cover"

                    />
                    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                            <img
                                id="imagePreview"
                                style={{
                                    backgroundImage: `url(${imagePreview})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                alt=""
                                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                            />
                            <h6 className="mb-0 mt-16"> {profile?.full_name || "N/A"}</h6>
                            <span className="text-secondary-light mb-16">{profile?.email || "N/A"}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {profile?.full_name || "N/A"}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {profile?.email || "N/A"}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Phone Number
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {profile?.mobile || "N/A"}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="">
                    <div className="card-body p-24 radius-16" style={{ backgroundColor: "#fff" }}>
                        <ul
                            className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center text-black px-24 active"
                                    id="pills-edit-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-edit-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-edit-profile"
                                    aria-selected="true"
                                >
                                    Edit Profile
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center text-black px-24"
                                    id="pills-change-passwork-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-change-passwork"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-change-passwork"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Change Password
                                </button>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24"
                                    id="pills-notification-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-notification"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-notification"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Notification Settings
                                </button>
                            </li> */}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-edit-profile"
                                role="tabpanel"
                                aria-labelledby="pills-edit-profile-tab"
                                tabIndex={0}
                            >
                                <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                                {/* Upload Image Start */}
                                <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={readURL}
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                                            >
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: `url(${imagePreview})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Upload Image End */}
                                <form action="#">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Full Name
                                                    <span className="text-danger-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control bg-white radius-8 border border-black "
                                                    id="name"
                                                    placeholder="Enter Full Name"
                                                    value={profile?.full_name || "N/A"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Email <span className="text-danger-600">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control bg-white radius-8 border border-black"
                                                    id="email"
                                                    placeholder="Enter email address"
                                                    value={profile?.email || "N/A"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="number"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control radius-8 bg-white border border-black"
                                                    id="number"
                                                    placeholder="Enter phone number"
                                                    value={profile?.mobile || "N/A"}
                                                />
                                            </div>
                                        </div>




                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            type="button"
                                            className=" bg-hover-danger text-white text-md px-50 py-11 radius-8"
                                            style={{ backgroundColor: "#720403" }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white text-md px-56 py-12 radius-8"
                                            style={{ backgroundColor: "#03045e" }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {message && (
                                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="tab-pane fade" id="pills-change-passwork" role="tabpanel" aria-labelledby="pills-change-passwork-tab" tabIndex="0">
                                    <div className="mb-20">
                                        <label htmlFor="confirm-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Old Password <span className="text-danger-600">*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={oldPasswordVisible ? "text" : "password"}
                                                className="form-control radius-8 bg-white border border-black"
                                                id="oldPassword"
                                                placeholder="Old Password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                            <span
                                                className={`toggle-password ${oldPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                                onClick={toggleOldPasswordVisibility}
                                            ></span>

                                        </div>
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="your-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            New Password <span className="text-danger-600">*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={newPasswordVisible ? "text" : "password"}
                                                className="form-control radius-8 border bg-white border-black"
                                                id="newPassword"
                                                placeholder="Enter New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <span
                                                className={`toggle-password ${newPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                                onClick={toggleNewPasswordVisibility}
                                            ></span>
                                        </div>
                                    </div>

                                    <div className="mb-20">
                                        <label htmlFor="confirm-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Confirm Password <span className="text-danger-600">*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={confirmPasswordVisible ? "text" : "password"}
                                                className="form-control radius-8 bg-white border border-black"
                                                id="confirmPassword"
                                                placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <span
                                                className={`toggle-password ${confirmPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                                onClick={toggleConfirmPasswordVisibility}
                                            ></span>

                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3"
                                    >
                                        <button type="submit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#successModal"
                                            className="btn text-white text-md px-56 py-12 radius-8"
                                            style={{ marginTop: "30%", backgroundColor: "#03045e" }} disabled={loading}>
                                            {loading ? 'Changing...' : 'Change Password'}
                                        </button>


                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <div
                className="modal fade"
                id="successModal"
                tabIndex="1"
                role="dialog"
                aria-labelledby="successModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Password Change Success</h5>
                            <button
                                type="button"
                                className="close display-flex justify-between"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                style={{
                                    fontSize: "30px"
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center text-md">
                           Your Password has been changed!
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
        </div>

    );
};

export default ViewProfileLayer;
