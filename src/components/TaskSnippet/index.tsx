import React from "react";
import Image from "next/image";
import { Task } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import expandIcon from "@/assets/expand-icon.svg";

import style from "./style.module.css";

type Props = {
  task: Task;
};

export const TaskSnippet: React.FC<Props> = ({ task }) => {
  return (
    <li className={style.snippet}>
      <p className={style.snippet_title}>{task.title}</p>
      <div className={style["snippet__bottom-row"]}>
        <span className={style.snippet__deadline}>{formatDate(task.deadline, "short")}</span>
        <span className={style.snippet__value}>{task.value}б</span>
      </div>
      <Image className={style["snippet__expand-icon"]} src={expandIcon} width={12} height={12} alt="expand" />
    </li>
  );
};
