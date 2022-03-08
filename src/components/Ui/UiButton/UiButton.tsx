import ClassName from "classnames";
import React, { ButtonHTMLAttributes, FC, useState } from "react";

import ARROW from "../../../assets/svg/arrow.svg";
import s from "./index.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  subMenu?: any;
  color?: "primary" | "default";
  onClick: () => void;
}
const UiButton: FC<IProps> = ({
  className,
  children,
  color = "default",
  subMenu,
  onClick,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div
      className={ClassName(
        s.wrap,
        s[color],
        { [s.subMenuWrap]: !!subMenu },
        className
      )}
    >
      <button className={s.btn} onClick={onClick} {...rest}>
        {children}
      </button>
      {subMenu && (
        <div
          className={ClassName(s.subMenu, { [s.subMenuActive]: isOpen })}
          onClick={toggleOpen}
        >
          <img src={ARROW} alt="" />
          {isOpen && <div className={s.subContent}>{subMenu}</div>}
        </div>
      )}
    </div>
  );
};

export { UiButton };
