import ClassName from "classnames";
import { FC } from "react";

import { IPrometheusItemData } from "../components/PrometheusList/components/PrometheusItem/PrometheusItem";
import { Coordinates } from "../models/coordinates";
import { UiHeader } from "./components/UiHeader";
import s from "./index.module.scss";

interface IProps {
  onToggleSearch: () => void;
  className?: string;
  isOpenSearch?: boolean;
  isLoaded: boolean;
  selectedItem?: IPrometheusItemData;
  onSelectCoords: (coords: Coordinates) => void;
}

const Layout: FC<IProps> = ({
  children,
  className,
  onToggleSearch,
  isLoaded,
  onSelectCoords,
  selectedItem,
  isOpenSearch,
}) => {
  return (
    <div className={ClassName(s.wrap, className)}>
      <UiHeader
        onToggleSearch={onToggleSearch}
        isOpenSearch={isOpenSearch}
        isLoaded={isLoaded}
        selectedItem={selectedItem}
        onSelectCoords={onSelectCoords}
      />
      <div className={s.content}>
        <div className={s.contentIn}>{children}</div>
      </div>
    </div>
  );
};

export { Layout };
