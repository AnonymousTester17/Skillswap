import React from "react";
import styles from "./Profile.module.css";
import Box from "./Box";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const { user, setUser } = useUser();
  const [profileUser, setProfileUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/user/registered/getDetails/${username}`);
        console.log(data.data);
        setProfileUser(data.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
          if (error.response.data.message === "Please Login") {
            localStorage.removeItem("userInfo");
            setUser(null);
            await axios.get("/auth/logout");
            navigate("/login");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const convertDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" }).replace("/", "-");
    return formattedDate;
  };

  const connectHandler = async () => {
    console.log("Connect");
    try {
      setConnectLoading(true);
      const { data } = await axios.post(`/request/create`, {
        receiverID: profileUser._id,
      });

      console.log(data);
      toast.success(data.message);
      setProfileUser((prevState) => {
        return {
          ...prevState,
          status: "Pending",
        };
      });
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        if (error.response.data.message === "Please Login") {
          localStorage.removeItem("userInfo");
          setUser(null);
          await axios.get("/auth/logout");
          navigate("/login");
        }
      }
    } finally {
      setConnectLoading(false);
    }
  };







  return (
    <div className={styles["profile-container"]}>
      {user?.username !== username ? "" : <h2 className={styles["profile-heading"]}>My Profile</h2>}
      
      <div className={styles["container"]} style={{ minHeight: "86vh" }}>
        {loading ? (
          <div className="row d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" style={{ color: "var(--main)" }} />
          </div>
        ) : (
          <>
            <div className={styles["profile-box"]}>
              <div className={styles["left-div"]}>
                {/* Profile Photo */}
                <div className={styles["profile-photo"]}>
                  <img src={profileUser?.picture} alt="Profile" />
                </div>
                {/* Name */}
                <div className={styles["profile-content"]}>
                  <h1 className={styles["profile-name"]}>{profileUser?.name}</h1>
                  {/* Rating */}
                  <div className={styles["rating"]}>
                    {/* Rating stars */}
                    <span className={styles["rating-stars"]}>
                      {profileUser?.rating
                        ? Array.from({ length: profileUser.rating }, (_, index) => <span key={index}>⭐</span>)
                        : "⭐⭐⭐⭐⭐"}
                    </span>
                    {/* Rating out of 5 */}
                    {/* <span className={styles["rating-value"]}>{profileUser?.rating ? profileUser?.rating : "5"}</span> */}
                  </div>
                  {/* Connect and Report Buttons */}
                  {
                    // If the user is the same as the logged in user, don't show the connect and report buttons
                    user?.username !== username ? (
                      <div className={styles["buttons"]}>
                        <button
                          className={styles["connect-button"]}
                          onClick={profileUser?.status === "Connect" ? connectHandler : undefined}
                        >
                          {connectLoading ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                style={{ color: "var(--main)", marginRight: "0.5rem" }}
                              />
                            </>
                          ) : (
                            profileUser?.status
                          )}
                        </button>

                        <Link to={`/rating/${profileUser.username}`}>
                          <button className={`${styles["report-button"]} bg-success`}>Rate</button>
                        </Link>
                        <Link to={`/report/${profileUser.username}`}>
                          <button className={styles["report-button"]}>Report</button>
                        </Link>
                      </div>
                    ) : (
                      <div className={styles["edit-links"]}>
                        {/* Portfolio Links */}
                        <div className={styles["portfolio-links"]}>
                          <a
                            href={profileUser?.githubLink ? profileUser.githubLink : "#"}
                            target={profileUser?.githubLink ? "_blank" : "_self"}
                            className={styles["portfolio-link"]}
                          >
                            <img src="/assets/images/github.png" className={styles["link"]} alt="Github" />
                          </a>
                          <a
                            href={profileUser?.linkedinLink ? profileUser.linkedinLink : "#"}
                            target={profileUser?.linkedinLink ? "_blank" : "_self"}
                            className={styles["portfolio-link"]}
                          >
                            <img src="/assets/images/linkedin.png" className={styles["link"]} alt="LinkedIn" />
                          </a>
                          <a
                            href={profileUser?.portfolioLink ? profileUser.portfolioLink : "#"}
                            target={profileUser?.portfolioLink ? "_blank" : "_self"}
                            className={styles["portfolio-link"]}
                          >
                            <img src="/assets/images/link.png" className={styles["link"]} alt="Portfolio" />
                          </a>
                        </div>

                        {user.username === username && (
                          <Link style={{ textDecoration: "none" }} to="/edit_profile">
                            <button className={styles["edit-button"]}>
                              Edit Profile <FiEdit />
                            </button>
                          </Link>
                        )}
                      </div>
                    )
                  }
                </div>
              </div>

              {user?.username !== username && (
                <div className={styles["edit-links"]}>
                  {/* Portfolio Links */}
                  <div className={styles["portfolio-links"]}>
                    <a
                      href={profileUser?.githubLink ? profileUser.githubLink : "#"}
                      target={profileUser?.githubLink ? "_blank" : "_self"}
                      className={styles["portfolio-link"]}
                    >
                      <img src="/assets/images/github.png" className={styles["link"]} alt="Github" />
                    </a>
                    <a
                      href={profileUser?.linkedinLink ? profileUser.linkedinLink : "#"}
                      target={profileUser?.linkedinLink ? "_blank" : "_self"}
                      className={styles["portfolio-link"]}
                    >
                      <img src="/assets/images/linkedin.png" className={styles["link"]} alt="LinkedIn" />
                    </a>
                    <a
                      href={profileUser?.portfolioLink ? profileUser.portfolioLink : "#"}
                      target={profileUser?.portfolioLink ? "_blank" : "_self"}
                      className={styles["portfolio-link"]}
                    >
                      <img src="/assets/images/link.png" className={styles["link"]} alt="Portfolio" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Bio */}
            <div className={styles["bio-box"]}>
              <h2>Bio</h2>
              <div className={styles["bio"]}>{profileUser?.bio}</div>
            </div>

            {/* Skills */}
            <div className={styles["skills"]}>
              <h2>Skills Proficient At</h2>
              {/* Render skill boxes here */}
              <div className={styles["skill-boxes"]}>
                {profileUser?.skillsProficientAt.map((skill, index) => (
                  <div className={styles["skill-box"]} key={index}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className={styles["education"]}>
              <h2>Education</h2>

              <div className={styles["education-boxes"]}>
                {/* Render education boxes here */}
                {profileUser &&
                  profileUser?.education &&
                  profileUser?.education.map((edu, index) => (
                    <Box
                      key={index}
                      head={edu?.institution}
                      date={convertDate(edu?.startDate) + " - " + convertDate(edu?.endDate)}
                      spec={edu?.degree}
                      desc={edu?.description}
                      score={edu?.score}
                    />
                  ))}
              </div>
            </div>

            {/* Projects */}
            {profileUser?.projects && profileUser?.projects.length > 0 && (
              <div className={styles["projects"]}>
                <h2>Projects</h2>

                <div className={styles["project-boxes"]}>
                  {
                    // Render project boxes here
                    profileUser &&
                      profileUser?.projects &&
                      profileUser?.projects.map((project, index) => (
                        <Box
                          key={index}
                          head={project?.title}
                          date={convertDate(project?.startDate) + " - " + convertDate(project?.endDate)}
                          desc={project?.description}
                          skills={project?.techStack}
                        />
                      ))
                  }

                  {/* Render project boxes here */}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
