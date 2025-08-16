import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    backgroundColor: "var(--primary-bg)",
    width: "100%",
    fontSize: "3rem",
    fontWeight: 400,
    marginTop: "200px",
  };

  const descriptionStyle = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1.2rem",
    textAlign: "center",
    color: "var(--primary-text)",
    maxWidth: "1000px",
    margin: "60px",
  };

  const imageStyle = {
    position: "absolute",
    left: `${320 + scrollPosition * 2}px`, // Increased scroll effect
    top: "0px",
    width: "250px",
    justifyContent: "center",
  };

  const imageBelowStyle = {
    position: "absolute",
    right: `${300 + scrollPosition * 2}px`, // Increased scroll effect
    width: "250px",
    justifyContent: "center",
  };

  const textContainer = {
    textAlign: "center",
    alignItems: "center",
    marginBottom: "40px",
  };

  // Keyframe animations for the title
  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const colorChange = keyframes`
    0% { color: var(--main); }
    50% { color: #3BB4A1; }
    100% { color: var(--main); }
  `;
  // Keyframe animations for the typing effect
  const typing = keyframes`
    from { width: 0; }
    to { width: 100%; }
  `;

  const blink = keyframes`
    from, to { border-color: transparent; }
    50% { border-color: #3BB4A1; }
  `;

  // const AnimatedTitle = styled.h1`
  //   font-family: "Josefin Sans", sans-serif;
  //   font-weight: 700;
  //   font-size: 5.5rem;
  //   text-align: center;
  //   animation: ${fadeIn} 1.5s ease-out, ${colorChange} 4s infinite;
  // `;
  const AnimatedTitle = styled.h1`
    font-family: "Josefin Sans", sans-serif;
    font-weight: 700;
    font-size: 5.5rem;
    color: var(--main);

    /* Typing animation styles */
    overflow: hidden;
    border-right: 0.4rem solid #3bb4a1;
    white-space: nowrap;
    letter-spacing: 0.1em;
    animation:
      ${typing} 3s steps(10, end),
      ${blink} 0.75s step-end infinite;
  `;

  return (
    <div style={containerStyle}>
      <div style={fullScreenContainer}>
        <div style={{ boxSizing: "border-box" }}>
          <img
            src="/assets/images/ml.png"
            alt="ml"
            width="270px"
            height="270px"
            style={{ position: "absolute", left: 0 }}
          />
          <img src={"/assets/images/1.png"} alt="Above Image" style={imageStyle} />

          <div style={titleContainerStyle}>
            <AnimatedTitle>SKILL SWAP</AnimatedTitle>
          </div>

          <img src={"/assets/images/2.png"} alt="Below Image" style={imageBelowStyle} />
          <img
            src="/assets/images/web.png"
            alt="web"
            width="250px"
            height="350px"
            style={{ position: "absolute", right: 0, bottom: "-150px" }}
          />
        </div>
      </div>

      <h2 style={contentTitleStyle}>WHY SKILL SWAP?</h2>
      <div id="why-skill-swap" style={textContainer}>
        <div style={descriptionStyle}>
          At Skill Swap, we believe in the power of mutual learning and collaboration. Here's why Skill Swap is the
          ultimate platform for skill acquisition and knowledge exchange:
          <br />
          <br />
          <br />
          <div style={{display: "flex", gap: "20px", borderRadius: "20px", backgroundColor: "var(--secondary-bg)"}}>
            <img src="/assets/images/L1.jpg" alt="Learn From Experts" width="300px" height="300px" />
            <div style={{padding: "35px 30px", textAlign: "left"}}>
              <h4 style={{ color: "var(--main)", fontFamily: "Roboto"}}>➊ Learn From Experts:</h4>
              <p
              style={{
                 paddingLeft: "25px",
                 fontFamily: "Roboto",
                 fontSize: "1rem"}}>
                Gain insights and practical knowledge directly from experienced mentors who excel in their respective
                fields. Whether it's mastering a new programming language, honing your culinary skills, or delving into
                the world of digital marketing, our mentors are here to guide you every step of the way.
              </p>
            </div>
          </div>
          <br />
          <br />
          <h4 style={{ color: "#028477" }}>➋ Share Your Expertise:</h4> Have a skill or passion you're eager to share?
          Skill Swap provides a platform for you to become a mentor yourself. Share your expertise with others, foster a
          sense of community, and contribute to the growth of aspiring learners.
          <br />
          <br />
          <h4 style={{ color: "#028477" }}>➌ Collaborative Environment:</h4> Our community thrives on collaboration.
          Connect with like-minded individuals, participate in group projects, and engage in discussions that fuel
          creativity and innovation. Skill Swap isn't just about individual growth—it's about collective advancement.
          <br />
          <br />
          <h4 style={{ color: "#028477" }}>➍ Diverse Learning Opportunities:</h4> With Skill Swap, the possibilities are
          endless and <b>free of cost</b>
          . Explore a wide range of topics and disciplines, from traditional crafts to cutting-edge technologies. Our
          diverse library of skills ensures there's something for everyone, regardless of your interests or background.
          <br />
          <br />
          <h4 style={{ color: "#028477" }}>➎ Continuous Growth:</h4> Learning is a lifelong journey, and Skill Swap is
          here to support you every step of the way. Whether you're a novice or a seasoned professional, our platform
          empowers you to continuously expand your knowledge, challenge yourself, and embrace new opportunities.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
