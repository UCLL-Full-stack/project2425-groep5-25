import styles from '@styles/ErrorMessage.module.css';
import { ErrorLabelMessage } from '@types';
import React from 'react';

type Props = {
    errorLabelMessage: ErrorLabelMessage;
};

const ErrorMessage: React.FC<Props> = ({ errorLabelMessage }: Props) => {
    return (
        <>
            <div className={styles['error-container']}>
                <label>{errorLabelMessage.label}</label>
                <p>{errorLabelMessage.message}</p>
            </div>
        </>
    );
};

export default ErrorMessage;
