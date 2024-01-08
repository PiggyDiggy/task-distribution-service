import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useSelectInputStore } from "@/lib/mobx/SelectInput/provider";

import style from "./style.module.css";
import { cx } from "@/lib/utils";

export const SelectOptions = observer(() => {
  const {
    domainStore: { filteredOptions, selectOption },
    uiStore: { selectedIndex, isOpen, selectNext, selectPrev },
  } = useSelectInputStore();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowDown") {
        selectNext();
      } else if (key === "ArrowUp") {
        selectPrev();
      } else if (key === "Enter") {
        selectOption();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectNext, selectPrev, selectOption, isOpen]);

  if (filteredOptions.length === 0 || !isOpen) {
    return null;
  }

  return (
    <ul className={style.options} role="listbox" onMouseDown={(e) => e.preventDefault()}>
      {filteredOptions.map((option, i) => (
        <li
          onClick={() => selectOption(option)}
          className={cx(style.option, { [style.option_selected]: selectedIndex === i })}
          key={option}
          role="option"
          aria-selected={selectedIndex === i}
        >
          {option}
        </li>
      ))}
    </ul>
  );
});
