import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import styles from "./LandingPage.module.css";
import AboutUs from "../AboutUs/AboutUs";
import LoginModal from "../Login/LoginModal";
import Footer from "../../Components/Footer/Footer"; // Import Footer

const LandingPage = ({ showLogin, setShowLogin }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const containerStyle = {
    padding: "0 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    overflowX: "hidden",
  };

  const fullScreenContainer = {
    height: "70vh",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: "10px",
  };

  const titleContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    marginBottom: "10px",
    marginTop: "150px",
  };

  const contentTitleStyle = {
    textAlign: "center",
    color: "var(--main)",
    fontFamily: "Roboto",
    backgroundColor: "var(--secondary-bg)",
    width: "100%",
    fontSize: "3rem",
    padding: "10px 0",
    fontWeight: 400,
    marginTop: "200px",
  };

  const descriptionStyle = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1.2rem",
    textAlign: "center",
    color: "var(--teritary-text)",
    padding: "0 80px",
  };

  const imageStyle = {
    position: "absolute",
    left: `${320 + scrollPosition * 2}px`,
    top: "0px",
    width: "250px",
    justifyContent: "center",
  };

  const imageBelowStyle = {
    position: "absolute",
    right: `${300 + scrollPosition * 2}px`,
    width: "250px",
    justifyContent: "center",
  };

  const textContainer = {
    textAlign: "center",
    alignItems: "center",
    marginBottom: "40px",
  };

  const typing = keyframes`
    from { width: 0; }
    to { width: 100%; }
  `;

  const blink = keyframes`
    from, to { border-color: transparent; }
    50% { border-color: #3BB4A1; }
  `;

  const AnimatedTitle = styled.h1`
    font-family: "Josefin Sans", sans-serif;
    font-weight: 700;
    font-size: 5.5rem;
    color: var(--main);
    overflow: hidden;
    border-right: 0.4rem solid #3bb4a1;
    white-space: nowrap;
    letter-spacing: 0.1em;
    animation:
      ${typing} 3s steps(10, end),
      ${blink} 0.75s step-end infinite;
  `;

  return (
    <>
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <div style={containerStyle}>
        <div style={fullScreenContainer}>
          <div style={{ boxSizing: "border-box" }}>
            <img src="/assets/images/ml.png" alt="ml" width="270px" height="270px" style={{ position: "absolute", left: 0 }} />
            <img src={"/assets/images/1.png"} alt="Above Image" style={imageStyle} />
            <div style={titleContainerStyle}>
              <AnimatedTitle>SKILL SWAP</AnimatedTitle>
            </div>
            <img src={"/assets/images/2.png"} alt="Below Image" style={imageBelowStyle} />
            <img src="/assets/images/web.png" alt="web" width="250px" height="350px" style={{ position: "absolute", right: 0, bottom: "-150px" }} />
          </div>
        </div>

        <h2 id="why-skill-swap" style={contentTitleStyle}>WHY SKILL SWAP?</h2>
        <div  style={textContainer}>
          <div style={descriptionStyle}>
            <br />
            <br />
            <div className={styles.LPCard}>
              <img className={styles.LPImg} src="/assets/images/L1.jpg" alt="Learn From Experts" />
              <div className={styles.LPContent}>
                <h4 className={styles.LPHeading}>➊ Learn From Experts:</h4>
                <p className={styles.LPText}>
                  Gain insights and practical knowledge directly from experienced mentors who excel in their respective fields. Whether it's mastering a new programming language, honing your culinary skills, or delving into the world of digital marketing, our mentors are here to guide you every step of the way.
                </p>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.LPCard}>
              <img className={styles.LPImg} src="/assets/images/L2.svg" alt="Share Your Expertise" />
              <div className={styles.LPContent}>
                <h4 className={styles.LPHeading}>➋ Share Your Expertise:</h4>
                <p className={styles.LPText}>
                  Have a skill or passion you're eager to share? Skill Swap provides a platform for you to become a mentor yourself. Share your expertise with others, foster a sense of community, and contribute to the growth of aspiring learners.
                </p>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.LPCard}>
              <img className={styles.LPImg} src="/assets/images/L3.svg" alt="Collaborative Environment" />
              <div className={styles.LPContent}>
                <h4 className={styles.LPHeading}>➌ Collaborative Environment:</h4>
                <p className={styles.LPText}>
                  Our community thrives on collaboration. Connect with like-minded individuals, participate in group projects, and engage in discussions that fuel creativity and innovation. Skill Swap isn't just about individual growth—it's about collective advancement.
                </p>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.LPCard}>
              <img className={styles.LPImg} src="/assets/images/L4.jpg" alt="Diverse Learning Opportunities" />
              <div className={styles.LPContent}>
                <h4 className={styles.LPHeading}>➍ Diverse Learning Opportunities:</h4>
                <p className={styles.LPText}>
                  With Skill Swap, the possibilities are endless and <b>free of cost</b>. Explore a wide range of topics and disciplines, from traditional crafts to cutting-edge technologies. Our diverse library of skills ensures there's something for everyone, regardless of your interests or background.
                </p>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.LPCard}>
              <img className={styles.LPImg} src="/assets/images/L5.svg" alt="Continuous Growth" />
              <div className={styles.LPContent}>
                <h4 className={styles.LPHeading}>➎ Continuous Growth:</h4>
                <p className={styles.LPText}>
                  Learning is a lifelong journey, and Skill Swap is here to support you every step of the way. Whether you're a novice or a seasoned professional, our platform empowers you to continuously expand your knowledge, challenge yourself, and embrace new opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
        <AboutUs />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;