import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill-new';
import 'highlight.js/styles/github.css';
import axios from 'axios';

const CONTENT_API =
  "http://localhost:3001/2025/butler_hospitality/server/webservice/get-content-by-id?content_type=0";

const AboutContent = () => {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");
  const [isHighlightReady, setIsHighlightReady] = useState(false);
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)


  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(CONTENT_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response About", response.data)

      if (response.data && response.data.content && response.data.content.length > 0) {
        console.log("Value", response.data.content[0].content)
        setValue(response.data.content[0].content)
      } else {
        console.warn("Error getting data")
        setValue("No data Found")
      }
    } catch (error) {
      console.error(" Error fetching content:", error);
      setMessage({ type: "error", text: "Failed to load content." });
      setValue("<p>Failed to load content.</p>");
    }
  }

  useEffect(() => {
    hljs?.configure({
      languages: ['javascript', 'ruby', 'python', 'java', 'csharp', 'cpp', 'go', 'php', 'swift'],
    });

    fetchContent();
  }, []);

  useEffect(() => {
    console.log("Value", value)
  }, [value])

  const handleSave = async () => {

    setLoading(true)
    setMessage(null)

    const token = localStorage.getItem("token");

    try {
      const editorContent = quillRef.current.getEditor().root.innerHTML;
      console.log("Editor content:", editorContent);

      await axios.post(CONTENT_API, {
        content: editorContent
      },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setMessage({ type: "success", text: "content saved successfully" })
    } catch (error) {
      console.error(" Error fetching content:", error);
      setMessage({ type: "error", text: "Failed to load content." });
    } finally {
      setLoading(false)
    }
  };

  const modules = isHighlightReady
    ? {
      syntax: {
        highlight: (text) => hljs?.highlightAuto(text).value,
      },
      toolbar: { container: '#toolbar-container' },
    }
    : { toolbar: { container: '#toolbar-container' } };

  const formats = [
    'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
    'script', 'header', 'blockquote', 'code-block', 'list', 'indent',
    'direction', 'align', 'link', 'image', 'video', 'formula',
  ];
  return (
    <div>
      <div className="card basic-data-table radius-12 overflow-hidden mt-10">
        <div className="card-body p-0">
          <div id="toolbar-container">
            <span className="ql-formats">
              <select className="ql-font"></select>
              <select className="ql-size"></select>
            </span>
            <span className="ql-formats">
              <button className="ql-bold"></button>
              <button className="ql-italic"></button>
              <button className="ql-underline"></button>
              <button className="ql-strike"></button>
            </span>
            <span className="ql-formats">
              <select className="ql-color"></select>
              <select className="ql-background"></select>
            </span>
            <span className="ql-formats">
              <button className="ql-script" value="sub"></button>
              <button className="ql-script" value="super"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-header" value="1"></button>
              <button className="ql-header" value="2"></button>
              <button className="ql-blockquote"></button>
              <button className="ql-code-block"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-list" value="ordered"></button>
              <button className="ql-list" value="bullet"></button>
              <button className="ql-indent" value="-1"></button>
              <button className="ql-indent" value="+1"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-direction" value="rtl"></button>
              <select className="ql-align"></select>
            </span>
            <span className="ql-formats">
              <button className="ql-link"></button>
              <button className="ql-image"></button>
              <button className="ql-video"></button>
              <button className="ql-formula"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-clean"></button>
            </span>
          </div>

          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            placeholder="About..."
          />
        </div>

        <div
          className="card-footer p-24  bg-base border border-bottom-0 "
          style={{ marginTop: "-20px" }}
        >
          <div className="d-flex align-items-center justify-content-center gap-3">
            <button
              type="button"
              className="border border-danger-600 bg-hover-danger text-danger text-md px-50 py-11 radius-8"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn text-white text-md px-28 py-12 radius-8"
              style={{ backgroundColor: "rgb(28, 81, 214)" }}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
