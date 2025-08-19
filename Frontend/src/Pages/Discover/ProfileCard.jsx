import React from "react";
import styles from "./Card.module.css";  // renamed to CSS module
import { Link } from "react-router-dom";

const ProfileCard = ({ profileImageUrl, bio, name, skills, rating, username }) => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.imgContainer} src={profileImageUrl} alt="user" />
      <h3 className={styles.name}>{name}</h3>
      <h6 className={styles.ratingHeading}>Rating: {rating} ⭐</h6>
      <p className={styles.cardText}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "150px",
          marginBottom: "0.5rem",
        }}
      >
        {bio}
      </p>
      <div className={styles.profButtons}>
        {/* <button className={styles.primary}>Connect</button> */}
        <Link to={`/profile/${username}`}>
          <button className={`${styles.primary} ${styles.ghost}`}>View Profile</button>
        </Link>
      </div>
      <div className={styles.profskills}>
        <h6 className={styles.skillsHeading}>Skills</h6>
        <div className={styles.profskillBoxes}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.profskillBox}>
              <span className={styles.skill}>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;