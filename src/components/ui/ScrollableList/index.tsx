import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import style from "./style.module.css";
import { cx } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  direction?: "vertical" | "horizontal";
  maskFadeWidth?: number;
  className?: string;
}

export const ScrollableList: React.FC<React.PropsWithChildren<Props>> = ({
  direction = "vertical",
  className,
  children,
  maskFadeWidth,
  ...props
}) => {
  const [isScrollable, setisScrollable] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollableRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;

    const getScrollValue = () => {
      return direction === "horizontal" ? scrollable.scrollLeft : scrollable.scrollTop;
    };

    const getMaxScrollDistance = () => {
      return direction === "horizontal"
        ? scrollable.scrollWidth - scrollable.offsetWidth
        : scrollable.scrollHeight - scrollable.offsetHeight;
    };

    const scrollHandler = () => {
      const scrollValue = getScrollValue();
      const maxScrollDistance = getMaxScrollDistance();
      setIsScrolled(scrollValue !== 0);
      setisScrollable(maxScrollDistance > 0 && scrollValue < maxScrollDistance);
    };

    scrollHandler();
    scrollable.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      scrollable.removeEventListener("scroll", scrollHandler);
    };
  }, [direction]);

  useLayoutEffect(() => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;

    const fadeWidth = Math.min(
      Math.floor((direction === "vertical" ? scrollable.offsetHeight : scrollable.offsetWidth) * 0.09),
      50
    );

    scrollable.setAttribute("style", `--fade-width: ${maskFadeWidth ?? fadeWidth}px`);
  }, [direction, maskFadeWidth]);

  return (
    <ul
      {...props}
      ref={scrollableRef}
      className={cx(className, style.list, style[`list_${direction}`], {
        [style.list_scrollable]: isScrollable,
        [style.list_scrolled]: isScrolled,
      })}
    >
      {children}
    </ul>
  );
};
