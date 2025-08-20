import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";
import Spinner from "react-bootstrap/Spinner";
import { FaUser, FaFire, FaCode, FaBrain, FaEllipsisH } from "react-icons/fa";
import styles from "./Discover.module.css";

const Discover = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const [webDevUsers, setWebDevUsers] = useState([]);
  const [mlUsers, setMlUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("for-you");

  useEffect(() => {
    const getDiscoverUsers = async () => {
      if (user) {
        try {
          const { data } = await axios.get("/user/discover");
          setDiscoverUsers(data.data.forYou);
          setWebDevUsers(data.data.webDev);
          setMlUsers(data.data.ml);
          setOtherUsers(data.data.others);
        } catch (error) {
          console.log(error);
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          }
          localStorage.removeItem("userInfo");
          setUser(null);
          await axios.get("/auth/logout");
          navigate("/");
        } finally {
          setLoading(false);
        }
      }
    };
    getDiscoverUsers();
  }, [user, navigate, setUser]);

  const renderProfiles = (users) => {
    if (users && users.length > 0) {
      return users.map((user) => (
        <ProfileCard
          key={user._id}
          profileImageUrl={user?.picture}
          name={user?.name}
          rating={user?.rating ? user?.rating : 5}
          bio={user?.bio}
          skills={user?.skillsProficientAt}
          username={user?.username}
        />
      ));
    }
    return <h1 className={styles.noUsersMessage}>No users to show</h1>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 80px)" }}>
        <Spinner animation="border" style={{ color: "var(--main)" }} />
      </div>
    );
  }

  return (
    <div className={styles.discoverPage}>
      <div className={styles.contentContainer}>
        <div className={styles.navBar}>
          <ul defaultActiveKey="/home" className="flex-column" style={{ listStyleType: "none", paddingLeft: "0px" }}>
            <li
              onClick={() => setActiveFilter("for-you")}
              className={`${styles.navLink} ${activeFilter === "for-you" ? styles.activeLink : ""}`}
            >
              <FaUser className={styles.navIcon} /> For You
            </li>
            <li
              onClick={() => setActiveFilter("popular")}
              className={`${styles.navLink} ${activeFilter === "popular" ? styles.activeLink : ""}`}
            >
              <FaFire className={styles.navIcon} /> Popular
            </li>
            <li
              onClick={() => setActiveFilter("web-development")}
              className={`${styles.navLink} ${activeFilter === "web-development" ? styles.activeLink : ""}`}
            >
              <FaCode className={styles.navIcon} /> Web Development
            </li>
            <li
              onClick={() => setActiveFilter("machine-learning")}
              className={`${styles.navLink} ${activeFilter === "machine-learning" ? styles.activeLink : ""}`}
            >
              <FaBrain className={styles.navIcon} /> Machine Learning
            </li>
            <li
              onClick={() => setActiveFilter("others")}
              className={`${styles.navLink} ${activeFilter === "others" ? styles.activeLink : ""}`}
            >
              <FaEllipsisH className={styles.navIcon} /> Others
            </li>
          </ul>
        </div>

        <div className={styles.headingContainer}>
          {activeFilter === "for-you" && (
            <section id="for-you">
              <h2 className={styles.discoverHeading}>For You</h2>
              <div className={styles.profileCards}>{renderProfiles(discoverUsers)}</div>
            </section>
          )}
          {activeFilter === "popular" && (
            <section id="popular">
              <h2 className={styles.discoverHeading}>Popular</h2>
              <div className={styles.profileCards}>{renderProfiles(webDevUsers)}</div>
            </section>
          )}
          {activeFilter === "web-development" && (
            <section id="web-development">
              <h2 className={styles.discoverHeading}>Web Development</h2>
              <div className={styles.profileCards}>{renderProfiles(webDevUsers)}</div>
            </section>
          )}
          {activeFilter === "machine-learning" && (
            <section id="machine-learning">
              <h2 className={styles.discoverHeading}>Machine Learning</h2>
              <div className={styles.profileCards}>{renderProfiles(mlUsers)}</div>
            </section>
          )}
          {activeFilter === "others" && (
            <section id="others">
              <h2 className={styles.discoverHeading}>Others</h2>
              <div className={styles.profileCards}>{renderProfiles(otherUsers)}</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;