import styles from './CategoryCard.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({ icon, title, description, linkTo, hidden, ...props }) {
    return (
        <>
            {!hidden && (
                <Link to={linkTo} className={styles.card} {...props}>
                    <img className={styles.icon} src={icon} alt={title} />
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{description}</div>
                </Link>
            )}
        </>
    );
}

export default CategoryCard;
