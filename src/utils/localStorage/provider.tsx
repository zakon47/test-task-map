import React, { createContext, FC, useState } from "react";

interface ILocalStorageContext {
  values: { [idx: string]: any };
  setValue: (key: string, value: any) => void;
  remove: (key: string) => void;
}
export const LocalStorageContext = createContext<ILocalStorageContext>({
  values: {},
  setValue: () => {},
  remove: () => {},
});

// провайдер для работы с локальным storage
export const LocalStorageProvider: FC = ({ children }) => {
  const [values, setValues] = useState<{ [idx: string]: string }>({});

  //записали новое значение
  const setValue = (key: string, value: any) => {
    setValues((prevState) => {
      if (prevState[key] === value) return prevState;
      localStorage.setItem(key, JSON.stringify(value));
      return {
        ...prevState,
        [key]: value,
      };
    });
  };
  //сбросить ключ
  const remove = (key: string) => {
    localStorage.removeItem(key);
    setValues((prevState) => {
      const newState = { ...prevState };
      delete newState[key];
      return newState;
    });
  };
  return (
    <LocalStorageContext.Provider
      value={{
        values,
        setValue,
        remove,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
