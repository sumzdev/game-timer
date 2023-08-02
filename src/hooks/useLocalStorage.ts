import React from "react";

interface Props {
  key: string;
  defaultValue: string;
}

const useLocalStorage = ({ key, defaultValue }: Props) => {
  const localStorageValue = localStorage.getItem(key);

  const [state, setState] = React.useState(
    (localStorageValue && JSON.parse(localStorageValue)) ?? defaultValue
  );

  React.useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
