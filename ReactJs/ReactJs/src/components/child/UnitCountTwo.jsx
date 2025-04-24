import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Icon } from "@iconify/react/dist/iconify.js";

const USER_LIST_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/user_list";

const ADMIN_USER_ID = 1

const GET_VIDEOS = "http://localhost:3001/2025/butler_hospitality/server/webservice/get_all_video";  
  
const PDF_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/get_all_pdf";  

const CONTACT_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/get_contact_us";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE3NDA1NTU4MDV9.o2tlW7LpS4lzhyePpfCV9_oNk0l5rvtqXg-XgjLKZac";


const UnitCountFive = () => {
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalVideos, setTotalVideos] = useState(null);
    const [totalPdfs, setTotalPdfs] = useState(null);
    const [totalContacts, setTotalContacts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchTotalUsers();
    }, []);

    useEffect(()=> {
        fetchTotalVideos();
    }, []);

    useEffect(()=> {
        fetchTotalPdfs();
    })

    useEffect(() => {
        fetchTotalContacts();
    },[])


    const fetchTotalUsers = async () => {
      
        try {
            const response = await axios.get(`${USER_LIST_API}?user_id=${ADMIN_USER_ID}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            console.log("API Response:", response.data);
            if (response.data.success && Array.isArray(response.data.users)) {
                setTotalUsers(response.data.users.length); 
              } else {
                setTotalUsers(0); 
              }
        } catch (error) {
            console.error("Error fetching users:", error);
      setTotalUsers("Error");
        } finally {
            setLoading(false);
        }
    }

    const fetchTotalVideos = async () => {
       
        try {
            const response = await axios.get(GET_VIDEOS , {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            console.log("API Response:", response.data);
            if (response.data.success && Array.isArray(response.data.video)) {
                setTotalVideos(response.data.video.length); 
              } else {
                setTotalVideos(0); 
              }
        } catch (error) {
            
        }
    }

    const fetchTotalPdfs = async () => {
      
        try {
            const response = await axios.get(PDF_API , {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            console.log("API Response:", response.data);
            if (response.data.success && Array.isArray(response.data.pdf)) {
                setTotalPdfs(response.data.pdf.length); 
              } else {
                setTotalPdfs(0); 
              }
        } catch (error) {
            console.error("Error fetching users:", error);
      setTotalPdfs("Error");
        } finally {
            setLoading(false);
        }
    }

    const fetchTotalContacts = async () => {
      
        try {
            const response = await axios.get(CONTACT_API , {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            console.log("API Response:", response.data);
            if (response.data.success && Array.isArray(response.data.ContactUs)) {
                setTotalContacts(response.data.ContactUs.length); 
              } else {
                setTotalContacts(0); 
              }
        } catch (error) {
            console.error("Error fetching users:", error);
      setTotalContacts("Error");
        } finally {
            setLoading(false);
        }
    }

    return (
<div className="col-xl-12">
    <h6 className="fw-semibold text-black">Dashboard</h6>
    
    {/* Flex container for all cards */}
    <div className="row d-flex flex-wrap gap-3">
        
        {/* Total Users Card */}
        <div className="col-lg-3 col-md-6">
            <div className="card p-3 radius-8 shadow-lg"
                style={{  height: "100px", backgroundColor: "#98c1d9" }}>
                <div className="card-body p-0 d-flex align-items-center">
                  
                    <span className="w-48-px h-48-px text-2xl d-flex justify-content-center align-items-center rounded-circle" style={{ color: " #ee6c4d", backgroundColor: "#e0fbfc"}}>
                        <i className="ri-group-fill" />
                    </span>
                  
                    <div className="ms-3">
                        <h5 className="fw-semibold mb-0" >{loading ? "Loading..." : totalUsers ?? "N/A"}</h5>
                        <span className="fw-medium text-sm" >Total Users</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Total Videos Card */}
        <div className="col-lg-3 col-md-6">
            <div className="card p-3 radius-8 shadow-lg "
                style={{ height: "100px", backgroundColor: "#98c1d9" }}>
                <div className="card-body p-0 d-flex align-items-center">
                    <span className="w-48-px h-48-px text-2xl d-flex justify-content-center align-items-center rounded-circle" style={{ color: " #3d5a80", backgroundColor: "#e0fbfc"}}>
                        <Icon icon="mdi:video-box" className="menu-icon" />
                    </span>
                    <div className="ms-3">
                        <h5 className="fw-semibold mb-0">{loading ? "Loading..." : totalVideos ?? "N/A"}</h5>
                        <span className="fw-medium text-secondary-light text-sm">Total Videos</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Total PDFs Card */}
        <div className="col-lg-3 col-md-6">
            <div className="card p-3 radius-8 shadow-lg"
                style={{  height: "100px", backgroundColor: "#98c1d9" }}>
                <div className="card-body p-0 d-flex align-items-center">
                    <span className="w-48-px h-48-px text-2xl d-flex justify-content-center align-items-center rounded-circle " style={{ color: "rgb(115, 126, 146)", backgroundColor: "#e0fbfc"}}>
                        <Icon icon="mdi:file-pdf-box" className="menu-icon" />
                    </span>
                    <div className="ms-3">
                        <h5 className="fw-semibold mb-0">{loading ? "Loading..." : totalPdfs ?? "N/A"}</h5>
                        <span className="fw-medium text-secondary-light text-sm">Total PDFs</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Contact Us Card */}
        <div className="col-lg-3 col-md-6">
            <div className="card p-3 radius-8 shadow-lg"
                style={{  height: "100px", backgroundColor: "#98c1d9" }}>
                <div className="card-body p-0 d-flex align-items-center">
                    <span className="w-48-px h-48-px text-2xl d-flex justify-content-center align-items-center rounded-circle " style={{ color: "rgb(215, 106, 78)", backgroundColor: "#e0fbfc"}}>
                        <i className="ri-money-dollar-circle-fill" />
                    </span>
                    <div className="ms-3">
                        <h5 className="fw-semibold mb-0">{loading ? "Loading..." : totalContacts ?? "N/A"}</h5>
                        <span className="fw-medium text-secondary-light text-sm">Contacts Us</span>
                    </div>
                </div>
            </div>
        </div>

    </div> {/* End of row */}
</div>

    );
};

export default UnitCountFive;