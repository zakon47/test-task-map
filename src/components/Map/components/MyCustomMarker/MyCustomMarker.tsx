import { Marker } from "@react-google-maps/api";
import { FC } from "react";

import TARGET from "../../../../assets/svg/target.svg";
import { Coordinates } from "../../../../models/coordinates";
import s from "./index.module.scss";

interface IProps {
  position: Coordinates;
}
const MyCustomMarker: FC<IProps> = ({ position }) => {
  return (
    <div className={s.wrap}>
      <Marker
        position={position}
        icon={{
          url: TARGET,
          scaledSize: {
            width: 40,
            height: 40,
            equals(other: google.maps.Size | null): boolean {
              return true;
            },
          },
        }}
      />
    </div>
  );
};

export { MyCustomMarker };
