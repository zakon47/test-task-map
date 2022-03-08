import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import _ from "lodash-es";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { v4 as uuidv4 } from "uuid";

import { Map } from "../../components/Map";
import { PrometheusList } from "../../components/PrometheusList";
import { IPrometheusItemData } from "../../components/PrometheusList/components/PrometheusItem/PrometheusItem";
import { UiHeader } from "../../components/UiHeader";
import { Coordinates } from "../../models/coordinates";
import { Weather } from "../../models/responses/weather";
import { ENV } from "../../utils/env";
import { defaultCenter } from "../../utils/geo/geo";
import { useLocalStorage } from "../../utils/localStorage/useLocalStorage";
import s from "./index.module.scss";

const dataExample: IPrometheusItemData = {
  id: "1",
  title: "Europe/London",
  subTitle: "Light Rain",
  desc: "Light Rain stopping in 12 min",
  temperature: 17.5,
  speed: "1.4 KM/H",
  humidity: 0.87,
  coords: defaultCenter,
};
const PageHome = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: ENV.GOOGLE_MAP_KEY,
    libraries: ["places"],
  });
  const [openMap, setOpenMap] = useLocalStorage("open-map", false);
  const [dataItems, setDataItems] = useLocalStorage<IPrometheusItemData[]>(
    "data-items",
    []
  );
  const [init, setInit] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [selectedItem, setSelectedItem] = useState<
    IPrometheusItemData | undefined
  >(undefined);

  const getWeatherForecast = async (
    id: string,
    newItems: IPrometheusItemData[]
  ) => {
    const elemIdx = newItems.findIndex((elem) => id === elem.id);
    if (elemIdx === -1) return;
    const elem = newItems[elemIdx];
    const { lat, lng } = elem.coords;
    const url = `/api/${ENV.BACKEND_API_KEY}/${lat},${lng}`;
    try {
      const data = await axios.get<Weather>(url);
      if (elemIdx !== -1) {
        const d = data.data;
        elem.title = d.timezone;
        elem.subTitle = d.currently.summary;
        elem.desc = d.daily.summary;
        elem.loading = false;
        elem.temperature = d.currently.temperature;
        elem.speed = "" + d.currently.windSpeed;
        elem.humidity = d.currently.windGust;
      }
      setDataItems([...newItems]);
    } catch (e) {
      console.error("ERR", e);
      elem.loading = false;
      setDataItems([...newItems]);
    }
  };
  useEffect(() => {
    if (!init && !!dataItems) {
      const newItems = dataItems.map((elem) => ({ ...elem, loading: true }));
      setDataItems(newItems);
      newItems.forEach((elem) => getWeatherForecast(elem.id, newItems));
      setInit(true);
    }
  }, [dataItems]);

  const handleDeleteItem = (item: IPrometheusItemData) => {
    const result = confirm("really delete?");
    if (result) {
      const newList = dataItems.filter((elem) => elem !== item);
      setDataItems(newList);
    }
    setSelectedItem(undefined);
  };
  const handleEditItem = (item: IPrometheusItemData) => {
    setOpenMap(true);
    setSelectedItem(item);
  };
  const handleToggleSearch = () => {
    setSelectedItem(undefined);
    setOpenMap(!openMap);
  };
  const handleAddNewItem = () => setOpenMap(true);
  const handleSelectCoords = (coords: Coordinates, click?: boolean) => {
    if (click) {
      let newItems: IPrometheusItemData[] = dataItems;
      let item = {} as IPrometheusItemData;
      if (selectedItem) {
        item = _.cloneDeep(selectedItem);
        item.coords = { ...coords };
        item.loading = true;
        //edit
        newItems = dataItems.map((elem) => {
          if (elem.id === item.id) {
            return item;
          }
          return elem;
        });
      } else {
        //add
        item = {
          ...dataExample,
          id: uuidv4(),
          loading: true,
          coords,
        };
        newItems = [...newItems, item];
      }
      setDataItems(newItems);
      getWeatherForecast(item.id, newItems);
      setOpenMap(false);
      setSelectedItem(undefined);
    } else {
      setMapCenter(coords);
    }
  };

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <div className={s.wrapLayout}>
        <UiHeader
          onToggleSearch={handleToggleSearch}
          isOpenSearch={openMap}
          isLoaded={isLoaded}
          selectedItem={selectedItem}
          onSelectCoords={handleSelectCoords}
        />
        <div className={s.content}>
          <div className={s.contentIn}>
            <div className={s.wrap}>
              {openMap ? (
                <Map
                  selectedItem={selectedItem}
                  center={mapCenter}
                  isLoaded={isLoaded}
                  onSelectCoords={handleSelectCoords}
                />
              ) : (
                <PrometheusList
                  data={dataItems || []}
                  addItem={handleAddNewItem}
                  deleteItem={handleDeleteItem}
                  editItem={handleEditItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { PageHome };
