import ClassName from "classnames";
import { FC, useEffect } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import s from "./index.module.scss";

interface IProps {
  className?: string;
  isLoaded: boolean;
  onSelect: ({ lat, lng }) => void;
}
const Autocomplete: FC<IProps> = ({ className, isLoaded, onSelect }) => {
  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });
  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, onSelect]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          onSelect({ lat, lng });
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div className={ClassName(s.wrap, className)} ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search..."
        className={s.input}
        onFocus={(e) => e.target.select()}
      />
      {status === "OK" && <ul className={s.ul}>{renderSuggestions()}</ul>}
    </div>
  );
};

export { Autocomplete };
