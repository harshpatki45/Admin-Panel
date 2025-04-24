import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill-new';
import axios from "axios";

const MESSAGE_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/get-content-by-id?&content_id=13&content_type=5"

const ShareMessage = ({ onClose }) => {
  const quillRef = useRef(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Android App URL:", url);
    onClose();
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const token = localStorage.getItem("token")

      setLoading(true)
      setMessage(false)
      try {
        const response = await axios.get(MESSAGE_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.content && response.data.content.length > 0) {
          const fetchMess = response.data.content[0].content
          setUrl(fetchMess)
        } else {
          console.warn("No content available");
          setUrl("");
        }
      } catch (error) {
        console.error("error fetching data", error);
        setMessage({ type: "error", text: "failed to load content" })
        // setUrl("");
        setValue("Failed to load content");
      } finally {
        setLoading(false);
      }
    }
    fetchMessage();
  }, [])

  const handleSave = async () => {
    const token = localStorage.getItem("token")
    try {
      const editorContent = quillRef.current.getEditor().root.innerHTML;
      await axios.post(MESSAGE_API,
        { content: editorContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage({ type: "success", text: "content saved successfully"});
    } catch (error) {
      console.error("Error saving content:", error);
      setMessage({ type: "error", text: "Failed to save content"})
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card basic-data-table radius-12 overflow-hidden mt-10">
            <div className="card-body p-0">
    
              <ReactQuill
                key={value}
                ref={quillRef}
                theme="snow"
                value={url}
                onChange={setUrl}
                placeholder="Share Message..."
              />
            </div>
    
            <div
              className="card-footer p-24  bg-base border border-bottom-0 "
              style={{ marginTop: "-20px" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-3">
                <button
                  type="button"
                  className="btn text-white text-md px-28 py-12 radius-8"
                  style={{ backgroundColor: "#03045e" }}
                  onClick={handleSave}
                >
                  Share Message
                </button>
              </div>
            </div>
          </div>
  );
};

export default ShareMessage;
