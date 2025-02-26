import React from 'react';
import styles from './Bangs.module.css';

const Contact: React.FC = () => {
    const handleClick = () => {
        console.log("clicked!")
    };

    return (
        <div className={styles.navChange} onClick={handleClick}>
            💥
        </div>
    );
};

export default Contact;