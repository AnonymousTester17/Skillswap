import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';
import { Api, ApiWithAuth } from '../../util/ApiCall';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestCard = ({ setRequestModal, prefilledSkills, receiverId }) => {
    const [message, setMessage] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');

    useEffect(() => {
        if (prefilledSkills && prefilledSkills.length > 0) {
            setSelectedSkill(prefilledSkills[0]);
        }
    }, [prefilledSkills]);

    const handleSendRequest = async () => {
        if (!selectedSkill) {
            toast.error('Please select a skill.');
            return;
        }

        try {
            const response = await ApiWithAuth.post('/api/v1/users/send-request', {
                receiverId: receiverId,
                skill: selectedSkill,
                message: message,
            });
            if (response.data.success) {
                toast.success('Request sent successfully!');
                setRequestModal(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send request.');
            console.error('Error sending request:', error);
        }
    };

    return (
        <div className={styles.requestModalBackdrop} onClick={() => setRequestModal(false)}>
            <div className={styles.requestModalShow} onClick={(e) => e.stopPropagation()}>
                <h2>Send a Skill Swap Request</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="skill-select">Skill you want to learn:</label>
                    <select
                        id="skill-select"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className={styles.skillSelect}
                    >
                        <option value="" disabled>
                            Select a skill
                        </option>
                        {prefilledSkills.map((skill, index) => (
                            <option key={index} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="message-input">Message (optional):</label>
                    <textarea
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a short message..."
                        className={styles.messageInput}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSendRequest} className={styles.sendButton}>
                        Send Request
                    </button>
                    <button onClick={() => setRequestModal(false)} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
