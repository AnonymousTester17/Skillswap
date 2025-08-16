import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Link } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfileDropdown = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    try {
      await axios.get("/auth/logout");
      window.location.href = "http://localhost:5173/login";
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        console.error(error.response.data.message);
      }
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      href=""
      ref={ref}
      onClick={(e) => {
        onClick(e);
      }}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: "10px",
        }}
      >
        <img
          src={user?.picture}
          alt="User Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {children}
      &#x25bc;
    </div>
  ));

  const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item
          onClick={() => {
            console.log(user.username);
            navigate(`/profile/${user.username}`);
          }}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Header = () => {
  const [navUser, setNavUser] = useState(null);
  const { user } = useUser();
  const [discover, setDiscover] = useState(false);

  useEffect(() => {
    setNavUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [user]);

  useEffect(() => {
    const handleUrlChange = () => {
      console.log("URL has changed:", window.location.href);
    };
    window.addEventListener("popstate", handleUrlChange);

    const temp = window.location.href.split("/");
    const url = temp.pop();
    if (url.startsWith("discover")) {
      setDiscover(true);
    } else {
      setDiscover(false);
    }
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [window.location.href]);

  return (
    <>
      <Navbar key="md" expand="md" style={{ boxShadow: "0 4px 8px var(--secondary-bg)", zIndex: 998, padding: "20px 25px"}}>
        <Container fluid>
          <Navbar.Brand
            href="/"
            style={{ fontFamily: "Archivo Black, sans-serif", color: "var(--main)", fontWeight: 400 }}
          >
            SKILL SWAP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-md`}
                style={{ fontFamily: "Josefin Sans, sans-serif", color: "#028477" }}
              >
                SKILL SWAP
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* START: Updated Section */}
              <Nav className={`${styles.navContainer} justify-content-end flex-grow-1 pe-3 align-items-center`}>
                {/* GROUP 1: Main links with underline effect */}
                <div className={`${styles.navLinks} d-flex`}>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>

                  {navUser !== null ? (
                    <>
                      <Nav.Link as={Link} to="/discover">
                        Discover
                      </Nav.Link>
                      <Nav.Link as={Link} to="/chats">
                        Your Chats
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to="/#why-skill-swap">
                        Why SkillSwap
                      </Nav.Link>
                      <Nav.Link as={Link} to="/about_us">
                        About Us
                      </Nav.Link>
                    </>
                  )}
                </div>

                {/* GROUP 2: User actions */}
                {navUser !== null ? (
                  <Nav.Link as={Dropdown} className="p-0">
                    <UserProfileDropdown />
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={styles.loginRegisterLink}
                    style={{
                      backgroundColor: "var(--main)",
                      borderRadius: "50px",
                      padding: "10px 20px",
                      fontWeight: "bold",
                      color: "var(--primary-bg)",
                    }}
                  >
                    Login/Register
                  </Nav.Link>
                )}

                {/* Mobile Offcanvas */}
                {discover && navUser !== null && (
                  <>
                    <Nav.Link
                      href="#for-you"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "#f56664",
                        fontSize: "1.2rem",
                        marginTop: "2rem",
                      }}
                      className="d-md-none"
                    >
                      For You
                    </Nav.Link>

                    <Nav.Link
                      href="#popular"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#3bb4a1", fontSize: "1.2rem" }}
                      className="d-md-none"
                    >
                      Popular
                    </Nav.Link>

                    <Nav.Link
                      href="#web-development"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#013e38", marginLeft: "1.5rem" }}
                      className="d-md-none"
                    >
                      Web Development
                    </Nav.Link>

                    <Nav.Link
                      href="#machine-learning"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#013e38", marginLeft: "1.5rem" }}
                      className="d-md-none"
                    >
                      Machine Learning
                    </Nav.Link>

                    <Nav.Link
                      href="#others"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#013e38", marginLeft: "1.5rem" }}
                      className="d-md-none"
                    >
                      Others
                    </Nav.Link>
                  </>
                )}
              </Nav>
              {/* END: Updated Section */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;