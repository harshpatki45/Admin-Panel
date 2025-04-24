import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const API = "http://localhost:3001/2025/butler_hospitality/server/webservice/login";

const SignInLayer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true)

    try {
      const response = await axios.post(API, {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        const userId = response.data.user_details.user_id
        localStorage.setItem("userId", userId);
        localStorage.setItem("userDetails", JSON.stringify(response.data.user_details));
        console.log(response.data);
        navigate("/index-2");
      } else {
        setError("Enter all Login Details");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
    } finally {
      setLoading(false)
    }

  };

  // Toggle Password
  const PasswordVisible = () => {
    setTogglePassword(!togglePassword);
  }



  return (
    <section className='auth   flex-wrap'
      // style={gradientStyle}
     style={{background: "linear-gradient(135deg, #3d5a80 0%, #98c1d9 25%, #e0fbfc 50%, #98c1d9 75%, #ee6c4d 90%, #293241 100%)",
       backgroundAttachment: "fixed", backgroundSize: "cover", height: "100vh", margin: "0"}}
    >
     
      <div className=' py-32 px-24  align-items justify-content-center'

      >
        <div className='max-w-464-px py-10 px-10 mx-auto w-100 mt-60 rounded shadow-lg'
        style={{ background: "#e0fbfc"}}>
          <div>
            <Link to='/' className='mb-40 max-w-900-px text-center d-flex justify-content-center col-md-12'>
              <img src='assets/images/asset/bar-graph_7308707.png' alt='' style={{height: "12%", width: "14%"}} />
            </Link>
            <h4 className='  text-center' style={{ color:" #293241 " }}>ADMIN PANEL</h4>
            <p className='mb-32 text-center'  style={{ color:"rgb(80, 91, 110) " }} >
              Admin Control Panel
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16 col-md-12'>
              {error && (
                <p style={{ textAlign: "center", color: "red" }}>{error}</p>
              )}
              <span className='icon top-50  translate-middle-y' style={{ left: "12%" }}>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                className='form-control h-46-px w-75 radius-10 border-black text-white'
                style={{ backgroundColor: " #caf0f8", margin: '0 auto' }}
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && (
              <p style={{ textAlign: "center", color: "red" }}>{error.email}</p>
            )}
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y' style={{ left: "12%" }}>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type={togglePassword ? "text" : "password"}
                  className='form-control h-46-px w-75 radius-10 border-black text-white'
                  style={{ backgroundColor: " #caf0f8", margin: '0 auto' }}
                  id='your-password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <p style={{ textAlign: "center", color: "red" }}>{error.password}</p>
              )}
              <span
                className={`your-password ${togglePassword ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-20 top-50 translate-middle-y me-16 text-secondary-light1`}
                data-toggle='#your-password'
                style={{ right: "10%" }}
                onClick={PasswordVisible}
              />
            </div>
            <div className="d-flex justify-content-center col-md-12">

              <button
                type='submit'
                className='btn text-sm btn-sm px-10 py-12 w-30 radius-12 mt-12 text-white mb-20'
                style={{ backgroundColor: "#293241" }}
                disabled={loading}
              >


                {loading ? <>
                <ClipLoader color="#fff" size={20} className="me-2" />
                Signing In...
                </> : (
            "Sign In"
          )}
              </button>
            </div>

          </form>



          <div className='border-top  mb-20'>
            <div className='d-flex justify-content-center col-md-12 mt-10'>
              <Link to='/forgot-password' className='fw-medium text-center ' style={{ fontSize: "12px", color: "rgb(72, 147, 191)" }}>
                Forgot Password?
              </Link>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;