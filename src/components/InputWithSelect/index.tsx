import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { SelectInputStoreContext, useSelectInputStore } from "@/lib/mobx/SelectInput/provider";
import { cx } from "@/lib/utils";
import arrowIcon from "@/assets/arrow-down.svg";

import { SelectOptions } from "../SelectOptions";

import style from "./style.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = observer((props) => {
  const {
    uiStore: { inputValue, isOpen, setInputValue, setIsOpen },
    domainStore: { options },
  } = useSelectInputStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      inputRef.current?.blur();
    }
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;
    isOpen ? target.blur() : target.focus();
  };

  return (
    <>
      <input
        ref={inputRef}
        onMouseDown={handleMouseDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={cx(style.input, {
          [style["input_with-options"]]: options.length > 0,
        })}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />
      {options.length > 0 && (
        <Image
          className={cx(style["arrow-icon"], {
            [style["arrow-icon_reversed"]]: isOpen,
          })}
          src={arrowIcon}
          alt="arrow"
          height={13}
          width={22}
        />
      )}
    </>
  );
});

type Props = {
  options?: string[];
  className?: string;
  label?: string;
  inputProps?: InputProps;
};

export const InputWithSelect: React.FC<Props> = ({ options = [], className, label, inputProps }) => {
  return (
    <SelectInputStoreContext options={options}>
      <div className={cx(className, style.wrapper)}>
        <label>
          {label && <span className={style.input__label}>{label}</span>}
          <Input {...inputProps} />
        </label>
        <SelectOptions />
      </div>
    </SelectInputStoreContext>
  );
};
