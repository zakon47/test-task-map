import ClassName from "classnames";
import { CSSProperties, FC } from "react";

import BAR from "../../assets/svg/bar.svg";
import SEARCH from "../../assets/svg/search.svg";
import { Coordinates } from "../../models/coordinates";
import { Autocomplete } from "../Autocomplete";
import { IPrometheusItemData } from "../PrometheusList/components/PrometheusItem/PrometheusItem";
import { UiButtonIcon } from "../Ui/UiButtonIcon";
import { UiContainer } from "../UiContainer";
import s from "./index.module.scss";

interface IProps {
  className?: string;
  style?: CSSProperties;
  isLoaded: boolean;
  isOpenSearch?: boolean;
  onToggleSearch: () => void;
  selectedItem?: IPrometheusItemData;
  onSelectCoords: (coords: Coordinates) => void;
}

const UiHeader: FC<IProps> = ({
  className,
  style,
  onToggleSearch,
  onSelectCoords,
  selectedItem,
  isLoaded,
  isOpenSearch = false,
}) => {
  return (
    <div className={ClassName(s.wrap, className)} style={style}>
      <UiContainer className={s.content}>
        <div className={s.left}>
          {selectedItem ? (
            <>
              <div className={s.title}>Edit location</div>
              <div className={s.subtitle}>
                {selectedItem.title}
                {" 1"}
                {[
                  selectedItem.coords.lng.toFixed(5),
                  selectedItem.coords.lat.toFixed(5),
                ].join(", ")}
              </div>
            </>
          ) : (
            <>
              {isOpenSearch ? (
                <form className={s.search}>
                  <b>Search by name:</b>
                  <Autocomplete isLoaded={isLoaded} onSelect={onSelectCoords} />
                </form>
              ) : (
                <>
                  <div className={s.title}>Prometheus</div>
                  <div className={s.subtitle}>
                    You can add, edit and delete locations
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className={s.right}>
          {selectedItem || isOpenSearch ? (
            <button className={s.back} onClick={onToggleSearch}>
              Back
            </button>
          ) : (
            <UiButtonIcon src={SEARCH} onClick={onToggleSearch} />
          )}
          <UiButtonIcon src={BAR} />
        </div>
      </UiContainer>
    </div>
  );
};

export { UiHeader };
