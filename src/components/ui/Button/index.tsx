import React from "react";

import { cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={cx(style.button, props.className)}>
      {children}
    </button>
  );
};
