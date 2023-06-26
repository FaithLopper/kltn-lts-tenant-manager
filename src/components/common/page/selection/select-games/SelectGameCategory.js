import mutipleChoiseImage from '@assets/images/game-multiple-choice.png';
import mistakeImage from '@assets/images/game-mistake.png';
import puzzleImage from '@assets/images/game-puzzle.png';
import phishImage from '@assets/images/game-phish.png';
import hangmanImage from '@assets/images/game-hangman.png';
import spacemanImage from '@assets/images/game-spaceman.svg';

import React from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import ListPage from '@components/common/layout/ListPage';
import GameCategoryCard from './GameCategoryCard';
import { gameCategories } from '@constants/masterData';

function SelectGameCategory({ title, mcqPath, crosswordPath, spacemanPath, hangmanPath, mistakePath }) {
    const navigate = useNavigate();

    return (
        <ListPage title={title} className={styles.gamesListPage}>
            <div className={styles.categories}>
                <GameCategoryCard
                    onClick={() => navigate(mcqPath || gameCategories['multiple-choice'].path)}
                    title="Multiple Choice Questions"
                    imageSrc={mutipleChoiseImage}
                />
                <GameCategoryCard
                    onClick={() => navigate(crosswordPath || gameCategories['cross-word'].path)}
                    title="CrossWord Puzzle"
                    imageSrc={puzzleImage}
                />
                <GameCategoryCard
                    onClick={() => navigate(spacemanPath || gameCategories.spaceman.path)}
                    title="SpaceMan"
                    imageSrc={spacemanImage}
                />
                <GameCategoryCard
                    onClick={() => navigate(hangmanPath || gameCategories.hangman.path)}
                    title="Hang Man"
                    imageSrc={hangmanImage}
                />
                <GameCategoryCard
                    onClick={() => navigate(mistakePath || gameCategories['spot-the-mistake'].path)}
                    title="Spot the Mistake"
                    imageSrc={mistakeImage}
                />
                {/* <GameCategoryCard
                    onClick={() => navigate(gameCategories['phish-identify'].path)}
                    title="Phish Identify"
                    imageSrc={phishImage}
                /> */}
            </div>
        </ListPage>
    );
}

export default SelectGameCategory;
