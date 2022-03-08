import ClassName from "classnames";
import { FC } from "react";

import { Coordinates } from "../../../../models/coordinates";
import { UiButton } from "../../../Ui/UiButton";
import { PrometheusAvatar } from "../PrometheusAvatar";
import s from "./index.module.scss";

export interface IPrometheusItemData {
  id: string;
  title: string;
  subTitle: string;
  desc?: string;
  speed?: string;
  temperature: number;
  loading?: boolean;
  humidity?: number;
  coords: Coordinates;
}
interface IPrometheusItemProps extends IPrometheusItemData {
  className?: string;
  editItem: () => void;
  deleteItem: () => void;
}
const PrometheusItem: FC<IPrometheusItemProps> = ({
  className,
  title,
  subTitle,
  desc,
  speed,
  loading,
  temperature,
  humidity,
  editItem,
  deleteItem,
  coords,
}) => {
  return (
    <div className={ClassName(s.wrap, className)}>
      <div className={s.top}>
        <div className={s.avatar}>
          <PrometheusAvatar text={loading ? "" : `${temperature}’C`} />
        </div>
        <div className={s.info}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className={s.infoContent}>
                <div className={s.title}>
                  {title}{" "}
                  {[coords.lng.toFixed(5), coords.lat.toFixed(5)].join(", ")}
                </div>
                {subTitle && <div className={s.subTitle}>{subTitle}</div>}
                {desc && <div className={s.desc}>{desc}</div>}
              </div>
            </>
          )}
          <div className={s.actions}>
            <UiButton
              color={"primary"}
              onClick={editItem}
              className={s.actionEdit}
              disabled={loading}
              subMenu={
                <>
                  <UiButton onClick={deleteItem} disabled={loading}>
                    Del
                  </UiButton>
                </>
              }
            >
              Edit
            </UiButton>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.speed}>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              Wind Speed - {speed && `${speed} KM/H`} {humidity}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { PrometheusItem };
