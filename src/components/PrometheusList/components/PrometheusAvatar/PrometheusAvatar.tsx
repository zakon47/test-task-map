import ClassName from "classnames";
import { FC } from "react";

import s from "./index.module.scss";

interface IProps {
  text: string;
  className?: string;
}
const PrometheusAvatar: FC<IProps> = ({ className, text }) => {
  return (
    <div className={ClassName(s.wrap, className)}>
      <div className={s.text}>{text}</div>
    </div>
  );
};

export { PrometheusAvatar };
