import ClassName from "classnames";
import { CSSProperties, FC } from "react";

import s from "./index.module.scss";

interface IProps {
  className?: string;
  style?: CSSProperties;
}
const UiContainer: FC<IProps> = ({ className, style, children }) => {
  return (
    <div className={ClassName(s.wrap, className)} style={style}>
      {children}
    </div>
  );
};

export { UiContainer };
