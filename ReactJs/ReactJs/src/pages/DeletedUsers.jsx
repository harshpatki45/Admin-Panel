import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MasterLayout from '../masterLayout/MasterLayout';
import axios from 'axios';
import { useEffect } from 'react';

const DELETE_LIST_API =
  "http://localhost:3001/2025/butler_hospitality/server/webservice/user_list";

const DeletedUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [deletedUsers, setDeletedUsers] = useState([]);

    useEffect(() => {
        const deleteUsers = async() => {
            const token = localStorage.getItem("token")
            console.log("token", token)
            setLoading(true)
            try {
                const response = await axios.get(DELETE_LIST_API, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data && Array.isArray(response.data.users)) {
                 const filteredUsers = response.data.users.filter(user => Number(user.delete_flag) === 1)
                 setDeletedUsers(filteredUsers);
                  } else {
                   setDeletedUsers([])
                  }
            } catch (error) {
                console.error("Error fetching deleted users:", error);
            } finally{
                setLoading(false)
            }
        }
        deleteUsers();
    }, []);

    return (
        <>
        <MasterLayout>
        <h6 className='fw-semibold text-black'>Deleted Users</h6>
        <div className="card h-100 p-0 radius-12 ">
            <div className="card-header border-bottom  py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between " >
                <div className="d-flex align-items-center flex-wrap gap-3" >
                   
                    <form className="navbar-search">
                        <input
                            type="text"
                             className="form-control border border-black rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            name="search"
                            placeholder="Search"
                        />
                       
                    </form>
                </div>
            </div>
            <div className="card-body p-24" >
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0" >
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div className="d-flex align-items-center gap-10">
                                        <div className="form-check style-check d-flex align-items-center">
                                            {/* <input
                                                className="form-check-input radius-4 border input-form-dark"
                                                type="checkbox"
                                                name="checkbox"
                                                id="selectAll"
                                            /> */}
                                        </div>
                                        S.L
                                    </div>
                                </th>
                                <th scope="col" className="text-center">Action</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile No.</th>
                                <th scope='col'> Delete Reason</th>
                                <th className="text-center" scope="col">Delete Date</th>
                            </tr>
                        </thead>
                        {deletedUsers.length > 0 ? (
                            deletedUsers.map ((user) => 
                                <tbody>
                            <tr key={user.users_id} >
                                <td>
                                    <div className="d-flex align-items-center gap-10">
                                        {user.user_id}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex align-items-center gap-10 justify-content-center">
                                        <button
                                            type="button"
                                            className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                        >
                                            <Icon
                                                icon="majesticons:eye-line"
                                                className="icon text-xl"
                                            />
                                        </button>
                                       
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="assets/images/user-list/user-list1.png"
                                            alt="Wowdash"
                                            className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                        />
                                        <div className="flex-grow-1">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                               {user.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-md mb-0 fw-normal text-secondary-light">
                                      {user.email}
                                    </span>
                                </td>
                              
                                <td >{user.mobile}</td>
                                <td>{user.delete_reason}</td>
                                <td className="text-center">{user.createtime}</td>
                            </tr>
                        </tbody>
                        ) ) : ( <p>
                            No deleted User Found
                        </p>)}
                        
                    </table>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                    <span>Showing 1 to 10 of 12 entries</span>
                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                                to="#"
                            >
                                <Icon icon="ep:d-arrow-left" className="" />
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                                to="#"
                            >
                                1
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                                to="#"
                            >
                                2
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                to="#"
                            >
                                3
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                to="#"
                            >
                                4
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                to="#"
                            >
                                5
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                                to="#"
                            >
                                {" "}
                                <Icon icon="ep:d-arrow-right" className="" />{" "}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </MasterLayout>
        </>
    );
};

export default DeletedUsers;
