// components/modal/Toast.tsx
import React from 'react';
import styles from './Toast.module.scss';
import CheckIcon from '@/assets/success_icon.svg'; // Gambar centang sesuai gambar kamu

type ToastProps = {
  message: string;
  show: boolean;
};

export const Toast: React.FC<ToastProps> = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className={styles.toast}>
      <CheckIcon className={styles.icon} />
      <span className={styles.message}>{message}</span>
    </div>
  );
};
