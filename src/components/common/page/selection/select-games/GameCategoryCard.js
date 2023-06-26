import styles from './GameCategoryCard.module.scss';

import { Card } from 'antd';
import React from 'react';
import classNames from 'classnames';

function GameCategoryCard({ title, imageSrc, onClick }) {
    return (
        <Card hoverable className={classNames(styles.gameCard, 'game-card')} onClick={onClick}>
            <div className={styles.cardImage}>
                <img src={imageSrc} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardTitle}>{title}</div>
            </div>
        </Card>
    );
}

export default GameCategoryCard;
