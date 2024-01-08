import React, { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = {
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
};

export const Textarea: React.FC<Props> = ({ className, placeholder = "", name, required }) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = ref.current as HTMLTextAreaElement;

    const borderWidth = parseInt(getComputedStyle(textarea).borderWidth, 10);
    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight + borderWidth * 2}px`;
  }, [value]);

  return (
    <div className={style.wrapper}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cx(style.textarea, className)}
        ref={ref}
        name={name}
        required={required}
      ></textarea>
      <span className={cx(style.placeholder, { [style.placeholder_hidden]: value })}>{placeholder}</span>
    </div>
  );
};
