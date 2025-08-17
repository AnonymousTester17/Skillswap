import React from "react";
import styles from "./AboutUs.module.css";

const contentContainerStyle = {
  maxWidth: "50vw",
};

const titleStyle = {
  fontFamily: "Roboto",
  color: "var(--main)",
  fontSize: "3rem",
  fontWeight: 400,
  marginBottom: "20px",
  textAlign: "center",
};

const descriptionStyle = {
  fontFamily: "Montserrat, sans-serif",
  color: "var(--teritary-text)",
  fontSize: "1rem",
  lineHeight: "1.6",
};

const imageContainerStyle = {
  width: "45%",
  height: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
  borderRadius: "20px",
};

const AboutUs = () => {
  return (
    <section
      style={{
        backgroundColor: "var(--secondary-bg)",
        width: "100%",
        padding: "50px",
        borderRadius: "20px",
        marginBottom: "100px",
      }}
    >
      <h2 id="about-us" style={titleStyle}>About Us</h2>
      <div className={styles.content1Container}>
        <div style={contentContainerStyle}>
          <p style={descriptionStyle}>
            &#8680; As students, we often spend heavily on certifications to upskill. SkillSwap solves this by enabling
            learning, knowledge-sharing, and networking with talented peers.
          </p>
          <p style={descriptionStyle}>
            <br />
            &#8680; At SkillSwap, we believe in the power of learning and sharing knowledge. Our platform connects people from
            diverse backgrounds to exchange practical skills. Whether you’re mentoring or learning, SkillSwap offers a
            supportive space for growth and collaboration.
            <br />
            <br />
            &#8680; Our mission is to empower individuals to unlock their potential through skill sharing. We foster lifelong
            learning and meaningful connections, building a community where everyone can thrive.
          </p>
        </div>
        <img src={"/assets/images/about.svg"} style={imageContainerStyle} />
      </div>
    </section>
  );
};

export default AboutUs;
