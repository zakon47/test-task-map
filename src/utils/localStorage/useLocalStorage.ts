import { useContext, useEffect } from "react";

import { LocalStorageContext } from "./provider";

// [value, setValue(newValue), reset(), remove()] = useLocalStorage("div1", "тест")
export function useLocalStorage<T>(key: string, initialValue?: T) {
  const {
    values,
    setValue: setBaseValue,
    remove: removeKey,
  } = useContext(LocalStorageContext);

  const getValue = () => {
    const storage = localStorage.getItem(key); // string or null
    if (!!storage) return JSON.parse(storage);
    return initialValue || "";
  };

  useEffect(() => {
    if (!values[key]) setBaseValue(key, getValue());
  }, []);

  const setValue = (value: any) => {
    setBaseValue(key, value);
  };
  const reset = () => {
    setBaseValue(key, initialValue || "");
  };
  const remove = () => {
    removeKey(key);
  };

  return [values[key], setValue, reset, remove] as [
    T,
    (value: any) => void,
    () => void,
    () => void
  ];
}
