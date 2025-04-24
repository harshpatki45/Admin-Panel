import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon } from "@iconify/react/dist/iconify.js";

const API = 'http://localhost:3001/2025/butler_hospitality/server/webservice/get_faq';
const API_ADD = 'http://localhost:3001/2025/butler_hospitality/server/webservice/add_faq';

const FaqLayer = () => {
    const [loading, setLoading] = useState(false)
    const [faq, setFaq] = useState([])
    const [error, setError] = useState(null)
    const [addfaq, setAddFaq] = useState("")
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        const fetchFaqs = async() => {
            setLoading(true)
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(API, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.data.success && response.data.faq) {
                    setFaq(response.data.faq)
                } else {
                    setFaq([]);
                }
                setLoading(false)
            } catch (error) {
                setError("Failed to load FAQs. Try again later")

            }
        }
        fetchFaqs()
    }, []);

    const handleSubmit = async() => {
        setLoading(true)
        setAddFaq('')
        const token = localStorage.getItem("token")

        try {
            const response = await axios.post(API_ADD, {
                question,
                answer
            })
            if (response.data.success){
                setFaq([...faq, faq]);
                setAddFaq(response.data.faq)
                setQuestion(" ")
                setAnswer(" ")
            } else {
                setAddFaq(response.data.message || "something went wrong")
            }
        } catch (error) {
            setError("cannot add Faq")
        }
    }


  return (
    <>
    <h2 className="text-xl font-semibold mb-4 text-black">Manage FAQs</h2>
   <div className="card basic-data-table">
       <div className="card-body bg-base responsive-padding-40-150">
         <div className='d-flex justify-content-end mb-3'>
            <button
                       type="button"
                       className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                       data-bs-toggle="modal"
                       data-bs-target="#exampleModal"
                     >
                       <Icon
                         icon="ic:baseline-plus"
                         className="icon text-xl line-height-1"
                       />
                       Add New 
                     </button>
                     </div>
           <div className="row gy-6">
               <div className="col-lg-12">
                   <div className="tab-content">
                       <div className="tab-pane fade show active">
                           <div className="accordion" id="faqAccordion">
                               {loading && <p>Loading FAQs...</p>}
                               
                               {faq.length > 0 ? (
                                   faq.map((faq, index) => (
                                       <div className="accordion-item" key={index}>
                                           <h2 className="accordion-header">
                                               <button
                                                   className="accordion-button"
                                                   type="button"
                                                   data-bs-toggle="collapse"
                                                   data-bs-target={`#collapse${index}`}
                                                   aria-expanded={index === 0 ? 'true' : 'false'}
                                                   aria-controls={`collapse${index}`}
                                               >
                                                   {faq.question}
                                               </button>
                                           </h2>
                                           <div
                                               id={`collapse${index}`}
                                               className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                               data-bs-parent="#faqAccordion"
                                           >
                                               <div className="accordion-body">
                                                   {faq.answer}
                                               </div>
                                           </div>
                                       </div>
                                   ))
                               ) : (
                                   !loading && !error && <p>No FAQs available.</p>
                                   
                               )}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>

   <div
   className="modal fade"
   id="exampleModal"
   tabIndex={-1}
   aria-labelledby="exampleModalLabel"
   aria-hidden="true"
 >
   <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered">
     <div className="modal-content radius-16 bg-base">
       <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
         <h1 className="modal-title fs-5" id="exampleModalLabel">
           Add FAQs
         </h1>
         <button
           type="button"
           className="btn-close"
           data-bs-dismiss="modal"
           aria-label="Close"
         />
       </div>
       <div className="modal-body p-24">
         <form onSubmit={handleSubmit}>
           <div className="row">
             <div className="col-6 mb-20">
               <label
                 htmlFor="name"
                 className="form-label fw-semibold text-primary-light text-sm mb-8"
               >
                 Question{" "}
               </label>
               <input
                 type="text"
                 className="form-control radius-8 border"
                 id="name"
                 placeholder="Enter the Question"
                 value={question}
                 onChange={(e) => setQuestion(e.target.value)}
               />
             </div>
             <div className="col-6 mb-20">
               <label
                 htmlFor="country"
                 className="form-label fw-semibold text-primary-light text-sm mb-8"
               >
                 Answer{" "}
               </label>
               <input
                 type="text"
                 className="form-control radius-8 border"
                 id="name"
                 placeholder="Answer"
                 value={answer}
                 onChange={(e) => setAnswer(e.target.value) }
               />
             </div>
             <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
               <button
                 type="reset"
                 className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
               >
                 Reset
               </button>
               <button
                 type="submit"
                 className="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8"
                 disabled={loading}>
                  {loading ? "Saving..." : "Add FAQ"}
               </button>
             </div>
           </div>
         </form>
       </div>
     </div>
   </div>
 </div>
   </>
  )
}

export default FaqLayer
