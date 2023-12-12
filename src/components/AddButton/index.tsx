import React, { useRef } from "react";

import style from "./style.module.css";

type Props = {
  onClick: () => void;
};

function dasharrayToDashoffset(dasharray: string) {
  const array = dasharray.split(" ").map((num) => parseInt(num, 10));
  const sum = array.reduce((sum, num) => sum + num, 0);
  return array.length % 2 === 0 ? sum : sum * 2;
}

function getNextStrokeDashoffset({ strokeDashoffset, strokeDasharray }: CSSStyleDeclaration) {
  return `${parseInt(strokeDashoffset, 10) + dasharrayToDashoffset(strokeDasharray)}px`;
}

export const AddButton: React.FC<Props> = ({ onClick }) => {
  const strokeRectRef = useRef<SVGRectElement>(null);
  const animation = useRef<Animation | null>(null);

  function onMouseOver() {
    const rectElement = strokeRectRef.current as SVGRectElement;

    const computed = getComputedStyle(rectElement);
    rectElement.style.strokeDashoffset = getNextStrokeDashoffset(computed);
    animation.current = rectElement.animate(
      {
        strokeDashoffset: [computed.strokeDashoffset, getNextStrokeDashoffset(computed)],
      },
      { duration: 300, delay: 400, iterations: Infinity }
    );
  }

  function onMouseLeave() {
    const rectElement = strokeRectRef.current as SVGRectElement;

    const computed = getComputedStyle(rectElement);
    rectElement.style.strokeDashoffset = computed.strokeDashoffset;
    animation.current?.cancel();
    rectElement.style.strokeDashoffset = getNextStrokeDashoffset(computed);
  }

  return (
    <button className={style.button} onClick={() => onClick()} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <svg viewBox="0 0 169 169" height={169} stroke="white" fill="none" className={style.button__svg}>
        <rect
          className={style.button__rect}
          width={165}
          height={165}
          strokeWidth={4}
          strokeDasharray="11"
          rx={26}
          x={2}
          y={2}
          ref={strokeRectRef}
        />
      </svg>
      <svg className={style.button__plus} viewBox="0 0 100 100" height={40} strokeWidth={10} stroke="white">
        <line x1={50} x2={50} y1={0} y2={100} />
        <line x1={0} x2={100} y1={50} y2={50} />
      </svg>
    </button>
  );
};
