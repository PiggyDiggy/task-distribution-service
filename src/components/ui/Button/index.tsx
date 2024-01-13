import React from "react";

import { cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: "default" | "inverted";
};

export const Button: React.FC<Props> = ({ children, styleType = "default", ...props }) => {
  return (
    <button
      {...props}
      className={cx(style.button, props.className, { [style.button_inverted]: styleType === "inverted" })}
    >
      {children}
    </button>
  );
};
