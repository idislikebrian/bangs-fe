import React from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    const handleClick = () => {
        const email = 'B@barrybangs.com';
        const subject = encodeURIComponent('Sup Bangs');
        const body = encodeURIComponent('Can we collaborate on a commercial soon?');
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className={styles.contact} onClick={handleClick}>
            Contact
        </div>
    );
};

export default Contact;