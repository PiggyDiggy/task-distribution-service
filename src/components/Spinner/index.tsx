import React from "react";

import style from "./style.module.css";

type Props = React.SVGProps<SVGSVGElement>;

export const Spinner: React.FC<Props> = (props) => {
  return (
    <svg
      height={48}
      width={48}
      viewBox="0 0 48 48"
      stroke="currentColor"
      fill="transparent"
      strokeWidth={4}
      strokeDasharray="35 34"
      strokeLinecap="round"
      {...props}
    >
      <circle className={style.spinner} r={22} cx={24} cy={24} />
    </svg>
  );
};
