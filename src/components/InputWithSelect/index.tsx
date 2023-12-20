import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { SelectInputStoreContext, useSelectInputStore } from "@/lib/mobx/SelectInput/provider";
import { cx } from "@/lib/utils";
import arrowIcon from "@/assets/arrow-down.svg";

import { SelectOptions } from "../SelectOptions";

import style from "./style.module.css";

type Props = {
  options: string[];
  editable?: boolean;
};

const Input = observer(() => {
  const {
    uiStore: { inputValue, isOpen, setInputValue, toggleIsOpen },
    domainStore: { editable },
  } = useSelectInputStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      inputRef.current?.blur();
    }
  }, [isOpen]);

  return (
    <>
      <input
        ref={inputRef}
        onClick={toggleIsOpen}
        className={cx(style.input, { [style.input_disabled]: !editable })}
        type="text"
        value={inputValue}
        onChange={editable ? (e) => setInputValue(e.target.value) : undefined}
      />
      <Image
        className={cx(style["arrow-icon"], { [style["arrow-icon_reversed"]]: isOpen })}
        src={arrowIcon}
        alt="arrow"
        height={13}
        width={22}
      />
    </>
  );
});

export const InputWithSelect: React.FC<Props> = ({ options, editable = true }) => {
  return (
    <SelectInputStoreContext options={options} editable={editable}>
      <div className={style.wrapper}>
        <Input />
        <SelectOptions />
      </div>
    </SelectInputStoreContext>
  );
};
