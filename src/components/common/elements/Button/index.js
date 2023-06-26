import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
const ButtonComponent = ({
    className,
    onSubmit,
    onClick,
    loading = false,
    disabled,
    children,
    style,
    hidden,
    to,
    backgroundColor,
    ...props
}) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (to) navigate(to);
    };
    return (
        <Button
            className={classNames(styles.submitBtn, className, 'button-theme')}
            onSubmit={onSubmit}
            disabled={disabled}
            style={{ backgroundColor: backgroundColor, ...style }}
            onClick={handleClick}
            hidden={hidden}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonComponent;
