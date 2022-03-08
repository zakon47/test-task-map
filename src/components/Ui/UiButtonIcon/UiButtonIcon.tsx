import ClassName from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

import s from "./index.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt?: string;
  active?: boolean;
  className?: string;
}
const UiButtonIcon: FC<IProps> = ({ className, src, alt, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={ClassName(s.wrap, className, { [s.active]: active })}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

export { UiButtonIcon };
