import React, { useEffect, useState } from 'react';
import axios from "axios";

const ANDROID_API =
  "http://localhost:3001/2025/butler_hospitality/server/webservice/get-content-by-id?content_id=14&content_type=4";

const AndroidAppUrlForm = ({ onClose }) => {
    const [url, setUrl] = useState("");
    const[loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Android App URL:", url);
        onClose(); 
    };

    useEffect(() => {
        const fetchAndroid = async() => {
            setLoading(true)
            setMessage(null)

            const token = localStorage.getItem("token")

            try {
                const response = await axios.get(ANDROID_API, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                
                  if(response.data && response.data.content && response.data.content.length > 0 )
                  {
                   const fetchAndroidUrl = response.data.content[0].content || "";
                   setUrl(fetchAndroidUrl);
                  } else {
                    console.warn("No Content Available");
                    setUrl("")
                  }
            } catch (error) {
                console.error("Error fetching content", error);
        setMessage({ type: "error", text: "Failed to load content" });
        setUrl("");
      } finally {
        setLoading(false);
      }
        }
        fetchAndroid();
    }, [])


    return (
        <div className="card p-4  mt-4 " style={{ backgroundColor: "rgb(231, 232, 234)", }}>
            <h7 className="mb-12">Enter Android App URL</h7>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Android App URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{ display: "flex", alignItems: "center", borderRadius: "10px", backgroundColor : '#fff' }}
                />
                {loading &&  <p>Loading...</p>}
                {message && <p style={{ color: message.type === "error" ? "red" : "green" }}>{message.text}</p>}
                <div className="d-flex gap-2"
                 >
                    <button type="submit" className="btn  px-10 py-8 text-white" style={{ backgroundColor: "rgb(28, 81, 214)" }}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default AndroidAppUrlForm;
