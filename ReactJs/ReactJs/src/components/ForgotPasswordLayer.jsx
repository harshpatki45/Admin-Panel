import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const FORGOT_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/forgot_password"

const ForgotPasswordLayer = () => {
    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(FORGOT_API, { email }, { // Include email in request
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log("Api response", response.data)
            if (response.data.success) {
                setModal(true);
            } else {
                alert(response.data.message || "Error sending mail");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Something went wrong. Try again later.");
        }
    }

    return (
        <>
            <section className="auth   flex-wrap"
                style={{
                    background: "linear-gradient(135deg, #3d5a80 0%, #98c1d9 25%, #e0fbfc 50%, #98c1d9 75%, #ee6c4d 90%, #293241 100%)",
                    backgroundAttachment: "fixed", backgroundSize: "cover", height: "100vh", margin: "0"
                }}
            >
                {/* Left side content (unchanged) */}
                <div className=" py-32 px-24  align-items justify-content-center">
                    <div className="max-w-464-px py-10 px-10 mx-auto w-100 mt-60 rounded shadow-lg"
                        style={{ background: "#e0fbfc" }}>
                        <div>
                            <h4 className=" text-center" style={{ color: " #293241 " }}>Forgot Password</h4>
                            <div className='aligh-items-center flex-wrap justify-content-center'>
                                <p className='mt-20 text-center' style={{ color: "rgb(80, 91, 110) " }} >
                                    Enter the email address associated with <br /> 
                                    your account and we will send you a   <br />
                                    link to reset your password.
                                </p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className='mt-20'>
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y" style={{ left: "12%" }}>
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="email"
                                    className='form-control h-46-px w-75 radius-10 border-black text-white'
                                    style={{ backgroundColor: " #caf0f8", margin: '30px auto 0 auto' }}
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='d-flex justify-content-center col-md-12'>
                                <button
                                    type="submit"
                                    className='btn text-sm btn-sm px-10 py-12 w-30 radius-12 mt-12 text-white mb-20'
                                    style={{ backgroundColor: "#293241" }}
                                >
                                    Continue
                                </button>
                            </div>

                            <div className="mt-120 text-center  border-top" style={{ fontSize: "12px", color: "rgb(72, 147, 191)" }}>
                                <p className="mb-0 text-black">
                                    Already have an account?{" "}
                                    <Link to="/" className="text-black fw-semibold">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Modal (React-controlled) */}
            {modal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content radius-16 bg-base">
                                <div className="modal-body p-40 text-center">
                                    <div className="mb-32">
                                        <img src="assets/images/auth/envelop-icon.png" alt="" />
                                    </div>
                                    <h6 className="mb-12">Verify your Email</h6>
                                    <p className="text-secondary-light text-sm mb-0">
                                        Thank you, check your email for instructions to reset your password
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                                        onClick={() => setModal(false)} // Close modal
                                    >
                                        Okay
                                    </button>
                                    <div className="mt-32 text-sm">
                                        <p className="mb-0">
                                            Don’t receive an email?{" "}
                                            <Link to="/resend" className="text-primary-600 fw-semibold">
                                                Resend
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPasswordLayer