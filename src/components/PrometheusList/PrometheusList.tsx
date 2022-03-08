import ClassName from "classnames";
import { FC } from "react";

import { UiContainer } from "../../layouts/components/UiContainer";
import { UiButton } from "../Ui/UiButton";
import { PrometheusItem } from "./components/PrometheusItem";
import { IPrometheusItemData } from "./components/PrometheusItem/PrometheusItem";
import s from "./index.module.scss";

interface IProps {
  data: IPrometheusItemData[];
  className?: string;
  addItem?: () => void;
  editItem: (item: IPrometheusItemData) => void;
  deleteItem: (item: IPrometheusItemData) => void;
}
const PrometheusList: FC<IProps> = ({
  className,
  data,
  editItem,
  deleteItem,
  addItem,
}) => {
  return (
    <UiContainer className={ClassName(s.wrap, className)}>
      {!!data.length ? (
        <div className={s.list}>
          {data.map((elem) => (
            <PrometheusItem
              id={elem.id}
              key={elem.id}
              title={elem.title}
              subTitle={elem.subTitle}
              desc={elem.desc}
              temperature={elem.temperature}
              speed={elem.speed}
              humidity={elem.humidity}
              loading={elem.loading}
              className={s.item}
              editItem={() => editItem(elem)}
              deleteItem={() => deleteItem(elem)}
              coords={elem.coords}
            />
          ))}
        </div>
      ) : (
        <div className={s.empty}>The list is empty</div>
      )}
      {addItem && (
        <div className={s.addItemBlock}>
          <UiButton onClick={addItem} className={s.addItem}>
            Add new location
          </UiButton>
        </div>
      )}
    </UiContainer>
  );
};

export { PrometheusList };
