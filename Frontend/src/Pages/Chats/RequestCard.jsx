import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const RequestCard = ({ picture, bio, name, skills, rating, username }) => {
  console.log(skills);
  return (
    <div className={styles.card-container}>
      <img className={styles.img-container} src={picture} alt="user" />
      <h3>{name}</h3>
      <h6>Rating : {rating}</h6>
      <p>{bio}</p>
      <div className={styles.prof-buttons}>
        <Link to={`/profile/${username}`}>
          <button className={`${styles.primary} ${styles.ghost}`}>View Profile</button>
        </Link>
      </div>
      <div className={styles.profskills}>
        <h6>Skills</h6>
        <div className={styles.profskill-boxes}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.profskill-box}>
              <span className={styles.skill}>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
