import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';

const USER_LIST_API =
  "http://localhost:3001/2025/butler_hospitality/server/webservice/user_list";

const CurrenciesLayer = () => {
  const [seeUser, setSeeUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)

  const userPerPage = 5


  const toggleStatus = (userId) => {
    console.log("userId", userId)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === userId ? { ...user, active_flag: user.active_flag === 1 ? 0 : 1 }
          : user))
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("Token");
      console.log("token", token);
      setLoading(true);
      try {
        const response = await axios.get(USER_LIST_API, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { user_id: 1 },
        });
        console.log("Response", response.data);
        if (response.data.success) {
          if (response.data.users) {
            const sortedUsers = response.data.users.sort((a, b) => a.user_id - b.user_id); //important
            setUsers(sortedUsers);
          } else {
            setUsers([]);
          }
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error Occured", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser  = (newUser ) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser ];
      // Sort the updated users by createtime
      return updatedUsers.sort((a, b) => new Date(a.createtime) - new Date(b.createtime));
    });
  };

  useEffect(() => {
    console.log("Selected users", selectedUsers);
  }, [selectedUsers]);

  const handleViewUser = (user) => {
    setSelectedUsers(user)
  }

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / userPerPage)

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <Icon icon="ion:search-outline" className="icon" />
            <form className="navbar-search">
              <input
                type="text"
                className="form-control border border-black rounded w-60 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                name="search"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
        <div className="card-body p-24">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="d-flex align-items-center gap-10">
                      <div className="form-check style-check d-flex align-items-center"></div>
                      S.L
                    </div>
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                  <th className="text-center" scope="col">
                    Join Date
                  </th>
                </tr>
              </thead>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tbody>
                    <tr key={user.users_id}>
                    <td>{index + 1}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          <div className="dropdown">
                            <button
                              style={{ backgroundColor: "rgb(5, 26, 54) ", color: "white" }}
                              className="btn dropdown-toggle action-btn"
                              type="button"
                              id={`dropdownMenuButton${user.user_id}`}
                              data-bs-toggle="dropdown"
                              data-bs-display="static"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul
                              className="dropdown-menu border shadow-sm dropdown-menu-end"
                              aria-labelledby={`dropdownMenuButton${user.user_id}`}
                            >
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalEdit"
                                  onClick={() => handleViewUser(user)}
                                >
                                  <Icon
                                    icon="majesticons:eye-line"
                                    className="icon text-xl"
                                  />
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                                  onClick={() => toggleStatus(user.user_id)}
                                >
                                  <Icon
                                    icon="mdi:toggle-switch"
                                    className="menu-icon"
                                  />
                                  {user.active_flag === 1
                                    ? "Deactivate"
                                    : "Activate"}
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex align-items-center">
                         
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
                      <td>{user.mobile}</td>
                      <td className="text-center">
                        <span
                          className={`px-24 py-4 radius-4 fw-medium text-sm border ${user.active_flag === 1
                              ? "bg-success-focus text-success-600 border-success-main"
                              : "bg-danger-focus text-danger-600 border-danger-main"
                            }`}
                        >
                          {user.active_flag === 1 ? "Active" : "Deactivated"}
                        </span>
                      </td>

                      <td className="text-center">{user.createtime}</td>
                    </tr>
                    {/* //  ))
                  // ) : (
                  //   <h6>No Users available.</h6>
                  // ) */}
                  </tbody>
                ))
              ) : (
                <p>No Users Available</p>
              )}

            </table>
          </div>

          <Row className="align-items-center mt-8 " >

           <Col xs="6" className="d-flex gap-2">
              <Button
                variant="outline-primary"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Col>

            {/* Right Side: Page Info */}
            <Col xs="6" className="text-end">
              <span className="text-muted">Page {currentPage} of {totalPages}</span>
            </Col>
          </Row>

        </div>
      </div>

      {/* Modal Add Currency */}
      <div
        className="modal fade"
        id="exampleModalEdit"
        tabIndex={-1}
        aria-labelledby="exampleModalEditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <h1 className="modal-title fs-5" id="userDetailsLabel">
                User Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-24">
              {selectedUsers ? (
                <div className="col-lg-10 mx-auto">
                  <div
                    className="user-grid-card radius-16 overflow-hidden text-center p-4 bg-white"
                    style={{ minHeight: "320px" }}
                  >
                    {/* User Info Section */}
                    <div className="d-flex flex-column align-items-center">
                     
                      <h6 className="mb-1 text-xl">{selectedUsers.name}</h6>
                      <span className="text-secondary-light">
                        {selectedUsers.email}
                      </span>
                    </div>

                    {/* Personal Info Section */}
                    <div className="mt-4">
                      <h6 className="text-lg mb-3 text-center">
                        Personal Info
                      </h6>
                      <ul className="list-unstyled d-flex flex-column align-items-center">
                        <li className="d-flex justify-content-between w-100 mb-2">
                          <span className="text-md fw-semibold text-primary-light w-50 text-end">
                            Full Name
                          </span>
                          <span className="text-secondary-light fw-medium w-50 text-start">
                            :{selectedUsers.name}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between w-100 mb-2">
                          <span className="text-md fw-semibold text-primary-light w-50 text-end">
                            Phone Number
                          </span>
                          <span className="text-secondary-light fw-medium w-50 text-start">
                            :{selectedUsers.mobile}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between w-100 mb-2">
                          <span className="text-md fw-semibold text-primary-light w-50 text-end">
                            Status
                          </span>
                          <span className="w-50 text-start">
                            :
                            <span
                              className={`px-3 py-1 radius-4 fw-medium ${selectedUsers.active_flag === 1
                                  ? "bg-success text-white"
                                  : "bg-danger text-white"
                                }`}
                            >
                              {selectedUsers.active_flag === 1
                                ? "Active"
                                : "Deactive"}
                            </span>
                          </span>
                        </li>
                        <li className="d-flex justify-content-between w-100 mb-2">
                          <span className="text-md fw-semibold text-primary-light w-50 text-end">
                            Joining Date
                          </span>
                          <span className="text-secondary-light fw-medium w-50 text-start">
                            : 25/01/2025
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading user details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrenciesLayer;
