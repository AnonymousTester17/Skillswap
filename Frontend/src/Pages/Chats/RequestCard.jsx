import React from 'react';
import styles from './Card.module.css'; // Assuming this is the correct path to your CSS module

const RequestCard = ({ name, skills, picture, username, rating }) => {
    return (
        <div className={styles.card}>
            <img src={picture} alt={`${name}'s profile`} className={styles.profileImage} />
            <h3 className={styles.userName}>{name}</h3>
            <div className={styles.skillsContainer}>
                <h4 className={styles.skillsTitle}>Skills:</h4>
                <ul className={styles.skillsList}>
                    {skills && skills.map((skill, index) => (
                        <li key={index} className={styles.skillItem}>
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
            <p>Rating: {rating || 5} ⭐</p>
        </div>
    );
};

export default RequestCard;