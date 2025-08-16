import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import ProfileCard from "./ProfileCard";
import Spinner from "react-bootstrap/Spinner";
import { FaUser, FaFire, FaCode, FaBrain, FaEllipsisH } from "react-icons/fa";
import styles from "./Discover.module.css";

const Discover = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const [webDevUsers, setWebDevUsers] = useState([]);
  const [mlUsers, setMlUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("for-you");

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user/registered/getDetails`);
        setUser(data.data);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        }
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/auth/logout");
        navigate("/login");
      }
    };
    const getDiscoverUsers = async () => {
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
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
    getDiscoverUsers();
  }, [navigate, setUser]);

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
  
  return (
    <div className={styles.discoverPage}>
      <div className={styles.contentContainer}>
        <div className={styles.navBar}>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link onClick={() => setActiveFilter("for-you")} className={styles.navLink}>
              <FaUser className={styles.navIcon} /> For You
            </Nav.Link>
            <Nav.Link onClick={() => setActiveFilter("popular")} className={styles.navLink}>
              <FaFire className={styles.navIcon} /> Popular
            </Nav.Link>
            <Nav.Link onClick={() => setActiveFilter("web-development")} className={styles.navLink}>
              <FaCode className={styles.navIcon} /> Web Development
            </Nav.Link>
            <Nav.Link onClick={() => setActiveFilter("machine-learning")} className={styles.navLink}>
              <FaBrain className={styles.navIcon} /> Machine Learning
            </Nav.Link>
            <Nav.Link onClick={() => setActiveFilter("others")} className={styles.navLink}>
              <FaEllipsisH className={styles.navIcon} /> Others
            </Nav.Link>
          </Nav>
        </div>
        <div className={styles.headingContainer}>
          {loading ? (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
