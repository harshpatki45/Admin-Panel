import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill-new';
import 'highlight.js/styles/github.css';
import AndroidAppUrlForm from './child/AndroidAppUrlForm';
import IOSAppUrlForm from './child/Iosform';
import ShareMessageForm from './child/ShareMessage';
import AboutContent from '../pages/AboutContent';
import PricacyPolicyContent from '../pages/PricacyPolicyContent';
import TermsAndConditionContent from '../pages/TermsandConditionContent';


const TermsConditionLayer = () => {
    const quillRef = useRef(null);
    const [value, setValue] = useState("");
    const [isHighlightReady, setIsHighlightReady] = useState(false);
    const [activeSection, setActiveSection] = useState("default"); 

    useEffect(() => {
        hljs?.configure({
            languages: ['javascript', 'ruby', 'python', 'java', 'csharp', 'cpp', 'go', 'php', 'swift'],
        });
    }, []);

    const handleSave = () => {
        const editorContent = quillRef.current.getEditor().root.innerHTML;
        console.log("Editor content:", editorContent);
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
        <>
            <div className="d-flex align-items-center text-white justify-content-center gap-3">
            <button 
                    className="btn text-white text-md px-15 py-8 radius-8"  
                    style={{ backgroundColor: activeSection === "default" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)" }}
                    onClick={() => setActiveSection("default")}
                >
                    About
                </button>
                <button 
                    className="btn text-white text-md px-15 py-8 radius-8"  
                    style={{ backgroundColor: activeSection === "Privacy" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)" }}
                    onClick={() => setActiveSection("Privacy")}
                >
                    Privacy Policy
                </button>
                <button className="btn text-white text-md px-15 py-8 radius-8"
                style={{ backgroundColor: activeSection === "Terms" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)"}} 
                onClick={() => setActiveSection("Terms")}>
                    Terms & Condition
                </button>
                <button className="btn text-white text-md px-15 py-8 radius-8"
                style={{ backgroundColor: activeSection === "androidForm" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)" }} 
                onClick={() => setActiveSection("androidForm")}>
                    Android App Url
                </button>
                <button className="btn text-white text-md px-15 py-8 radius-8"
                style={{ backgroundColor: activeSection === "iosForm" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)" }} 
                onClick={() => setActiveSection("iosForm")}>
                    IOS App Url
                </button>
                <button className="btn text-white text-md px-15 py-8 radius-8"
                style={{ backgroundColor: activeSection === "shareMessage" ? "rgb(235, 110, 79)" : "rgb(220, 49, 7)" }} 
                onClick={() => setActiveSection("shareMessage")}>
                    Send Message
                </button>
            </div>

            {activeSection === "androidForm" && (
                <div className="mt-3">
                    <AndroidAppUrlForm onClose={() => setActiveSection("default")} />
                </div>
            )}

            {activeSection === "iosForm" && (
                <div className="mt-3">
                    <IOSAppUrlForm onClose={() => setActiveSection("default")} />
                </div>
            )}

            {activeSection === "shareMessage" && (
                <div className="mt-3">
                    <ShareMessageForm onClose={() => setActiveSection("default")} />
                </div>
            )}

            {activeSection === "default" && (
               <div className="mt-3">
               <AboutContent onClose={() => setActiveSection("default")} />
           </div>
            )}

            {activeSection === "Privacy" && (
                <div className="mt-3">
                <PricacyPolicyContent  onClose={() => setActiveSection("Privacy")} />
            </div>
            )}

            {activeSection === "Terms" && (
                <div className='mt-3'>
                    <TermsAndConditionContent onClose={() => setActiveSection("Terms")} />
                </div>
            )}
        </>
    );
};

export default TermsConditionLayer;
