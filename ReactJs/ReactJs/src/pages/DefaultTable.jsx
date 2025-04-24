import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const REPORT_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/get_user_by_date"

const TablesBorderColorsThree = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchUserReport = async () => {
        if (!startDate || !endDate) {
            setError("Please select both start-date and end-date");
            return
        }

        setLoading(true)
        setError("")

        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(REPORT_API, {
                params: {
                    fromDate: startDate.toISOString().split("T")[0],
                    toDate: endDate.toISOString().split('T')[0]
                }, headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Report", response.data)
            if (response.data.success) {
                setUserData(response.data.activeUser !== "N/A" ? response.data.activeUser : []);
            } else {
                setUserData([])
                setError(response.data.message)
            }
        } catch (error) {
            setError("Failed to fetch data")
        }
        setLoading(false)
    }


    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Member Report</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3 d-flex align-items-center border-b">
                        <label htmlFor="fromDate" className="form-label me-3">From:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control border"
                            placeholderText="mm/dd/yyyy"
                            dateFormat="MM/dd/yyyy"
                            id="fromDate"
                        />
                        <label htmlFor="toDate" className="form-label mx-3">To:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="form-control border"
                            placeholderText="mm/dd/yyyy"
                            dateFormat="MM/dd/yyyy"
                            id="toDate"
                        />
                        <button className="btn btn-primary ms-3" type="button" onClick={fetchUserReport}>
                            {loading ? "Loading..." : "View Report"}
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="table-responsive">
                        <table className="table bordered-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Users</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col" className='text-center'>Status</th>
                                    <th scope="col">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length > 0 ? (
                                    userData.map((user, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img src="assets/images/users/user1.png" alt="" className="flex-shrink-0 me-12 radius-8" />
                                                    <span className="text-lg text-secondary-light fw-semibold flex-grow-1">{user.name}</span>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.mobile}</td>
                                            <td className="text-center">
                                                <span className={`px-24 py-4 rounded-pill fw-medium text-sm ${user.active_flag ? "bg-success-focus text-success-main" : "bg-danger-focus text-danger-main"}`}>
                                                    {user.active_flag ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td>{user.createtime}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No users found.</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablesBorderColorsThree;