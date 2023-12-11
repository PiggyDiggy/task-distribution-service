import React, { PropsWithChildren } from "react";

import { cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = PropsWithChildren<{
  title: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}>;

export const Section: React.FC<Props> = ({ title, children, className, titleClassName, align = "left" }) => {
  return (
    <section className={cx(style.section, className)}>
      <h2 className={cx(style.title, style[`title_${align}`], titleClassName)}>{title}</h2>
      {children}
    </section>
  );
};
