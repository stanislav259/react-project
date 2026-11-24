import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classes from './MyButton.module.css'

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
}

const MyButton = ({ children, className, ...props }: MyButtonProps) => {
  return (
    <button 
      {...props} 
      className={className? `${classes.myBtn} ${className}` : classes.myBtn}
    >
      {children}
    </button>
  );
};

export default MyButton;