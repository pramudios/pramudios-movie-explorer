import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import PlayIcon from '@/assets/icon_play.svg'; // Import ikon SVG

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

export const Button = <T extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={clsx(
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        className
      )}
      {...rest}
    >
      {children}
      {variant === 'primary' && (
        <PlayIcon className={styles.icon} width={24} height={24} />
      )}
    </Component>
  );
};
