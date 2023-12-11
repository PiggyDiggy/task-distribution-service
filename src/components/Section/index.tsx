import React, { PropsWithChildren } from "react";

import { cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = PropsWithChildren<{ title: string; align?: "left" | "center" | "right" }>;

export const Section: React.FC<Props> = ({ title, children, align = "left" }) => {
  return (
    <section className={style.section}>
      <h2 className={cx(style.title, style[`title_${align}`])}>{title}</h2>
      {children}
    </section>
  );
};
