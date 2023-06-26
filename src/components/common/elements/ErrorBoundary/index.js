import React, { Component, Fragment } from 'react';
import { ReactComponent as ErrorImage } from '@assets/svg/warning.svg';
import styles from './index.module.scss';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Xử lý lỗi ở đây
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Ghi nhận thông tin lỗi ở đây
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            // Hiển thị thông báo lỗi
            return (
                <>
                    <div className={styles.wrapper}>
                        <ErrorImage width="200px" height="200px" className={styles.errorImage} />
                        <h1>Something went wrong with website</h1>
                        <h2>Contact with developer to handle this error</h2>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
