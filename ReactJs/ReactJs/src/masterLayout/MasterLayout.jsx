import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";

const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route
  const [sideBar, setSideBar] = useState(true)

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`;
            }
          }
        });
      });
    };

    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, []);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  <button onClick={() => setSideBar(!sideBar)}>
    Toggle Sidebar
  </button>

  return (
    <section
      className={mobileMenu ? "overlay active" : "overlay "}
      style={{ backgroundColor: "rgb(231, 232, 234)", boxShadow: "5px 0 15px rgba(0, 0, 0, 0.1)" }}
    >
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type="button"
          className="sidebar-close-btn"
        >
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link
            to="/"
            className="sidebar-logo"
            style={{ backgroundColor: " #293241" }}
          >
            <div class="flex justify-space-between align-items-center">
            <img
              src="assets/images/asset/bar-graph_7308707.png"
              alt="site logo"
              className="light-logo"
              style={{height: "40px", width: "45px", marginLeft: "5%"}}
            />
            </div>
        
          </Link>

          
        </div>
        <div className="sidebar-menu-area border" style={{ backgroundColor: "rgb(206, 219, 225)"}}>
          <ul className="sidebar-menu " id="">
            <li className="">
              <NavLink
                to="/index-2"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                  backgroundColor: isActive ? "#98c1d9" : "transparent", // Keep background when active
                  color: "#000",
                  textDecoration: "none",
                  marginBottom: "3%",
                })}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.getAttribute("aria-current")) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="menu-icon"
                />
                <span>Dashboard</span>
              </NavLink>

              <li className="dropdown">
                <NavLink
                  to="/users-list"
                  style={({ isActive }) => {
                    // Check if the current location matches any of the submenu items
                    const isSubmenuActive =
                      window.location.pathname.includes("/users-list") ||
                      window.location.pathname.includes("/deleted-users") ||
                      window.location.pathname.includes("/add-user");

                    return {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px",
                      borderRadius: "6px",
                      transition: "background-color 0.3s ease",
                      backgroundColor:
                        isActive || isSubmenuActive ? "#98c1d9" : "transparent",
                      color: "#000",
                      textDecoration: "none",
                      marginBottom: "3%",
                    };
                  }}
                >
                  <Icon
                    icon="flowbite:users-group-outline"
                    className="menu-icon"
                  />
                  <span>Manage Users</span>
                </NavLink>

                {/* Submenu */}
                <ul className="sidebar-submenu">
                  <li>
                    <NavLink
                      to="/users-list"
                      style={({ isActive }) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px",
                        borderRadius: "6px",
                        transition: "background-color 0.3s ease",
                        backgroundColor: isActive
                          ? "#98c1d9"
                          : "transparent",
                        color: "#000",
                        textDecoration: "none",
                        marginBottom: "3%",
                      })}
                    >
                      <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                      Users List
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/add-user"
                      style={({ isActive }) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px",
                        borderRadius: "6px",
                        transition: "background-color 0.3s ease",
                        backgroundColor: isActive
                          ? "#98c1d9"
                          : "transparent",
                        color: "#000",
                        textDecoration: "none",
                        marginBottom: "3%",
                      })}
                    >
                      <i className="ri-circle-fill circle-icon text-success w-auto" />
                      Add User
                    </NavLink>
                  </li>
                </ul>
              </li>

              <NavLink
                to="/terms-condition"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                  color: "#000",
                  backgroundColor: isActive ? "#98c1d9" : "transparent", // Keep background color when active
                  textDecoration: "none",
                  marginBottom: "3%",
                })}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.classList.contains("active")) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Icon icon="octicon:info-24" className="menu-icon" />
                <span>Manage Content</span>
              </NavLink>

              <NavLink
                to="/manage-broadcast"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                  backgroundColor: isActive ? "#98c1d9" : "transparent", // Keep background when active
                  color: "#000",
                  textDecoration: "none",
                  marginBottom: "3%",
                })}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.getAttribute("aria-current")) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Icon
                  icon="icon-park-outline:announcement"
                  className="menu-icon"
                />
                <span>Manage Broadcast</span>
              </NavLink>

              <NavLink
                to="/table-report"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                  backgroundColor: isActive ? "#98c1d9" : "transparent",
                  color: "#000",
                  textDecoration: "none",
                  marginBottom: "3%",
                })}
              >
                <Icon icon="mdi:table" className="menu-icon" />
                <span>Tabular Report</span>
              </NavLink>

              <NavLink
                to="/analysis-report"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                  backgroundColor: isActive ? "#98c1d9" : "transparent",
                  color: "#000",
                  textDecoration: "none",
                  marginBottom: "3%",
                })}
              >
                <Icon icon="mdi:chart-bar" className="menu-icon" />
                <span>Analytical Report</span>
              </NavLink>

              <NavLink
                to='/faq'
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                  backgroundColor: isActive ? "#98c1d9" : "transparent",
                  color: "#000",
                  textDecoration: "none",
                  marginBottom: "3%",
                })}
              >
                <Icon

                  icon='mage:message-question-mark-round'
                  className='menu-icon'
                />
                <span> Manage FAQs</span>
              </NavLink>
               </li>
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className="navbar-header" style={{ backgroundColor: "#293241" }}>
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-2 ">
                <button
                  type="button"
                  className="sidebar-toggle"
                  style={{
                    paddingLeft: "-20px !important" 
                  }}
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon="iconoir:arrow-right"
                      className="icon text-2xl non-active"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:bars-3-solid"
                      className="icon text-2xl non-active "
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type="button"
                  className="sidebar-mobile-toggle"
                >
                  <Icon icon="heroicons:bars-3-solid" className="icon" />
                </button>
               
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="dropdown">
                  <button
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                 
                  >
                    <img
                      src="assets/images/user-grid/88756468.jpeg"
                      alt="image_user"
                      className="w-40-px h-40-px object-fit-cover rounded-circle"
                    />
                  </button>
                  <div
                    className="dropdown-menu to-top dropdown-menu-sm "
                    style={{ backgroundColor: "rgb(206, 219, 225)",
                      zIndex: "1000"
                     }}
                  >
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-black fw-semibold mb-2">
                         Admin
                        </h6>
                        <span className="text-secondary-light fw-medium text-black text-sm">
                          Admin
                        </span>
                      </div>
                      <button type="button" className="hover-text-danger">
                        <Icon
                          icon="radix-icons:cross-1"
                          className="icon text-xl"
                        />
                      </button>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-white d-flex align-items-center gap-3"
                          to="/view-profile"
                        >
                          <Icon
                            icon="solar:user-linear"
                            className="icon text-xl"
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                    
                     
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                          to="/"
                        >
                          <Icon icon="lucide:power" className="icon text-xl" />{" "}
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div
          className="dashboard-main-body"
          style={{ backgroundColor: "rgb(231, 232, 234)" }}
        >
          {children}
        </div>

        {/* Footer section */}
        <footer
          className="d-footer"
          style={{ backgroundColor: "rgb(231, 232, 234)" }}
        >
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">Young Decade. All Rights Reserved.</p>
            </div>
            <div className="col-auto">
              <p className="mb-0">
                Made by <span className="text-primary-600">Young Decade</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
